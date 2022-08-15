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
import { IrohaCryptoInterface, KeyPair } from '@iroha2/crypto-core'
import { collect as collectGarbage, createScope as createGarbageScope } from './collect-garbage'
import { parseJsonWithBigInts, randomU32 } from './util'
import { getCrypto } from './crypto-singleton'
import { SetupEventsParams, SetupEventsReturn, setupEvents } from './events'
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
import { IsomorphicWebSocketAdapter } from './web-socket/types'

function useCryptoAssertive(): IrohaCryptoInterface {
  const crypto = getCrypto()
  if (!crypto) {
    throw new Error(
      '"crypto" is not defined, but required for Iroha Client to function. Have you set it with `setCrypto()`?',
    )
  }
  return crypto
}

export class ClientIncompleteConfigError extends Error {
  public static missing(what: string) {
    return new ClientIncompleteConfigError(
      `You are trying to use Iroha Client with an incomplete configuration. Missing: ${what}`,
    )
  }

  public static fetchIsNotProvided() {
    return new ClientIncompleteConfigError(
      'Incomplete configuration: "fetch" is not defined. It is required for Iroha Client to function.' +
        "If you are trying to use Client in the environment where Fetch API isn't available, " +
        'be sure to provide its implementation via `fetch` config field.',
    )
  }

  public static cryptoIsNotSet() {
    return new ClientIncompleteConfigError(
      'Incomplete configuration: "crypto" is not defined. It is required for Iroha Client to function. Use `setCrypto()` to configure "crypto".',
    )
  }

  private constructor(message: string) {
    super(message)
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

export interface SubmitParams {
  nonce?: number
  metadata?: MapNameValue
}

export type HealthResult = Result<null, string>

export type RequestResult = Result<PaginatedQueryResult, QueryError>

export type ListenEventsParams = Pick<SetupEventsParams, 'filter'>

export type ListenBlocksStreamParams = Pick<SetupBlocksStreamParams, 'height'>

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

export interface SetPeerConfigParams {
  LogLevel?: 'WARN' | 'ERROR' | 'INFO' | 'DEBUG' | 'TRACE'
}

export interface UserConfig {
  torii: {
    apiURL?: string | null
    telemetryURL?: string | null
  }
  keyPair?: KeyPair
  accountId?: AccountId
  transaction?: {
    /**
     * @default 100_000n
     */
    timeToLiveMs?: bigint
    /**
     * @default false
     */
    addNonce?: boolean
  }
  /**
   * Implementation of the [fetch](https://fetch.spec.whatwg.org/#fetch-method) method.
   * Must be provided in the environment where it is not available by default, i.e.
   * in Node.js older than 17.5.
   *
   * See also:
   *
   * - [undici](https://www.npmjs.com/package/undici)
   * - [node-fetch](https://www.npmjs.com/package/node-fetch)
   */
  fetch?: typeof fetch
  ws?: IsomorphicWebSocketAdapter
}

export interface RequestParams {
  /**
   * @default PredicateBox('Raw', Predicate('Pass'))
   */
  filter?: PredicateBox
}

function makeSignature(keyPair: KeyPair, payload: Uint8Array): Signature {
  const { createSignature } = useCryptoAssertive()

  const signature = collectGarbage(createSignature(keyPair, payload))

  // Should it be collected?
  const pubKey = keyPair.publicKey()

  return Signature({
    public_key: PublicKey({
      digest_function: pubKey.digestFunction(),
      payload: pubKey.payload(),
    }),
    payload: signature.signatureBytes(),
  })
}

/**
 *
 * @remarks
 *
 * TODO: `submitBlocking` method, i.e. `submit` + listening for submit
 */
export class Client {
  public toriiApiURL: string | null
  public toriiTelemetryURL: string | null
  public keyPair: null | KeyPair
  public accountId: null | AccountId
  public transactionDefaultTTL: bigint
  public transactionAddNonce: boolean
  public fetch: typeof fetch | null
  public ws: IsomorphicWebSocketAdapter | null

  public constructor(config: UserConfig) {
    this.toriiApiURL = config.torii.apiURL ?? null
    this.toriiTelemetryURL = config.torii.telemetryURL ?? null
    this.transactionAddNonce = config.transaction?.addNonce ?? false
    this.transactionDefaultTTL = config.transaction?.timeToLiveMs ?? 100_000n
    this.keyPair = config.keyPair ?? null
    this.accountId = config.accountId ?? null

    if (config.fetch) {
      this.fetch = config.fetch
    } else if (typeof fetch !== 'undefined') {
      this.fetch = fetch
    }

    this.ws = config.ws ?? null
  }

  // TODO nice to have
  // public signQuery(payload: QueryPayload): SignedQueryRequest {}
  // public signTransaction(tx: Transaction): Transaction {}

  public async getHealth(): Promise<HealthResult> {
    const url = this.forceGetApiURL()

    try {
      const response = await this.forceGetFetch()(url + ENDPOINT_HEALTH)
      ResponseError.throwIfStatusIsNot(response, 200)

      const text = await response.text()
      if (text !== HEALTHY_RESPONSE) {
        return Enum.variant('Err', `Expected '${HEALTHY_RESPONSE}' response; got: '${text}'`)
      }

      return Enum.variant('Ok', null)
    } catch (err) {
      return Enum.variant('Err', `Some error occured: ${String(err)}`)
    }
  }

  public async submit(executable: Executable, params?: SubmitParams): Promise<void> {
    const scope = createGarbageScope()

    const { createHash } = useCryptoAssertive()
    const accountId = this.forceGetAccountId()
    const keyPair = this.forceGetKeyPair()
    const url = this.forceGetApiURL()

    const payload = TransactionPayload({
      instructions: executable,
      time_to_live_ms: this.transactionDefaultTTL,
      nonce: params?.nonce
        ? OptionU32('Some', params.nonce)
        : this.transactionAddNonce
        ? OptionU32('Some', randomU32())
        : OptionU32('None'),
      metadata: params?.metadata ?? MapNameValue(new Map()),
      creation_time: BigInt(Date.now()),
      account_id: accountId,
    })

    try {
      let finalBytes: Uint8Array

      scope.run(() => {
        const payloadHash = collectGarbage(createHash(TransactionPayload.toBuffer(payload)))
        const signature = makeSignature(keyPair, payloadHash.bytes())

        finalBytes = VersionedTransaction.toBuffer(
          VersionedTransaction(
            'V1',
            Transaction({ payload, signatures: VecSignatureOfTransactionPayload([signature]) }),
          ),
        )
      })

      const response = await this.forceGetFetch()(url + ENDPOINT_TRANSACTION, {
        body: finalBytes!,
        method: 'POST',
      })

      ResponseError.throwIfStatusIsNot(response, 200)
    } finally {
      scope.free()
    }
  }

  /**
   * TODO support pagination
   */
  public async request(query: QueryBox, params?: RequestParams): Promise<RequestResult> {
    const scope = createGarbageScope()
    const { createHash } = useCryptoAssertive()
    const url = this.forceGetApiURL()
    const accountId = this.forceGetAccountId()
    const keyPair = this.forceGetKeyPair()

    const payload = QueryPayload({
      query,
      account_id: accountId,
      timestamp_ms: BigInt(Date.now()),
      filter: params?.filter ?? PredicateBox('Raw', Predicate('Pass')),
    })

    try {
      let queryBytes: Uint8Array

      scope.run(() => {
        const payloadHash = collectGarbage(createHash(QueryPayload.toBuffer(payload)))
        const signature = makeSignature(keyPair, payloadHash.bytes())

        queryBytes = VersionedSignedQueryRequest.toBuffer(
          VersionedSignedQueryRequest('V1', SignedQueryRequest({ payload, signature })),
        )
      })

      const response = await this.forceGetFetch()(url + ENDPOINT_QUERY, {
        method: 'POST',
        body: queryBytes!,
      }).then()

      const bytes = new Uint8Array(await response.arrayBuffer())

      if (response.status === 200) {
        // OK
        const value = VersionedPaginatedQueryResult.fromBuffer(bytes).as('V1')
        return Enum.variant<RequestResult>('Ok', value)
      } else {
        // ERROR
        const error = QueryError.fromBuffer(bytes)
        return Enum.variant<RequestResult>('Err', error)
      }
    } finally {
      scope.free()
    }
  }

  public async listenForEvents(params: ListenEventsParams): Promise<SetupEventsReturn> {
    return setupEvents({
      filter: params.filter,
      toriiApiURL: this.forceGetApiURL(),
      adapter: this.forceGetWs(),
    })
  }

  public async listenForBlocksStream(params: ListenBlocksStreamParams): Promise<SetupBlocksStreamReturn> {
    return setupBlocksStream({
      height: params.height,
      toriiApiURL: this.forceGetApiURL(),
      adapter: this.forceGetWs(),
    })
  }

  // TODO Iroha WIP
  // public async getPeerConfig() {
  //     await fetch(this.forceGetToriiApiURL() + '/configuration');
  // }

  public async setPeerConfig(params: SetPeerConfigParams): Promise<void> {
    const response = await this.forceGetFetch()(this.forceGetApiURL() + ENDPOINT_CONFIGURATION, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    ResponseError.throwIfStatusIsNot(response, 200)
  }

  public async getStatus(): Promise<PeerStatus> {
    const response = await this.forceGetFetch()(this.forceGetTelemetryURL() + ENDPOINT_STATUS)
    ResponseError.throwIfStatusIsNot(response, 200)
    return response.text().then(parseJsonWithBigInts)
  }

  public async getMetrics(): Promise<string> {
    return this.forceGetFetch()(this.forceGetTelemetryURL() + ENDPOINT_METRICS).then((response) => {
      ResponseError.throwIfStatusIsNot(response, 200)
      return response.text()
    })
  }

  private forceGetApiURL(): string {
    if (!this.toriiApiURL) throw ClientIncompleteConfigError.missing('Torii API URL')
    return this.toriiApiURL
  }

  private forceGetTelemetryURL(): string {
    if (!this.toriiTelemetryURL) throw ClientIncompleteConfigError.missing('Torii Telemetry URL')
    return this.toriiTelemetryURL
  }

  private forceGetAccountId(): AccountId {
    if (!this.accountId) throw ClientIncompleteConfigError.missing('Account ID')
    return this.accountId
  }

  private forceGetKeyPair(): KeyPair {
    if (!this.keyPair) throw ClientIncompleteConfigError.missing('Key Pair')
    return this.keyPair
  }

  private forceGetWs(): IsomorphicWebSocketAdapter {
    if (!this.ws) throw ClientIncompleteConfigError.missing('WebSocket Adapter')
    return this.ws
  }

  private forceGetFetch(): typeof fetch {
    if (!this.fetch) throw ClientIncompleteConfigError.fetchIsNotProvided()
    return this.fetch
  }
}
