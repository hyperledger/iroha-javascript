/* tslint:disable */
/* eslint-disable */
/**
 */
export enum JsAlgorithm {
    /**
     * Ed25519
     */
    Ed25519,
    /**
     * Secp256k1
     */
    Secp256k1,
    /**
     * BlsSmall
     */
    BlsSmall,
    /**
     * BlsNormal
     */
    BlsNormal,
}
/**
 */
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
/**
 * Configuration of key generation
 */
export class JsKeyGenConfiguration {
    free(): void;
    /**
     */
    constructor();
    /**
     * Use seed
     * @param {Uint8Array} seed
     * @returns {JsKeyGenConfiguration}
     */
    use_seed(seed: Uint8Array): JsKeyGenConfiguration;
    /**
     * Use private key
     * @param {JsPrivateKey} private_key
     * @returns {JsKeyGenConfiguration}
     */
    use_private_key(private_key: JsPrivateKey): JsKeyGenConfiguration;
    /**
     * with algorithm
     * @param {number} algorithm
     * @returns {JsKeyGenConfiguration}
     */
    with_algorithm(algorithm: number): JsKeyGenConfiguration;
}
/**
 */
export class JsKeyPair {
    free(): void;
    /**
     * @param {JsKeyGenConfiguration} config
     * @returns {JsKeyPair}
     */
    static generate_with_configuration(config: JsKeyGenConfiguration): JsKeyPair;
    /**
     * @returns {JsPrivateKey}
     */
    readonly private_key: JsPrivateKey;
    /**
     * @returns {JsPublicKey}
     */
    readonly public_key: JsPublicKey;
}
/**
 */
export class JsMultihash {
    free(): void;
    /**
     * @returns {Uint8Array}
     */
    to_bytes(): Uint8Array;
    /**
     * @param {Uint8Array} bytes
     * @returns {JsMultihash}
     */
    static from_bytes(bytes: Uint8Array): JsMultihash;
    /**
     * @param {JsPublicKey} arg0
     * @returns {JsMultihash}
     */
    static from_public_key(arg0: JsPublicKey): JsMultihash;
}
export class JsMultihashDigestFunction {
    free(): void;
    /**
     * @param {any} val
     * @returns {number}
     */
    static from_string(val: any): number;
}
/**
 */
export class JsPrivateKey {
    free(): void;
    /**
     * @returns {any}
     */
    readonly digest_function: any;
    /**
     * @returns {Uint8Array}
     */
    readonly payload: Uint8Array;
}
/**
 */
export class JsPublicKey {
    free(): void;
    /**
     * @param {JsMultihash} arg0
     * @returns {JsPublicKey}
     */
    static from_multihash(arg0: JsMultihash): JsPublicKey;
    /**
     * @returns {any}
     */
    readonly digest_function: any;
    /**
     * @returns {Uint8Array}
     */
    readonly payload: Uint8Array;
}
/**
 */
export class JsSignature {
    free(): void;
    /**
     * @param {JsKeyPair} key_pair
     * @param {Uint8Array} payload
     */
    constructor(key_pair: JsKeyPair, payload: Uint8Array);
    /**
     * @param {Uint8Array} message
     */
    verify(message: Uint8Array): void;
}
