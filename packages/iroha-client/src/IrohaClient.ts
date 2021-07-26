import { IrohaTypes, types, Enum, Result } from '@iroha/data-model';
import Axios, { AxiosInstance, AxiosError } from 'axios';
import { hexToBytes } from 'hada';
import { setupEventsWebsocketConnection } from './events';
import JSBI from 'jsbi';

import {
    IrohaClientConfiguration,
    IrohaClientInitParams,
    HashFn,
    SignFn,
    IrohaEventAPIReturn,
    IrohaEventsAPIParams,
} from './types';

export default class IrohaClient {
    private readonly config: IrohaClientConfiguration;

    private readonly hashFn: HashFn;

    private readonly signFn: SignFn;

    private readonly privateKeyParsed: Uint8Array;

    private readonly publicKeyParsed: Uint8Array;

    private readonly axios: AxiosInstance;

    public constructor(params: IrohaClientInitParams) {
        const { config, hashFn, signFn } = params;

        [this.config, this.signFn, this.hashFn] = [config, signFn, hashFn];

        this.privateKeyParsed = new Uint8Array(hexToBytes(config.privateKey.hex));
        this.publicKeyParsed = new Uint8Array(hexToBytes(config.publicKey.hex));

        this.axios = Axios.create({
            baseURL: config.toriiURL,
        });
    }

    public async submitInstruction(instruction: IrohaTypes['iroha_data_model::isi::Instruction']) {
        const payload: IrohaTypes['iroha_data_model::transaction::Payload'] = {
            accountId: this.config.account,
            instructions: [instruction],
            creationTime: JSBI.BigInt(Date.now()),
            timeToLiveMs: JSBI.BigInt(100_000),
            metadata: new Map(),
        };

        const payloadHash = this.hashFn(types.encode('iroha_data_model::transaction::Payload', payload));

        const payloadSignature = this.makeSignature(payloadHash);

        const transation: IrohaTypes['iroha_data_model::transaction::Transaction'] = {
            payload,
            signatures: [payloadSignature],
        };

        const versioned: IrohaTypes['iroha_data_model::transaction::VersionedTransaction'] = Enum.create('V1', [
            transation,
        ]);

        await this.axios.post(
            '/instruction',
            types.encode('iroha_data_model::transaction::VersionedTransaction', versioned),
        );
    }

    /**
     * Query API entry point
     */
    public async query(
        queryBox: IrohaTypes['iroha_data_model::query::QueryBox'],
    ): Promise<Result<IrohaTypes['iroha_data_model::Value'], Error>> {
        // timestamp and QueryBox
        const timestampMs = Date.now();

        // building payload
        const payload: IrohaTypes['iroha_data_model::query::Payload'] = {
            timestampMs: JSBI.BigInt(timestampMs),
            query: queryBox,
            accountId: this.config.account,
        };

        // computing hash and signature
        const bufferForHash = types.encode('iroha_data_model::query::Payload', payload);
        const hash = this.hashFn(bufferForHash);
        const signature = this.makeSignature(hash);

        // building signed query request
        const signedQueryRequest: IrohaTypes['iroha_data_model::query::SignedQueryRequest'] = {
            payload,
            signature,
        };

        // versionize
        const versionedBytes = types.encode(
            'iroha_data_model::query::VersionedSignedQueryRequest',
            Enum.create('V1', [signedQueryRequest]),
        );

        // making request
        try {
            const { data }: { data: ArrayBuffer } = await this.axios({
                url: '/query',
                method: 'GET',
                data: versionedBytes,
                responseType: 'arraybuffer',
            });

            // decoding as QueryResult
            return Enum.create('Ok', types.decode('iroha_data_model::query::QueryResult', new Uint8Array(data))[0]);
        } catch (err) {
            if ((err as AxiosError).isAxiosError) {
                const { response: { status, data } = {} } = err as AxiosError;

                if (status === 500) {
                    return Enum.create('Err', new Error(`Request failed with message from Iroha: ${data}`));
                }
            }

            throw err;
        }
    }

    public listenToEvents(params: Pick<IrohaEventsAPIParams, 'eventFilter' | 'on'>): Promise<IrohaEventAPIReturn> {
        return setupEventsWebsocketConnection({
            ...params,
            baseURL: this.config.toriiURL,
        });
    }

    /**
     * Check Iroha health
     */
    public async health(): Promise<Result<null, Error>> {
        try {
            const { data } = await this.axios.get<'Healthy'>('/health');
            if (data !== 'Healthy') {
                throw new Error('Peer is not healthy');
            }
            return Enum.create('Ok', null);
        } catch (err) {
            return Enum.create('Err', err);
        }
    }

    private makeSignature(payload: Uint8Array): IrohaTypes['iroha_crypto::Signature'] {
        const signature = this.signFn(payload, this.privateKeyParsed);

        return {
            publicKey: {
                digestFunction: 'ed25519',
                payload: this.publicKeyParsed,
            },
            signature,
        };
    }
}
