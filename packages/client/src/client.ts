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
import Axios, { AxiosError } from 'axios';
import { SetupEventsParams, SetupEventsReturn, setupEventsWebsocketConnection } from './events';
import { collect, createScope } from './collect-garbage';
import { normalizeArray } from './util';

export interface CreateClientParams {
    torii: {
        apiUrl: string;
        statusUrl: string;
    };
    crypto: IrohaCryptoInterface;
}

export interface SubmitTransactionParams {
    payload: FragmentFromBuilder<typeof TransactionPayload>;
    signing: KeyPair | KeyPair[];
}

export interface MakeQueryParams {
    payload: FragmentFromBuilder<typeof QueryPayload>;
    signing: KeyPair;
}

export type ListenEventsParams = Pick<SetupEventsParams, 'filter'>;

export interface PeerStatus {
    peers: number;
    blocks: number;
    txs: number;
    uptime: number;
}

export interface Client {
    submitTransaction: (params: SubmitTransactionParams) => Promise<void>;

    makeQuery: (params: MakeQueryParams) => Promise<Result<FragmentFromBuilder<typeof Value>, Error>>;

    listenForEvents: (params: ListenEventsParams) => Promise<SetupEventsReturn>;

    checkStatus: () => Promise<PeerStatus>;

    checkHealth: () => Promise<Result<null, Error>>;
}

export function createClient(params: CreateClientParams): Client {
    const axiosApi = Axios.create({
        baseURL: params.torii.apiUrl,
    });
    const axiosStatus = Axios.create({
        baseURL: params.torii.statusUrl,
    });

    const {
        crypto: { createSignature, createHash },
    } = params;

    function makeSignature(keyPair: KeyPair, payload: Uint8Array): FragmentFromBuilder<typeof Signature> {
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

    return {
        async submitTransaction({ payload, signing }) {
            const scope = createScope();

            try {
                let txBytes: Uint8Array;

                scope.run(() => {
                    const payloadHash = collect(createHash(payload.bytes));
                    const signatures = normalizeArray(signing).map((x) => makeSignature(x, payloadHash.bytes()));

                    txBytes = VersionedTransaction.fromValue(
                        Enum.valuable(
                            'V1',
                            Transaction.fromValue({
                                payload,
                                signatures: BTreeSetSignature.fromValue(new Set(signatures)),
                            }),
                        ),
                    ).bytes;
                });

                await axiosApi.post('/transaction', txBytes!);
            } finally {
                scope.free();
            }
        },

        async makeQuery({ payload, signing }) {
            const scope = createScope();

            try {
                let queryBytes: Uint8Array;

                scope.run(() => {
                    const payloadHash = collect(createHash(payload.bytes));
                    const signature = makeSignature(signing, payloadHash.bytes());

                    queryBytes = VersionedSignedQueryRequest.fromValue(
                        Enum.valuable('V1', SignedQueryRequest.fromValue({ payload, signature })),
                    ).bytes;
                });

                try {
                    const { data }: { data: ArrayBuffer } = await axiosApi.post('/query', queryBytes!, {
                        responseType: 'arraybuffer',
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
        },

        async listenForEvents({ filter }) {
            return setupEventsWebsocketConnection({ filter, toriiApiUrl: params.torii.apiUrl });
        },

        async checkHealth() {
            try {
                const { status } = await axiosApi.get<'Healthy'>('/health');
                if (status !== 200) {
                    throw new Error('Peer is not healthy');
                }
                return Enum.valuable('Ok', null);
            } catch (err) {
                return Enum.valuable('Err', err);
            }
        },

        async checkStatus() {
            return axiosStatus.get<PeerStatus>('/status').then((x) => x.data);
        },
    };
}
