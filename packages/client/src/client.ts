import {
    BTreeSetSignature,
    Enum,
    FragmentFromBuilder,
    QueryPayload,
    QueryResult,
    Result,
    Signature,
    SignedQueryRequest,
    Transaction,
    TransactionPayload,
    Value,
    VersionedSignedQueryRequest,
    VersionedTransaction,
} from '@iroha2/data-model';
import { IrohaCryptoInterface, KeyPair } from '@iroha2/crypto/types';
import Axios, { AxiosError } from 'axios';
import { SetupEventsParams, SetupEventsReturn, setupEventsWebsocketConnection } from './events';
import { collect, createScope } from './collect-garbage';
import { normalizeArray } from './util';

export interface CreateClientParams {
    toriiURL: string;
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

export interface Client {
    submitTransaction: (params: SubmitTransactionParams) => Promise<void>;

    makeQuery: (params: MakeQueryParams) => Promise<Result<FragmentFromBuilder<typeof Value>, Error>>;

    listenForEvents: (params: ListenEventsParams) => Promise<SetupEventsReturn>;

    checkHealth: () => Promise<Result<null, Error>>;
}

export function createClient(params: CreateClientParams): Client {
    const axios = Axios.create({
        baseURL: params.toriiURL,
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

                await axios.post('/transaction', txBytes!);
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
                    const { data }: { data: ArrayBuffer } = await axios.post('/query', queryBytes!, {
                        responseType: 'arraybuffer',
                    });

                    const value: FragmentFromBuilder<typeof Value> = QueryResult.fromBytes(new Uint8Array(data));

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
            return setupEventsWebsocketConnection({ filter, toriiURL: params.toriiURL });
        },

        async checkHealth() {
            try {
                const { status } = await axios.get<'Healthy'>('/health');
                if (status !== 200) {
                    throw new Error('Peer is not healthy');
                }
                return Enum.valuable('Ok', null);
            } catch (err) {
                return Enum.valuable('Err', err);
            }
        },
    };
}
