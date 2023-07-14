/**
 * @packageDocumentation
 *
 * Client library to interact with Iroha v2 Peer. Library implements Transactions, Queries,
 * Events, Status & Health check.
 */

import { cryptoTypes, freeScope } from '@iroha2/crypto-core'
import { RustResult, datamodel, variant } from '@iroha2/data-model'
import { SetupBlocksStreamParams, SetupBlocksStreamReturn, setupBlocksStream } from './blocks-stream'
import {
  ENDPOINT_CONFIGURATION,
  ENDPOINT_HEALTH,
  ENDPOINT_METRICS,
  ENDPOINT_QUERY,
  ENDPOINT_STATUS,
  ENDPOINT_TRANSACTION,
  HEALTHY_RESPONSE,
} from './const'
import { SetupEventsParams, SetupEventsReturn, setupEvents } from './events'
import { cryptoHash, parseJsonWithBigInts } from './util'
import { IsomorphicWebSocketAdapter } from './web-socket/types'
import { Except } from 'type-fest'

type Fetch = typeof fetch

type KeyPair = cryptoTypes.KeyPair

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
  public readonly keyPair: KeyPair
  public readonly accountId: datamodel.AccountId

  public constructor(accountId: datamodel.AccountId, keyPair: KeyPair) {
    this.accountId = accountId
    this.keyPair = keyPair
  }

  public sign(...message: cryptoTypes.BytesInputTuple): datamodel.Signature {
    return freeScope(() => {
      const signature = this.keyPair.sign(...message)
      const publicKey = signature.publicKey().toDataModel()

      return datamodel.Signature({
        public_key: publicKey,
        payload: signature.payload(),
      })
    })
  }
}

// #region Transaction helpers

export interface MakeTransactionPayloadParams {
  accountId: datamodel.AccountId
  executable: datamodel.Executable
  ttl?: bigint
  /**
   * @default Date.now()
   */
  creationTime?: bigint
  /**
   * @default // none
   */
  nonce?: number
  metadata?: datamodel.SortedMapNameValue
}

// const DEFAULT_TRANSACTION_TTL = 100_000n

export function makeTransactionPayload(params: MakeTransactionPayloadParams): datamodel.TransactionPayload {
  return datamodel.TransactionPayload({
    authority: params.accountId,
    instructions: params.executable,
    time_to_live_ms: params.ttl ? datamodel.OptionNonZeroU64('Some', params.ttl) : datamodel.OptionNonZeroU64('None'),
    nonce: params?.nonce ? datamodel.OptionNonZeroU32('Some', params.nonce) : datamodel.OptionNonZeroU32('None'),
    metadata: params?.metadata ?? datamodel.SortedMapNameValue(new Map()),
    creation_time_ms: params.creationTime ?? BigInt(Date.now()),
  })
}

export function computeTransactionHash(payload: datamodel.TransactionPayload): Uint8Array {
  return cryptoHash('array', datamodel.TransactionPayload.toBuffer(payload))
}

export function signTransaction(payload: datamodel.TransactionPayload, signer: Signer): datamodel.Signature {
  const hash = computeTransactionHash(payload)
  return signer.sign('array', hash)
}

export function makeVersionedSignedTransaction(
  payload: datamodel.TransactionPayload,
  signer: Signer,
): datamodel.VersionedSignedTransaction {
  const signature = signTransaction(payload, signer)
  return datamodel.VersionedSignedTransaction(
    'V1',
    datamodel.SignedTransaction({
      payload,
      signatures: datamodel.SortedSignatures({ signatures: datamodel.SortedVecSignature([signature]) }),
    }),
  )
}

export function executableIntoSignedTransaction(params: {
  signer: Signer
  executable: datamodel.Executable
  payloadParams?: Except<MakeTransactionPayloadParams, 'accountId' | 'executable'>
}): datamodel.VersionedSignedTransaction {
  return makeVersionedSignedTransaction(
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
  accountId: datamodel.AccountId
  query: datamodel.QueryBox
  /**
   * @default PredicateBox('Raw', Predicate('Pass'))
   */
  filter?: datamodel.PredicateBox
  timestampMs?: bigint
}

export function makeQueryPayload(params: MakeQueryPayloadParams): datamodel.QueryPayload {
  return datamodel.QueryPayload({
    authority: params.accountId,
    query: params.query,
    timestamp_ms: params.timestampMs ?? BigInt(Date.now()),
    filter: params?.filter ?? datamodel.PredicateBox('Raw', datamodel.ValuePredicate('Pass')),
  })
}

export function computeQueryHash(payload: datamodel.QueryPayload): Uint8Array {
  return cryptoHash('array', datamodel.QueryPayload.toBuffer(payload))
}

export function signQuery(payload: datamodel.QueryPayload, signer: Signer): datamodel.Signature {
  const hash = computeQueryHash(payload)
  return signer.sign('array', hash)
}

export function makeVersionedSignedQuery(
  payload: datamodel.QueryPayload,
  signer: Signer,
): datamodel.VersionedSignedQuery {
  const signature = signQuery(payload, signer)
  return datamodel.VersionedSignedQuery('V1', datamodel.SignedQuery({ payload, signature }))
}

export function queryBoxIntoSignedQuery(params: {
  query: datamodel.QueryBox
  signer: Signer
  payloadParams?: Except<MakeQueryPayloadParams, 'accountId' | 'query'>
}): datamodel.VersionedSignedQuery {
  return makeVersionedSignedQuery(
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

export interface ToriiRequirementsPartUrlApi {
  apiURL: string
}

export interface ToriiRequirementsPartUrlTelemetry {
  telemetryURL: string
}

export interface ToriiRequirementsPartHttp {
  fetch: Fetch
}

export interface ToriiRequirementsPartWebSocket {
  ws: IsomorphicWebSocketAdapter
}

export type ToriiRequirementsForApiHttp = ToriiRequirementsPartUrlApi & ToriiRequirementsPartHttp

export type ToriiRequirementsForApiWebSocket = ToriiRequirementsPartUrlApi & ToriiRequirementsPartWebSocket

export type ToriiRequirementsForTelemetry = ToriiRequirementsPartUrlTelemetry & ToriiRequirementsPartHttp

export type ToriiQueryResult = RustResult<datamodel.PaginatedQueryResult, datamodel.ValidationFail>

export interface ToriiApiHttp {
  submit: (prerequisites: ToriiRequirementsForApiHttp, tx: datamodel.VersionedSignedTransaction) => Promise<void>
  request: (
    prerequisites: ToriiRequirementsForApiHttp,
    query: datamodel.VersionedSignedQuery,
  ) => Promise<ToriiQueryResult>
  getHealth: (prerequisites: ToriiRequirementsForApiHttp) => Promise<RustResult<null, string>>
  setPeerConfig: (prerequisites: ToriiRequirementsForApiHttp, params: SetPeerConfigParams) => Promise<void>
}

export interface ToriiApiWebSocket {
  listenForEvents: (
    prerequisites: ToriiRequirementsForApiWebSocket,
    params: Pick<SetupEventsParams, 'filter'>,
  ) => Promise<SetupEventsReturn>
  listenForBlocksStream: (
    prerequisites: ToriiRequirementsForApiWebSocket,
    params: Pick<SetupBlocksStreamParams, 'height'>,
  ) => Promise<SetupBlocksStreamReturn>
}

export interface ToriiTelemetry {
  getStatus: (prerequisites: ToriiRequirementsForTelemetry) => Promise<PeerStatus>
  getMetrics: (prerequisites: ToriiRequirementsForTelemetry) => Promise<string>
}

export type ToriiOmnibus = ToriiApiHttp & ToriiApiWebSocket & ToriiTelemetry

export const Torii: ToriiOmnibus = {
  async submit(pre, tx) {
    const body = datamodel.VersionedSignedTransaction.toBuffer(tx)

    const response = await pre.fetch(pre.apiURL + ENDPOINT_TRANSACTION, {
      body,
      method: 'POST',
    })

    ResponseError.throwIfStatusIsNot(response, 200)
  },

  async request(pre, query) {
    const queryBytes = datamodel.VersionedSignedQuery.toBuffer(query)
    const response = await pre
      .fetch(pre.apiURL + ENDPOINT_QUERY, {
        method: 'POST',
        body: queryBytes!,
      })
      .then()

    const bytes = new Uint8Array(await response.arrayBuffer())

    console.log(response, { bytes })

    if (response.status === 200) {
      // OK
      const value: datamodel.PaginatedQueryResult =
        datamodel.VersionedPaginatedQueryResult.fromBuffer(bytes).enum.content
      return variant('Ok', value)
    } else {
      // ERROR
      const error = datamodel.ValidationFail.fromBuffer(bytes)
      return variant('Err', error)
    }
  },

  async getHealth(pre) {
    let response: Response
    try {
      response = await pre.fetch(pre.apiURL + ENDPOINT_HEALTH)
    } catch (err) {
      return variant('Err', `Network error: ${String(err)}`)
    }

    ResponseError.throwIfStatusIsNot(response, 200)

    const text = await response.text()
    if (text !== HEALTHY_RESPONSE) {
      return variant('Err', `Expected '${HEALTHY_RESPONSE}' response; got: '${text}'`)
    }

    return variant('Ok', null)
  },

  async listenForEvents(pre, params: Pick<SetupEventsParams, 'filter'>) {
    return setupEvents({
      filter: params.filter,
      toriiApiURL: pre.apiURL,
      adapter: pre.ws,
    })
  },

  async listenForBlocksStream(pre, params: Pick<SetupBlocksStreamParams, 'height'>) {
    return setupBlocksStream({
      height: params.height,
      toriiApiURL: pre.apiURL,
      adapter: pre.ws,
    })
  },

  async getStatus(pre): Promise<PeerStatus> {
    const response = await pre.fetch(pre.telemetryURL + ENDPOINT_STATUS)
    ResponseError.throwIfStatusIsNot(response, 200)
    return response.text().then(parseJsonWithBigInts)
  },

  async getMetrics(pre) {
    return pre.fetch(pre.telemetryURL + ENDPOINT_METRICS).then((response) => {
      ResponseError.throwIfStatusIsNot(response, 200)
      return response.text()
    })
  },

  async setPeerConfig(pre, params: SetPeerConfigParams) {
    const response = await pre.fetch(pre.apiURL + ENDPOINT_CONFIGURATION, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    ResponseError.throwIfStatusIsNot(response, 200)
  },
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
  public readonly signer: Signer

  public constructor(params: { signer: Signer }) {
    this.signer = params.signer
  }

  public async submitExecutable(pre: ToriiRequirementsForApiHttp, executable: datamodel.Executable) {
    return Torii.submit(pre, executableIntoSignedTransaction({ executable, signer: this.signer }))
  }

  public async requestWithQueryBox(pre: ToriiRequirementsForApiHttp, query: datamodel.QueryBox) {
    return Torii.request(pre, queryBoxIntoSignedQuery({ query, signer: this.signer }))
  }
}

// #endregion

export * from './events'
export * from './blocks-stream'
export * from './crypto-singleton'
export * from './web-socket/types'
