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

    listenEvents: (params: ListenEventsParams) => Promise<SetupEventsReturn>;

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

        async listenEvents({ filter }) {
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

// // export funct

// export default class IrohaClient {
//     private readonly config: IrohaClientConfiguration;

//     private readonly hashFn: HashFn;

//     private readonly signFn: SignFn;

//     private readonly privateKeyParsed: Uint8Array;

//     private readonly publicKeyParsed: Uint8Array;

//     private readonly axios: AxiosInstance;

//     public constructor(params: IrohaClientInitParams) {
//         const { config, hashFn, signFn } = params;

//         [this.config, this.signFn, this.hashFn] = [config, signFn, hashFn];

//         this.privateKeyParsed = new Uint8Array(hexToBytes(config.privateKey.hex));
//         this.publicKeyParsed = new Uint8Array(hexToBytes(config.publicKey.hex));

//         this.axios = Axios.create({
//             baseURL: config.toriiURL,
//         });
//     }

//     public async submitInstruction(instruction: IrohaTypes['iroha_data_model::isi::Instruction']) {
//         const payload: IrohaTypes['iroha_data_model::transaction::Payload'] = {
//             accountId: this.config.account,
//             instructions: [instruction],
//             creationTime: JSBI.BigInt(Date.now()),
//             timeToLiveMs: JSBI.BigInt(100_000),
//             metadata: new Map(),
//         };

//         const payloadHash = this.hashFn(types.encode('iroha_data_model::transaction::Payload', payload));

//         const payloadSignature = this.makeSignature(payloadHash);

//         const transation: IrohaTypes['iroha_data_model::transaction::Transaction'] = {
//             payload,
//             signatures: [payloadSignature],
//         };

//         const versioned: IrohaTypes['iroha_data_model::transaction::VersionedTransaction'] = Enum.create('V1', [
//             transation,
//         ]);

//         await this.axios.post(
//             '/instruction',
//             types.encode('iroha_data_model::transaction::VersionedTransaction', versioned),
//         );
//     }

//     /**
//      * Query API entry point
//      */
//     public async query(
//         queryBox: IrohaTypes['iroha_data_model::query::QueryBox'],
//     ): Promise<Result<IrohaTypes['iroha_data_model::Value'], Error>> {
//         // timestamp and QueryBox
//         const timestampMs = Date.now();

//         // building payload
//         const payload: IrohaTypes['iroha_data_model::query::Payload'] = {
//             timestampMs: JSBI.BigInt(timestampMs),
//             query: queryBox,
//             accountId: this.config.account,
//         };

//         // computing hash and signature
//         const bufferForHash = types.encode('iroha_data_model::query::Payload', payload);
//         const hash = this.hashFn(bufferForHash);
//         const signature = this.makeSignature(hash);

//         // building signed query request
//         const signedQueryRequest: IrohaTypes['iroha_data_model::query::SignedQueryRequest'] = {
//             payload,
//             signature,
//         };

//         // versionize
//         const versionedBytes = types.encode(
//             'iroha_data_model::query::VersionedSignedQueryRequest',
//             Enum.create('V1', [signedQueryRequest]),
//         );

//         // making request
//         try {
//             const { data }: { data: ArrayBuffer } = await this.axios({
//                 url: '/query',
//                 method: 'GET',
//                 data: versionedBytes,
//                 responseType: 'arraybuffer',
//             });

//             // decoding as QueryResult
//             return Enum.create('Ok', types.decode('iroha_data_model::query::QueryResult', new Uint8Array(data))[0]);
//         } catch (err) {
//             if ((err as AxiosError).isAxiosError) {
//                 const { response: { status, data } = {} } = err as AxiosError;

//                 if (status === 500) {
//                     return Enum.create('Err', new Error(`Request failed with message from Iroha: ${data}`));
//                 }
//             }

//             throw err;
//         }
//     }

//     public listenToEvents(params: Pick<IrohaEventsAPIParams, 'eventFilter' | 'on'>): Promise<IrohaEventAPIReturn> {
//         return setupEventsWebsocketConnection({
//             ...params,
//             toriiURL: this.config.toriiURL,
//         });
//     }

//     /**
//      * Check Iroha health
//      */
//     public async health(): Promise<Result<null, Error>> {
//         try {
//             const { data } = await this.axios.get<'Healthy'>('/health');
//             if (data !== 'Healthy') {
//                 throw new Error('Peer is not healthy');
//             }
//             return Enum.create('Ok', null);
//         } catch (err) {
//             return Enum.create('Err', err);
//         }
//     }

//     private makeSignature(payload: Uint8Array): IrohaTypes['iroha_crypto::Signature'] {
//         const signature = this.signFn(payload, this.privateKeyParsed);

//         return {
//             publicKey: {
//                 digestFunction: 'ed25519',
//                 payload: this.publicKeyParsed,
//             },
//             signature,
//         };
//     }
// }
