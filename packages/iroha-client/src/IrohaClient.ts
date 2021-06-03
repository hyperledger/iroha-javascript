import { DEFAULT_CODECS, createHelpers, CreateScaleFactory, TypeRegistry } from '@iroha/scale-codec-legacy';
import { Instruction, IrohaDslConstructorDef, runtimeDefinitions } from '@iroha/data-model';
import Axios, { AxiosInstance } from 'axios';
import hexToArrayBuffer from 'hex-to-array-buffer';

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

type AllRuntimeDefinitions = IrohaDslConstructorDef & typeof DEFAULT_CODECS;

export class IrohaClient {
    public readonly createScale: CreateScaleFactory<AllRuntimeDefinitions>;

    private readonly config: IrohaClientConfiguration;

    private readonly privateKeyBytes: Uint8Array;

    private readonly publicKeyBytes: Uint8Array;

    private readonly http: AxiosInstance;

    public constructor(config: IrohaClientConfiguration) {
        this.config = config;

        this.privateKeyBytes = new Uint8Array(hexToArrayBuffer(config.privateKey.hex));
        this.publicKeyBytes = new Uint8Array(hexToArrayBuffer(config.publicKey.hex));

        this.http = Axios.create({
            baseURL: this.config.baseUrl,
        });

        const registry = new TypeRegistry();
        registry.register(DEFAULT_CODECS);
        registry.register(runtimeDefinitions);

        const { createScale } = createHelpers<AllRuntimeDefinitions>({ runtime: registry });
        this.createScale = createScale;
    }

    public async submitInstruction(value: Instruction) {
        const payload = this.createScale('Payload', {
            accountId: this.config.account,
            instructions: [value],
        });

        const payloadHash = this.config.hasher(payload.toU8a());

        const payloadSignature = this.createScale('Signature', {
            publicKey: {
                digestFunction: 'ed25519',
                payload: this.createScale('Bytes', [...this.publicKeyBytes]),
            },
            signature: this.createScale('Bytes', [...this.config.signer(payloadHash, this.privateKeyBytes)]),
        });

        const transation = this.createScale('Transaction', {
            payload,
            signatures: [payloadSignature],
        });

        const versioned = this.createScale('VersionedTransaction', {
            V1: transation,
        });

        await this.http.post(this.config.baseUrl + '/instruction', versioned.toU8a());
    }
}
