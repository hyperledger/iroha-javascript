import { IrohaTypes, types, Enum } from '@iroha/data-model';
import Axios, { AxiosInstance, AxiosError } from 'axios';
import { hexToBytes } from 'hada';
import { IrohaEventAPIReturn, IrohaEventsAPIParams, setupEventsWebsocketConnection } from './events';
import JSBI from 'jsbi';
import { concatUint8Arrays } from '@scale-codec/util';

export interface Key {
    digest: string;
    hex: string;
}

export interface IrohaClientConfiguration {
    account: {
        name: string;
        domainName: string;
    };
    publicKey: Key;
    privateKey: Key;
    baseUrl: string;
    hasher: (payload: Uint8Array) => Uint8Array;
    signer: (payload: Uint8Array, privateKey: Uint8Array) => Uint8Array;
}

export class IrohaClient {
    private readonly config: IrohaClientConfiguration;

    private readonly privateKeyBytes: Uint8Array;

    private readonly publicKeyBytes: Uint8Array;

    private readonly axios: AxiosInstance;

    public constructor(config: IrohaClientConfiguration) {
        this.config = config;

        this.privateKeyBytes = new Uint8Array(hexToBytes(config.privateKey.hex));
        this.publicKeyBytes = new Uint8Array(hexToBytes(config.publicKey.hex));

        this.axios = Axios.create({
            baseURL: this.config.baseUrl,
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

        const payloadHash = this.config.hasher(types.encode('iroha_data_model::transaction::Payload', payload));

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
    public async request(
        queryBox: IrohaTypes['iroha_data_model::query::QueryBox'],
    ): Promise<IrohaTypes['iroha_data_model::query::QueryResult']> {
        // timestamp and QueryBox
        const timestampMs = Date.now();

        // computing hash and signature
        const bufferForHash = concatUint8Arrays([
            types.encode('iroha_data_model::query::QueryBox', queryBox),
            types.encode('u128', JSBI.BigInt(timestampMs)),
        ]);
        const hash = this.config.hasher(bufferForHash);
        const signature = this.makeSignature(hash);

        // building signed query request
        const signedQueryRequest: IrohaTypes['iroha_data_model::query::SignedQueryRequest'] = {
            timestampMs: JSBI.BigInt(timestampMs),
            signature,
            query: queryBox,
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
            return types.decode('iroha_data_model::query::QueryResult', new Uint8Array(data));
        } catch (err) {
            if ((err as AxiosError).isAxiosError) {
                const { response: { status, data } = {} } = err as AxiosError;

                if (status === 500) {
                    console.error('Request failed with message from Iroha:\n%s', data);
                }
            }

            throw err;
        }
    }

    public listenToEvents(params: Pick<IrohaEventsAPIParams, 'eventFilter' | 'on'>): Promise<IrohaEventAPIReturn> {
        return setupEventsWebsocketConnection({
            ...params,
            baseURL: this.config.baseUrl,
        });
    }

    private makeSignature(bytes: Uint8Array): IrohaTypes['iroha_crypto::Signature'] {
        const signatureBytes = this.config.signer(bytes, this.privateKeyBytes);

        return {
            publicKey: {
                digestFunction: 'ed25519',
                // FIXME non optimal
                payload: [...this.publicKeyBytes].map((x) => JSBI.BigInt(x)),
            },
            // FIXME too
            signature: [...signatureBytes].map((x) => JSBI.BigInt(x)),
        };
    }
}
