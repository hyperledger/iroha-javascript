/**
 * @packageDocumentation
 *
 * Client library to interact with Iroha v2 Peer. Library implements Transactions, Queries,
 * Events, Status & Health check.
 */

import { KeyPair } from '@iroha2/crypto-core'
import {
  AccountId,
  Enum,
  Executable,
  MapNameValue,
  OptionU32,
  PaginatedQueryResult,
  Predicate,
  PredicateBox,
  PublicKey,
  QueryBox,
  QueryError,
  QueryPayload,
  Result,
  Signature,
  SignedQueryRequest,
  Transaction,
  TransactionPayload,
  VecSignatureOfTransactionPayload,
  VersionedPaginatedQueryResult,
  VersionedSignedQueryRequest,
  VersionedTransaction,
} from '@iroha2/data-model'
import { SetupBlocksStreamParams, SetupBlocksStreamReturn, setupBlocksStream } from './blocks-stream'
import { garbageScope } from './collect-garbage'
import {
  ENDPOINT_CONFIGURATION,
  ENDPOINT_HEALTH,
  ENDPOINT_METRICS,
  ENDPOINT_QUERY,
  ENDPOINT_STATUS,
  ENDPOINT_TRANSACTION,
  HEALTHY_RESPONSE,
} from './const'
import { getCryptoAnyway } from './crypto-singleton'
import { SetupEventsParams, SetupEventsReturn, setupEvents } from './events'
import { cryptoHash, parseJsonWithBigInts } from './util'
import { IsomorphicWebSocketAdapter } from './web-socket/types'
import { Except } from 'type-fest'

type Fetch = typeof fetch

export interface SetPeerConfigParams {
  LogLevel?: 'WARN' | 'ERROR' | 'INFO' | 'DEBUG' | 'TRACE'
}

export interface PeerStatus {
  peers: bigint | number
  blocks: bigint | number
  txs_accepted: bigint | number
  txs_rejected: bigint | number
  view_changes: bigint | number
  uptime: {
    secs: bigint | number
    nanos: number
  }
}

export class Signer {
  #kp: KeyPair
  #accountId: AccountId

  public constructor(accountId: AccountId, keyPair: KeyPair) {
    this.#accountId = accountId
    this.#kp = keyPair
  }

  public get accountId(): AccountId {
    return this.#accountId
  }

  public sign(payload: Uint8Array): Signature {
    const { createSignature } = getCryptoAnyway()

    return garbageScope((collect) => {
      const signature = collect(createSignature(this.#kp, payload))

      // Should it be collected?
      const pubKey = this.#kp.publicKey()

      return Signature({
        public_key: PublicKey({
          digest_function: pubKey.digestFunction(),
          payload: pubKey.payload(),
        }),
        payload: signature.signatureBytes(),
      })
    })
  }
}

// #region Transaction helpers

export interface MakeTransactionPayloadParams {
  accountId: AccountId
  executable: Executable
  /**
   * @default 100_000n
   */
  ttl?: bigint
  /**
   * @default Date.now()
   */
  creationTime?: bigint
  /**
   * @default // none
   */
  nonce?: number
  metadata?: MapNameValue
}

const DEFAULT_TRANSACTION_TTL = 100_000n

export function makeTransactionPayload(params: MakeTransactionPayloadParams): TransactionPayload {
  return TransactionPayload({
    account_id: params.accountId,
    instructions: params.executable,
    time_to_live_ms: params.ttl ?? DEFAULT_TRANSACTION_TTL,
    nonce: params?.nonce ? OptionU32('Some', params.nonce) : OptionU32('None'),
    metadata: params?.metadata ?? MapNameValue(new Map()),
    creation_time: params.creationTime ?? BigInt(Date.now()),
  })
}

export function computeTransactionHash(payload: TransactionPayload): Uint8Array {
  return cryptoHash(TransactionPayload.toBuffer(payload))
}

export function signTransaction(payload: TransactionPayload, signer: Signer): Signature {
  const hash = computeTransactionHash(payload)
  return signer.sign(hash)
}

export function makeSignedTransaction(payload: TransactionPayload, signer: Signer): VersionedTransaction {
  const signature = signTransaction(payload, signer)
  return VersionedTransaction(
    'V1',
    Transaction({
      payload,
      signatures: VecSignatureOfTransactionPayload([signature]),
    }),
  )
}

export function executableIntoSignedTransaction(params: {
  signer: Signer
  executable: Executable
  payloadParams?: Except<MakeTransactionPayloadParams, 'accountId' | 'executable'>
}): VersionedTransaction {
  return makeSignedTransaction(
    makeTransactionPayload({
      executable: params.executable,
      accountId: params.signer.accountId,
      ...params.payloadParams,
    }),
    params.signer,
  )
}

// #endregion

// #region Query helpers

interface MakeQueryPayloadParams {
  accountId: AccountId
  query: QueryBox
  /**
   * @default PredicateBox('Raw', Predicate('Pass'))
   */
  filter?: PredicateBox
  timestampMs?: bigint
}

export function makeQueryPayload(params: MakeQueryPayloadParams): QueryPayload {
  return QueryPayload({
    account_id: params.accountId,
    query: params.query,
    timestamp_ms: params.timestampMs ?? BigInt(Date.now()),
    filter: params?.filter ?? PredicateBox('Raw', Predicate('Pass')),
  })
}

export function computeQueryHash(payload: QueryPayload): Uint8Array {
  return cryptoHash(QueryPayload.toBuffer(payload))
}

export function signQuery(payload: QueryPayload, signer: Signer): Signature {
  const hash = computeQueryHash(payload)
  return signer.sign(hash)
}

export function makeSignedQuery(payload: QueryPayload, signer: Signer): VersionedSignedQueryRequest {
  const signature = signQuery(payload, signer)
  return VersionedSignedQueryRequest('V1', SignedQueryRequest({ payload, signature }))
}

export function queryBoxIntoSignedQuery(params: {
  query: QueryBox
  signer: Signer
  payloadParams?: Except<MakeQueryPayloadParams, 'accountId' | 'query'>
}): VersionedSignedQueryRequest {
  return makeSignedQuery(
    makeQueryPayload({
      query: params.query,
      accountId: params.signer.accountId,
      ...params.payloadParams,
    }),
    params.signer,
  )
}

// #endregion

// #region TORII

export interface ToriiApiHttp {
  submit: (tx: VersionedTransaction) => Promise<void>
  request: (query: VersionedSignedQueryRequest) => Promise<Result<PaginatedQueryResult, QueryError>>
  getHealth: () => Promise<Result<null, string>>
  setPeerConfig: (params: SetPeerConfigParams) => Promise<void>
}

export interface ToriiApiWebSocket {
  listenForEvents: (params: Pick<SetupEventsParams, 'filter'>) => Promise<SetupEventsReturn>
  listenForBlocksStream: (params: Pick<SetupBlocksStreamParams, 'height'>) => Promise<SetupBlocksStreamReturn>
}

export interface ToriiTelemetry {
  getStatus: () => Promise<PeerStatus>
  getMetrics: () => Promise<string>
}

export interface CreateToriiProps {
  apiURL: string
  telemetryURL: string
  fetch: Fetch
  ws: IsomorphicWebSocketAdapter
}

export type ToriiQueryResult = Result<PaginatedQueryResult, QueryError>

export class Torii implements ToriiApiHttp, ToriiApiWebSocket, ToriiTelemetry {
  #api: string
  #telemetry: string
  #fetch: Fetch
  #ws: IsomorphicWebSocketAdapter

  public constructor(props: CreateToriiProps) {
    this.#api = props.apiURL
    this.#telemetry = props.telemetryURL
    this.#fetch = props.fetch
    this.#ws = props.ws
  }

  public async submit(tx: VersionedTransaction): Promise<void> {
    const body = VersionedTransaction.toBuffer(tx)

    const response = await this.#fetch(this.#api + ENDPOINT_TRANSACTION, {
      body,
      method: 'POST',
    })

    ResponseError.throwIfStatusIsNot(response, 200)
  }

  public async request(query: VersionedSignedQueryRequest): Promise<ToriiQueryResult> {
    const queryBytes = VersionedSignedQueryRequest.toBuffer(query)
    const response = await this.#fetch(this.#api + ENDPOINT_QUERY, {
      method: 'POST',
      body: queryBytes!,
    }).then()

    const bytes = new Uint8Array(await response.arrayBuffer())

    if (response.status === 200) {
      // OK
      const value = VersionedPaginatedQueryResult.fromBuffer(bytes).as('V1')
      return Enum.variant<ToriiQueryResult>('Ok', value)
    } else {
      // ERROR
      const error = QueryError.fromBuffer(bytes)
      return Enum.variant<ToriiQueryResult>('Err', error)
    }
  }

  public async getHealth(): Promise<Result<null, string>> {
    let response: Response
    try {
      response = await this.#fetch(this.#api + ENDPOINT_HEALTH)
    } catch (err) {
      return Enum.variant('Err', `Network error: ${String(err)}`)
    }

    ResponseError.throwIfStatusIsNot(response, 200)

    const text = await response.text()
    if (text !== HEALTHY_RESPONSE) {
      return Enum.variant('Err', `Expected '${HEALTHY_RESPONSE}' response; got: '${text}'`)
    }

    return Enum.variant('Ok', null)
  }

  public async listenForEvents(params: Pick<SetupEventsParams, 'filter'>): Promise<SetupEventsReturn> {
    return setupEvents({
      filter: params.filter,
      toriiApiURL: this.#api,
      adapter: this.#ws,
    })
  }

  public async listenForBlocksStream(
    params: Pick<SetupBlocksStreamParams, 'height'>,
  ): Promise<SetupBlocksStreamReturn> {
    return setupBlocksStream({
      height: params.height,
      toriiApiURL: this.#api,
      adapter: this.#ws,
    })
  }
  public async getStatus(): Promise<PeerStatus> {
    const response = await this.#fetch(this.#telemetry + ENDPOINT_STATUS)
    ResponseError.throwIfStatusIsNot(response, 200)
    return response.text().then(parseJsonWithBigInts)
  }

  public async getMetrics(): Promise<string> {
    return this.#fetch(this.#telemetry + ENDPOINT_METRICS).then((response) => {
      ResponseError.throwIfStatusIsNot(response, 200)
      return response.text()
    })
  }

  public async setPeerConfig(params: SetPeerConfigParams): Promise<void> {
    const response = await this.#fetch(this.#api + ENDPOINT_CONFIGURATION, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    ResponseError.throwIfStatusIsNot(response, 200)
  }
}

export class ResponseError extends Error {
  public static throwIfStatusIsNot(response: Response, status: number) {
    if (response.status !== status) throw new ResponseError(response)
  }

  public constructor(response: Response) {
    super(`${response.status}: ${response.statusText}`)
  }
}

// #endregion

// #region Client

export class Client {
  public readonly torii: Torii

  public readonly signer: Signer

  public constructor(params: { torii: Torii; signer: Signer }) {
    this.signer = params.signer
    this.torii = params.torii
  }

  public async submitExecutable(executable: Executable) {
    return this.torii.submit(executableIntoSignedTransaction({ executable, signer: this.signer }))
  }

  public async requestWithQueryBox(query: QueryBox) {
    return this.torii.request(queryBoxIntoSignedQuery({ query, signer: this.signer }))
  }
}

// #endregion

export * from './events'
export * from './blocks-stream'
export * from './crypto-singleton'
export * from './web-socket/types'
