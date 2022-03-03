import {
    AccountId,
    BTreeMapNameValue,
    Enum,
    Executable,
    QueryBox,
    QueryPayload,
    QueryPayloadCodec,
    QueryResult,
    Result,
    Signature,
    TransactionPayload,
    TransactionPayloadCodec,
    Value,
    VersionedQueryResultCodec,
    VersionedSignedQueryRequestCodec,
    VersionedTransactionCodec,
} from '@iroha2/data-model';
import { IrohaCryptoInterface, KeyPair } from '@iroha2/crypto-core';
import { fetch } from '@iroha2/client-isomorphic-fetch';
import { collect as collectGarbage, createScope as createGarbageScope } from './collect-garbage';
import { randomU32 } from './util';
import { getCrypto } from './crypto-singleton';
import { SetupEventsParams, SetupEventsReturn, setupEvents } from './events';
import { setupBlocksStream, SetupBlocksStreamParams, SetupBlocksStreamReturn } from './blocks-stream';
import {
    ENDPOINT_CONFIGURATION,
    ENDPOINT_HEALTH,
    ENDPOINT_METRICS,
    ENDPOINT_QUERY,
    ENDPOINT_STATUS,
    ENDPOINT_TRANSACTION,
    HEALTHY_RESPONSE,
} from './const';

function useCryptoAssertive(): IrohaCryptoInterface {
    const crypto = getCrypto();
    if (!crypto) {
        throw new Error(
            '"crypto" is not defined, but required for Iroha Client to function. ' +
                'Have you set it with `setCrypto()`?',
        );
    }
    return crypto;
}

export class ClientIncompleteConfigError extends Error {
    public constructor(missing: string) {
        super(`You are trying to use client with incomplete configuration. Missing: ${missing}`);
    }
}

export class ResponseError extends Error {
    public static throwIfStatusIsNot(response: Response, status: number) {
        if (response.status !== status) throw new ResponseError(response);
    }

    public constructor(response: Response) {
        super(`${response.status}: ${response.statusText}`);
    }
}

export interface SubmitParams {
    nonce?: number;
    metadata?: BTreeMapNameValue;
}

export type HealthResult = Result<null, string>;

export type RequestResult = Result<Value, QueryResult>;

export type ListenEventsParams = Pick<SetupEventsParams, 'filter'>;

export type ListenBlocksStreamParams = Pick<SetupBlocksStreamParams, 'height'>;

export interface PeerStatus {
    peers: number;
    blocks: number;
    txs: number;
    uptime: number;
}

export interface SetPeerConfigParams {
    LogLevel?: 'WARN' | 'ERROR' | 'INFO' | 'DEBUG' | 'TRACE';
}

export interface UserConfig {
    torii: {
        apiURL?: string | null;
        telemetryURL?: string | null;
    };
    keyPair?: KeyPair;
    accountId?: AccountId;
    transaction?: {
        /**
         * @default 100_000n
         */
        timeToLiveMs?: bigint;
        /**
         * @default false
         */
        addNonce?: boolean;
    };
}

function makeSignature(keyPair: KeyPair, payload: Uint8Array): Signature {
    const { createSignature } = useCryptoAssertive();

    const signature = collectGarbage(createSignature(keyPair, payload));

    // Should it be collected?
    const pubKey = keyPair.publicKey();

    return {
        public_key: {
            digest_function: pubKey.digestFunction(),
            payload: pubKey.payload(),
        },
        signature: signature.signatureBytes(),
    };
}

/**
 *
 * @remarks
 *
 * TODO: `submitBlocking` method, i.e. `submit` + listening for submit
 */
export class Client {
    public toriiApiURL: string | null;
    public toriiTelemetryURL: string | null;
    public keyPair: null | KeyPair;
    public accountId: null | AccountId;
    public transactionDefaultTTL: bigint;
    public transactionAddNonce: boolean;

    public constructor(config: UserConfig) {
        this.toriiApiURL = config.torii.apiURL ?? null;
        this.toriiTelemetryURL = config.torii.telemetryURL ?? null;
        this.transactionAddNonce = config.transaction?.addNonce ?? false;
        this.transactionDefaultTTL = config.transaction?.timeToLiveMs ?? 100_000n;
        this.keyPair = config.keyPair ?? null;
        this.accountId = config.accountId ?? null;
    }

    // TODO nice to have
    // public signQuery(payload: QueryPayload): SignedQueryRequest {}
    // public signTransaction(tx: Transaction): Transaction {}

    public async getHealth(): Promise<HealthResult> {
        const url = this.forceGetApiURL();

        const response = await fetch(url + ENDPOINT_HEALTH);
        ResponseError.throwIfStatusIsNot(response, 200);

        const text = await response.text();
        if (text !== HEALTHY_RESPONSE) {
            return Enum.variant('Err', `Expected '${HEALTHY_RESPONSE}' response; got: '${text}'`);
        }

        return Enum.variant('Ok', null);
    }

    public async submit(executable: Executable, params?: SubmitParams): Promise<void> {
        const scope = createGarbageScope();

        const { createHash } = useCryptoAssertive();
        const accountId = this.forceGetAccountId();
        const keyPair = this.forceGetKeyPair();
        const url = this.forceGetApiURL();

        const payload: TransactionPayload = {
            instructions: executable,
            time_to_live_ms: this.transactionDefaultTTL,
            nonce: params?.nonce
                ? Enum.variant('Some', params.nonce)
                : this.transactionAddNonce
                ? Enum.variant('Some', randomU32())
                : Enum.variant('None'),
            metadata: params?.metadata ?? new Map(),
            creation_time: BigInt(Date.now()),
            account_id: accountId,
        };

        try {
            let finalBytes: Uint8Array;

            scope.run(() => {
                const payloadHash = collectGarbage(createHash(TransactionPayloadCodec.toBuffer(payload)));
                const signature = makeSignature(keyPair, payloadHash.bytes());

                finalBytes = VersionedTransactionCodec.toBuffer(
                    Enum.variant('V1', { payload, signatures: [signature] }),
                );
            });

            const response = await fetch(url + ENDPOINT_TRANSACTION, {
                body: finalBytes!,
                method: 'POST',
            });

            ResponseError.throwIfStatusIsNot(response, 200);
        } finally {
            scope.free();
        }
    }

    public async request(query: QueryBox): Promise<RequestResult> {
        const scope = createGarbageScope();
        const { createHash } = useCryptoAssertive();
        const url = this.forceGetApiURL();
        const accountId = this.forceGetAccountId();
        const keyPair = this.forceGetKeyPair();

        const payload: QueryPayload = {
            query,
            account_id: accountId,
            timestamp_ms: BigInt(Date.now()),
        };

        try {
            let queryBytes: Uint8Array;

            scope.run(() => {
                const payloadHash = collectGarbage(createHash(QueryPayloadCodec.toBuffer(payload)));
                const signature = makeSignature(keyPair, payloadHash.bytes());

                queryBytes = VersionedSignedQueryRequestCodec.toBuffer(Enum.variant('V1', { payload, signature }));
            });

            const response = await fetch(url + ENDPOINT_QUERY, {
                method: 'POST',
                body: queryBytes!,
            }).then();

            if (response.status === 200) {
                // OK
                const bytes = new Uint8Array(await response.arrayBuffer());
                const value = VersionedQueryResultCodec.fromBuffer(bytes).as('V1');
                return Enum.variant('Ok', value);
            } else {
                // TODO
            }
        } finally {
            scope.free();
        }
    }

    public async listenForEvents(params: ListenEventsParams): Promise<SetupEventsReturn> {
        return setupEvents({
            filter: params.filter,
            toriiApiURL: this.forceGetApiURL(),
        });
    }

    public async listenForBlocksStream(params: ListenBlocksStreamParams): Promise<SetupBlocksStreamReturn> {
        return setupBlocksStream({
            height: params.height,
            toriiApiURL: this.forceGetApiURL(),
        });
    }

    // TODO Iroha WIP
    // public async getPeerConfig() {
    //     await fetch(this.forceGetToriiApiURL() + '/configuration');
    // }

    public async setPeerConfig(params: SetPeerConfigParams): Promise<void> {
        const response = await fetch(this.forceGetApiURL() + ENDPOINT_CONFIGURATION, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        ResponseError.throwIfStatusIsNot(response, 200);
    }

    public async getStatus(): Promise<PeerStatus> {
        const response = await fetch(this.forceGetTelemetryURL() + ENDPOINT_STATUS);
        ResponseError.throwIfStatusIsNot(response, 200);
        return response.json();
    }

    public async getMetrics(): Promise<string> {
        return fetch(this.forceGetTelemetryURL() + ENDPOINT_METRICS).then((response) => {
            ResponseError.throwIfStatusIsNot(response, 200);
            return response.text();
        });
    }

    private forceGetApiURL(): string {
        if (!this.toriiApiURL) throw new ClientIncompleteConfigError('Torii API URL');
        return this.toriiApiURL;
    }

    private forceGetTelemetryURL(): string {
        if (!this.toriiTelemetryURL) throw new ClientIncompleteConfigError('Torii Telemetry URL');
        return this.toriiTelemetryURL;
    }

    private forceGetAccountId(): AccountId {
        if (!this.accountId) throw new ClientIncompleteConfigError('Account ID');
        return this.accountId;
    }

    private forceGetKeyPair(): KeyPair {
        if (!this.keyPair) throw new ClientIncompleteConfigError('Key Pair');
        return this.keyPair;
    }
}
