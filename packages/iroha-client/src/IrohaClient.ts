import { CreateScaleFactory, TypeRegistry, Compact, u128, Struct } from '@iroha/scale-codec-legacy';
import { Instruction, QueryBox, Signature, QueryResult } from '@iroha/data-model';
import Axios, { AxiosInstance, AxiosError } from 'axios';
import hexToArrayBuffer from 'hex-to-array-buffer';
import { AllRuntimeDefinitions, createDSL } from './dsl';

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

function concatBytes(...parts: Uint8Array[]): Uint8Array {
    const totalLength = parts.reduce((s, { length }) => s + length, 0);
    const result = new Uint8Array(totalLength);

    for (let i = 0, offset = 0; i < parts.length; i++) {
        const part = parts[i];
        result.set(part, offset);
        offset += part.length;
    }

    return result;
}

export class IrohaClient {
    public readonly createScale: CreateScaleFactory<AllRuntimeDefinitions>;

    private readonly config: IrohaClientConfiguration;

    private readonly reg: TypeRegistry;

    private readonly privateKeyBytes: Uint8Array;

    private readonly publicKeyBytes: Uint8Array;

    private readonly axios: AxiosInstance;

    public constructor(config: IrohaClientConfiguration) {
        this.config = config;

        this.privateKeyBytes = new Uint8Array(hexToArrayBuffer(config.privateKey.hex));
        this.publicKeyBytes = new Uint8Array(hexToArrayBuffer(config.publicKey.hex));

        this.axios = Axios.create({
            baseURL: this.config.baseUrl,
        });

        ({ registry: this.reg, createScale: this.createScale } = createDSL());
    }

    public async submitInstruction(value: Instruction) {
        const payload = this.createScale('Payload', {
            accountId: this.config.account,
            instructions: [value],
        });

        const payloadHash = this.config.hasher(payload.toU8a());

        const payloadSignature = this.makeSignature(payloadHash);

        const transation = this.createScale('Transaction', {
            payload,
            signatures: [payloadSignature],
        });

        const versioned = this.createScale('VersionedTransaction', {
            V1: transation,
        });

        await this.axios.post('/instruction', versioned.toU8a());
    }

    /**
     * Query API entry point
     */
    public async request(queryBox: QueryBox): Promise<QueryResult> {
        // timestamp and QueryBox
        const timestampMs = Date.now();

        // computing hash and signature
        const bufferForHash = concatBytes(queryBox.toU8a(), new u128(this.reg, timestampMs).toU8a());
        const hash = this.config.hasher(bufferForHash);
        const signature = this.makeSignature(hash);

        // building signed query request
        const signedQueryRequest = new Struct(
            this.reg,
            {
                timestampMs: 'Compact',
                signature: 'Signature',
                query: 'QueryBox',
            },
            {
                timestampMs: new Compact(this.reg, u128, timestampMs),
                signature,
                query: queryBox,
            },
        );

        // encode and add version
        const versionedBytes = concatBytes(new Uint8Array([1]), signedQueryRequest.toU8a());

        // making request
        try {
            const { data }: { data: ArrayBuffer } = await this.axios({
                url: '/query',
                method: 'GET',
                data: versionedBytes,
                responseType: 'arraybuffer',
            });

            // decoding as QueryResult
            const result = this.createScale('QueryResult', new Uint8Array(data));

            return result;
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

    private makeSignature(bytes: Uint8Array): Signature {
        return this.createScale('Signature', {
            publicKey: {
                digestFunction: 'ed25519',
                payload: this.createScale('Bytes', [...this.publicKeyBytes]),
            },
            signature: this.createScale('Bytes', [...this.config.signer(bytes, this.privateKeyBytes)]),
        });
    }
}
