import { IrohaTypes, types, Enum, Result } from '@iroha/data-model';
import { KeyPair, Signature, Hash } from '@iroha/crypto';
import Axios, { AxiosError } from 'axios';
import { SetupEventsParams, SetupEventsReturn, setupEventsWebsocketConnection } from './events';
import { collect, createScope } from './collect-garbage';
import { normalizeArray } from './util';

export interface CreateClientParams {
    toriiURL: string;
}

export interface SubmitTransactionParams {
    payload: IrohaTypes['iroha_data_model::transaction::Payload'];
    signing: KeyPair | KeyPair[];
}

export interface MakeQueryParams {
    payload: IrohaTypes['iroha_data_model::query::Payload'];
    signing: KeyPair;
}

export type ListenEventsParams = Pick<SetupEventsParams, 'filter'>;

export interface Client {
    submitTransaction: (params: SubmitTransactionParams) => Promise<void>;

    makeQuery: (params: MakeQueryParams) => Promise<Result<IrohaTypes['iroha_data_model::Value'], Error>>;

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
                    const payloadBytes = types.encode('iroha_data_model::transaction::Payload', payload);
                    const payloadHash = collect(new Hash(payloadBytes));

                    const signatures = normalizeArray(signing).map((x) => makeSignature(x, payloadHash.bytes));

                    const tx: IrohaTypes['iroha_data_model::transaction::VersionedTransaction'] = Enum.create('V1', [
                        {
                            payload,
                            signatures,
                        },
                    ]);

                    txBytes = types.encode('iroha_data_model::transaction::VersionedTransaction', tx);
                });

                await axios.post('/instruction', txBytes!);
            } finally {
                scope.free();
            }
        },

        async makeQuery({ payload, signing }) {
            const scope = createScope();

            try {
                let queryBytes: Uint8Array;

                scope.run(() => {
                    const payloadBytes = types.encode('iroha_data_model::query::Payload', payload);
                    const payloadHash = collect(new Hash(payloadBytes));

                    const signature = makeSignature(signing, payloadHash.bytes);

                    queryBytes = types.encode(
                        'iroha_data_model::query::VersionedSignedQueryRequest',
                        Enum.create('V1', [
                            {
                                payload,
                                signature,
                            },
                        ]),
                    );
                });

                try {
                    const { data }: { data: ArrayBuffer } = await axios({
                        url: '/query',
                        method: 'GET',
                        data: queryBytes!,
                        responseType: 'arraybuffer',
                    });

                    // decoding as QueryResult
                    return Enum.create(
                        'Ok',
                        types.decode('iroha_data_model::query::QueryResult', new Uint8Array(data))[0],
                    );
                } catch (err) {
                    if ((err as AxiosError).isAxiosError) {
                        const { response: { status, data } = {} } = err as AxiosError;

                        if (status === 500) {
                            return Enum.create('Err', new Error(`Request failed with message from Iroha: ${data}`));
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
                const { data } = await axios.get<'Healthy'>('/health');
                if (data !== 'Healthy') {
                    throw new Error('Peer is not healthy');
                }
                return Enum.create('Ok', null);
            } catch (err) {
                return Enum.create('Err', err);
            }
        },
    };
}

function makeSignature(keyPair: KeyPair, payload: Uint8Array): IrohaTypes['iroha_crypto::Signature'] {
    const signature = collect(new Signature(keyPair, payload));

    // Should it be collected?
    const pubKey = keyPair.public_key;

    return {
        publicKey: {
            digestFunction: pubKey.digest_function,
            payload: pubKey.payload,
        },
        signature: signature.signature,
    };
}
