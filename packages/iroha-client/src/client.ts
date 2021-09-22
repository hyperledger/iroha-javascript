import {
    Enum,
    iroha_crypto_Signature_Decoded,
    iroha_data_model_query_Payload_Encodable,
    iroha_data_model_query_Payload_encode,
    iroha_data_model_query_QueryResult_decode,
    iroha_data_model_query_VersionedSignedQueryRequest_encode,
    iroha_data_model_transaction_Payload_Encodable,
    iroha_data_model_transaction_Payload_encode,
    iroha_data_model_transaction_VersionedTransaction_Encodable,
    iroha_data_model_transaction_VersionedTransaction_encode,
    iroha_data_model_Value_Decoded,
    Result,
    EncodeAsIs,
    respectEncodeAsIs,
} from '@iroha2/data-model';
import { KeyPair, Signature, Hash } from '@iroha2/crypto';
import Axios, { AxiosError } from 'axios';
import { SetupEventsParams, SetupEventsReturn, setupEventsWebsocketConnection } from './events';
import { collect, createScope } from './collect-garbage';
import { normalizeArray } from './util';
import { inspect } from 'util';

export interface CreateClientParams {
    toriiURL: string;
}

export interface SubmitTransactionParams {
    payload: iroha_data_model_transaction_Payload_Encodable | EncodeAsIs;
    signing: KeyPair | KeyPair[];
}

export interface MakeQueryParams {
    payload: iroha_data_model_query_Payload_Encodable | EncodeAsIs;
    signing: KeyPair;
}

export type ListenEventsParams = Pick<SetupEventsParams, 'filter'>;

export interface Client {
    submitTransaction: (params: SubmitTransactionParams) => Promise<void>;

    makeQuery: (params: MakeQueryParams) => Promise<Result<iroha_data_model_Value_Decoded, Error>>;

    listenForEvents: (params: ListenEventsParams) => Promise<SetupEventsReturn>;

    checkHealth: () => Promise<Result<null, Error>>;
}

export function createClient(params: CreateClientParams): Client {
    const axios = Axios.create({
        baseURL: params.toriiURL,
    });

    return {
        async submitTransaction({ payload, signing }) {
            const scope = createScope();

            try {
                let txBytes: Uint8Array;

                scope.run(() => {
                    const payloadBytes = respectEncodeAsIs(payload, iroha_data_model_transaction_Payload_encode);
                    const payloadHash = collect(new Hash(payloadBytes));

                    const signatures = normalizeArray(signing).map((x) => makeSignature(x, payloadHash.bytes));

                    const tx: iroha_data_model_transaction_VersionedTransaction_Encodable = Enum.create('V1', [
                        {
                            payload,
                            signatures: new Set(signatures),
                        },
                    ]);

                    // console.log(inspect(tx, true, 20, true));

                    txBytes = iroha_data_model_transaction_VersionedTransaction_encode(tx);
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
                    const payloadBytes = respectEncodeAsIs(payload, iroha_data_model_query_Payload_encode);
                    const payloadHash = collect(new Hash(payloadBytes));

                    const signature = makeSignature(signing, payloadHash.bytes);

                    queryBytes = iroha_data_model_query_VersionedSignedQueryRequest_encode(
                        Enum.create('V1', [
                            {
                                payload,
                                signature,
                            },
                        ]),
                    );
                });

                try {
                    const { data }: { data: ArrayBuffer } = await axios.post('/query', queryBytes!, {
                        responseType: 'arraybuffer',
                    });

                    const decoded: iroha_data_model_Value_Decoded = iroha_data_model_query_QueryResult_decode(
                        new Uint8Array(data),
                    )[0][0];

                    // decoding as QueryResult
                    return Enum.create<any, any>('Ok', decoded);
                } catch (err) {
                    if ((err as AxiosError).isAxiosError) {
                        const { response: { status, data } = {} } = err as AxiosError;

                        if (status === 500) {
                            return Enum.create('Err', new Error(`Request failed with message from Iroha: ${data}`));
                        }
                        if (status === 400) {
                            return Enum.create('Err', new Error(String(data)));
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
                return Enum.create('Ok', null);
            } catch (err) {
                return Enum.create('Err', err);
            }
        },
    };
}

function makeSignature(keyPair: KeyPair, payload: Uint8Array): iroha_crypto_Signature_Decoded {
    const signature = collect(new Signature(keyPair, payload));

    // Should it be collected?
    const pubKey = keyPair.public_key;

    return {
        public_key: {
            digest_function: pubKey.digest_function,
            payload: pubKey.payload,
        },
        signature: signature.signature,
    };
}
