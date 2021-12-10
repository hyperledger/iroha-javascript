import {
    BTreeSetSignature,
    Enum,
    FragmentFromBuilder,
    QueryPayload,
    Result,
    Signature,
    SignedQueryRequest,
    Transaction,
    TransactionPayload,
    Value,
    VersionedQueryResult,
    VersionedSignedQueryRequest,
    VersionedTransaction,
} from '@iroha2/data-model';
import { IrohaCryptoInterface, KeyPair } from '@iroha2/crypto-core';
import Axios, { AxiosError, AxiosInstance } from 'axios';
import { SetupEventsParams, SetupEventsReturn, setupEventsWebsocketConnection } from './events';
import { collect, createScope } from './collect-garbage';
import { normalizeArray } from './util';
import { useCrypto } from './crypto-singleton';

function useCryptoAssertive(): IrohaCryptoInterface {
    const crypto = useCrypto();
    if (!crypto) {
        throw new Error(
            '"crypto" is not defined, but required for Iroha Client to function. ' +
                'Have you set it with `setCrypto()`?',
        );
    }
    return crypto;
}

export interface SubmitTransactionParams {
    payload: FragmentFromBuilder<typeof TransactionPayload>;
    signing: KeyPair | KeyPair[];
}

export type SubmitTransactionResult = Result<null, Error>;

export type CheckHealthResult = Result<null, Error>;

export interface MakeQueryParams {
    payload: FragmentFromBuilder<typeof QueryPayload>;
    signing: KeyPair;
}

export type MakeQueryResult = Result<FragmentFromBuilder<typeof Value>, Error>;

export type ListenEventsParams = Pick<SetupEventsParams, 'filter'>;

export interface PeerStatus {
    peers: number;
    blocks: number;
    txs: number;
    uptime: number;
}

export interface UserConfig {
    torii: {
        apiURL?: string | null;
        statusURL?: string | null;
    };
}

function makeSignature(keyPair: KeyPair, payload: Uint8Array): FragmentFromBuilder<typeof Signature> {
    const { createSignature } = useCryptoAssertive();

    const signature = collect(createSignature(keyPair, payload));

    // Should it be collected?
    const pubKey = keyPair.publicKey();

    return Signature.wrap({
        public_key: {
            digest_function: pubKey.digestFunction(),
            payload: pubKey.payload(),
        },
        signature: signature.signatureBytes(),
    });
}

export class Client {
    public static create(config: UserConfig): Client {
        return new Client(config);
    }

    private toriiApiURL: null | string;
    private toriiStatusURL: null | string;
    private axios: AxiosInstance;

    private constructor(config: UserConfig) {
        this.toriiApiURL = config.torii.apiURL ?? null;
        this.toriiStatusURL = config.torii.statusURL ?? null;
        this.axios = Axios.create();
    }

    /**
     * The way to define Torii API URL if it wasn't defined in the initial config.
     */
    public setApiURL(url: string): Client {
        this.toriiApiURL = url;
        return this;
    }

    /**
     * The way to define Torii Status URL if it wasn't defined in the initial config.
     */
    public setStatusURL(url: string): Client {
        this.toriiStatusURL = url;
        return this;
    }

    /**
     * "Status" endpoint implementation.
     *
     * @remarks
     *
     * Requires Torii Status URL in the config.
     */
    public async checkStatus(): Promise<PeerStatus> {
        return this.axios.get<PeerStatus>('/status', { baseURL: this.forceGetToriiStatusURL() }).then((x) => x.data);
    }

    /**
     * "Health" endpoint implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config.
     */
    public async checkHealth(): Promise<CheckHealthResult> {
        try {
            const { status } = await this.axios.get<'Healthy'>('/health', { baseURL: this.forceGetToriiApiURL() });
            if (status !== 200) {
                throw new Error('Peer is not healthy');
            }
            return Enum.valuable('Ok', null);
        } catch (err) {
            return Enum.valuable('Err', err);
        }
    }

    /**
     * "Transaction" enpoint implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config.
     */
    public async submitTransaction(params: SubmitTransactionParams): Promise<SubmitTransactionResult> {
        const scope = createScope();
        const { payload, signing } = params;
        const { createHash } = useCryptoAssertive();
        const baseURL = this.forceGetToriiApiURL();

        try {
            let txBytes: Uint8Array;

            scope.run(() => {
                const payloadHash = collect(createHash(payload.bytes));
                const signatures = normalizeArray(signing).map((x) => makeSignature(x, payloadHash.bytes()));

                txBytes = VersionedTransaction.variants.V1(
                    Transaction.fromValue({
                        payload,
                        signatures: BTreeSetSignature.fromValue(new Set(signatures)),
                    }),
                ).bytes;
            });

            try {
                await this.axios.post('/transaction', txBytes!, { baseURL });
                return Enum.valuable('Ok', null);
            } catch (err) {
                if (err && (err as AxiosError).isAxiosError) {
                    return Enum.valuable('Err', err);
                }
                throw err;
            }
        } finally {
            scope.free();
        }
    }

    /**
     * "Query" endpoint implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config.
     */
    public async makeQuery(params: MakeQueryParams): Promise<MakeQueryResult> {
        const scope = createScope();
        const { payload, signing } = params;
        const { createHash } = useCryptoAssertive();
        const baseURL = this.forceGetToriiApiURL();

        try {
            let queryBytes: Uint8Array;

            scope.run(() => {
                const payloadHash = collect(createHash(payload.bytes));
                const signature = makeSignature(signing, payloadHash.bytes());

                queryBytes = VersionedSignedQueryRequest.variants.V1(
                    SignedQueryRequest.fromValue({ payload, signature }),
                ).bytes;
            });

            try {
                const { data }: { data: ArrayBuffer } = await this.axios.post('/query', queryBytes!, {
                    responseType: 'arraybuffer',
                    baseURL,
                });

                const value: FragmentFromBuilder<typeof Value> = VersionedQueryResult.fromBytes(
                    new Uint8Array(data),
                ).value.as('V1');

                return Enum.valuable('Ok', value);
            } catch (err) {
                if ((err as AxiosError).isAxiosError) {
                    const { response: { status, data } = {} } = err as AxiosError;

                    if (status === 500) {
                        return Enum.valuable('Err', new Error(`Request failed with message from Iroha: ${data}`));
                    }
                    if (status === 400) {
                        return Enum.valuable('Err', new Error(String(data)));
                    }
                }

                throw err;
            }
        } finally {
            scope.free();
        }
    }

    /**
     * "Events" implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config
     */
    public async listenForEvents(params: ListenEventsParams): Promise<SetupEventsReturn> {
        return setupEventsWebsocketConnection({
            filter: params.filter,
            toriiApiURL: this.forceGetToriiApiURL(),
        });
    }

    private forceGetToriiApiURL(): string {
        if (!this.toriiApiURL) {
            throw new Error(
                'It looks like you use some endpoint that requires Torii API URL to be set, but it is undefined.',
            );
        }
        return this.toriiApiURL;
    }

    private forceGetToriiStatusURL(): string {
        if (!this.toriiStatusURL) {
            throw new Error(
                'It looks like you use some endpoint that requires Torii Status URL to be set, but it is undefined.',
            );
        }
        return this.toriiStatusURL;
    }
}
