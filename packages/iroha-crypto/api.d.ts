export class PublicKey {
    public static from_multihash(val: Multihash): PublicKey;

    public readonly digest_function: string;
    public readonly payload: Uint8Array;
}

export class PrivateKey {
    public readonly digest_function: string;
    public readonly payload: Uint8Array;
}

export class Multihash {
    public static from_public_key(val: PublicKey): Multihash;
    public static from_bytes(val: Uint8Array): Multihash;
    public static from_hex(val: string): Multihash;

    public readonly digest_function: MultihashDigestFunction;
    public readonly payload: Uint8Array;

    public to_bytes(): Uint8Array;
}

export enum MultihashDigestFunction {
    /**
     * Ed25519
     */
    Ed25519Pub,
    /**
     * Secp256k1
     */
    Secp256k1Pub,
    /**
     * Bls12381G1
     */
    Bls12381G1Pub,
    /**
     * Bls12381G2
     */
    Bls12381G2Pub,
}

export class Hash {
    /**
     * Hashed bytes wioth blake32
     */
    public readonly bytes: Uint8Array;
    public constructor(input: Uint8Array);
}

export enum Algorithm {
    Ed25519,
    Secp256k1,
    BlsSmall,
    BlsNormal,
}

export class KeyGenConfiguration {
    public constructor();
    public use_seed(seed: Uint8Array): KeyGenConfiguration;
    public use_private_key(pk: PrivateKey): KeyGenConfiguration;
    public use_algorithm(val: Algorithm): KeyGenConfiguration;
}

export class KeyPair {
    public static generate(): KeyPair;

    public static generate_with_configuration(configuration: KeyGenConfiguration): KeyPair;

    public readonly private_key: PrivateKey;
    public readonly public_key: PublicKey;
}

export class Signature {
    public readonly public_key: PublicKey;
    public readonly signature: Uint8Array;

    public constructor(key_pair: KeyPair, payload: Uint8Array);

    public verify(message: Uint8Array): boolean;
}
