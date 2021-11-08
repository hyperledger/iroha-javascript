/* eslint-disable */

/**
 * @param {KeyPair} key_pair
 * @param {Uint8Array} payload
 * @returns {Signature}
 */
declare function createSignature(key_pair: KeyPair, payload: Uint8Array): Signature;
/**
 * @returns {Algorithm}
 */
declare function AlgorithmBlsNormal(): Algorithm;
/**
 * @returns {Algorithm}
 */
declare function AlgorithmBlsSmall(): Algorithm;
/**
 * @returns {Algorithm}
 */
declare function AlgorithmSecp256k1(): Algorithm;
/**
 * @returns {Algorithm}
 */
declare function AlgorithmEd25519(): Algorithm;
/**
 * @returns {KeyGenConfiguration}
 */
declare function createKeyGenConfiguration(): KeyGenConfiguration;
/**
 * @param {Key} key
 * @returns {PrivateKey}
 */
declare function createPrivateKeyFromJsKey(key: Key): PrivateKey;
/**
 * @param {Multihash} multihash
 * @returns {PublicKey}
 */
declare function createPublicKeyFromMultihash(multihash: Multihash): PublicKey;
/**
 * @param {KeyGenConfiguration} config
 * @returns {KeyPair}
 */
declare function generateKeyPairWithConfiguration(config: KeyGenConfiguration): KeyPair;
/**
 * @param {PublicKey} public_key
 * @param {PrivateKey} private_key
 * @returns {KeyPair}
 */
declare function createKeyPairFromKeys(public_key: PublicKey, private_key: PrivateKey): KeyPair;
/**
 * @returns {MultihashDigestFunction}
 */
declare function MultihashDigestEd25519Pub(): MultihashDigestFunction;
/**
 * @returns {MultihashDigestFunction}
 */
declare function MultihashDigestSecp256k1Pub(): MultihashDigestFunction;
/**
 * @returns {MultihashDigestFunction}
 */
declare function MultihashDigestBls12381g1Pub(): MultihashDigestFunction;
/**
 * @returns {MultihashDigestFunction}
 */
declare function MultihashDigestBls12381g2Pub(): MultihashDigestFunction;
/**
 * @param {string} val
 * @returns {MultihashDigestFunction}
 */
declare function createMultihashDigestFunctionFromString(val: string): MultihashDigestFunction;
/**
 * @param {Uint8Array} bytes
 * @returns {Multihash}
 */
declare function createMultihashFromBytes(bytes: Uint8Array): Multihash;
/**
 * @param {PublicKey} public_key
 * @returns {Multihash}
 */
declare function createMultihashFromPublicKey(public_key: PublicKey): Multihash;
/**
 * @param {Uint8Array} input
 * @returns {Hash}
 */
declare function createHash(input: Uint8Array): Hash;

interface Key {
    digestFunction: string;
    payload: string;
}

/**
 */
declare class Algorithm {
    free(): void;
}
/**
 */
declare class Hash {
    free(): void;
    /**
     * @returns {Uint8Array}
     */
    bytes(): Uint8Array;
}
/**
 * Configuration of key generation
 */
declare class KeyGenConfiguration {
    free(): void;
    /**
     * Use seed
     * @param {Uint8Array} seed
     * @returns {KeyGenConfiguration}
     */
    useSeed(seed: Uint8Array): KeyGenConfiguration;
    /**
     * Use private key
     * @param {PrivateKey} private_key
     * @returns {KeyGenConfiguration}
     */
    usePrivateKey(private_key: PrivateKey): KeyGenConfiguration;
    /**
     * with algorithm
     * @param {Algorithm} algorithm
     * @returns {KeyGenConfiguration}
     */
    withAlgorithm(algorithm: Algorithm): KeyGenConfiguration;
}
/**
 */
declare class KeyPair {
    free(): void;
    /**
     * @returns {PublicKey}
     */
    publicKey(): PublicKey;
    /**
     * @returns {PrivateKey}
     */
    privateKey(): PrivateKey;
}
/**
 */
declare class Multihash {
    free(): void;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @returns {MultihashDigestFunction}
     */
    digestFunction(): MultihashDigestFunction;
    /**
     * @returns {Uint8Array}
     */
    payload(): Uint8Array;
}
/**
 */
declare class MultihashDigestFunction {
    free(): void;
    /**
     * @returns {string}
     */
    toString(): string;
}
/**
 */
declare class PrivateKey {
    free(): void;
    /**
     * @returns {string}
     */
    digestFunction(): string;
    /**
     * @returns {Uint8Array}
     */
    payload(): Uint8Array;
}
/**
 */
declare class PublicKey {
    free(): void;
    /**
     * @returns {string}
     */
    digestFunction(): string;
    /**
     * @returns {Uint8Array}
     */
    payload(): Uint8Array;
}
/**
 */
declare class Signature {
    free(): void;
    /**
     * Throws an error in case of failed verification and just succeeds if verification is passed
     * @param {Uint8Array} payload
     */
    verify(payload: Uint8Array): void;
    /**
     * @returns {PublicKey}
     */
    publicKey(): PublicKey;
    /**
     * @returns {Uint8Array}
     */
    signatureBytes(): Uint8Array;
}

// this file contains generic, environment-agnostic interface of Iroha Crypto library

interface IrohaCryptoInterface {
    createHash: typeof createHash;
    createKeyGenConfiguration: typeof createKeyGenConfiguration;
    createPublicKeyFromMultihash: typeof createPublicKeyFromMultihash;
    createSignature: typeof createSignature;
    createPrivateKeyFromJsKey: typeof createPrivateKeyFromJsKey;
    generateKeyPairWithConfiguration: typeof generateKeyPairWithConfiguration;
    createMultihashFromPublicKey: typeof createMultihashFromPublicKey;
    createMultihashDigestFunctionFromString: typeof createMultihashDigestFunctionFromString;
    createMultihashFromBytes: typeof createMultihashFromBytes;
    MultihashDigestBls12381g1Pub: typeof MultihashDigestBls12381g1Pub;
    MultihashDigestBls12381g2Pub: typeof MultihashDigestBls12381g2Pub;
    MultihashDigestEd25519Pub: typeof MultihashDigestEd25519Pub;
    MultihashDigestSecp256k1Pub: typeof MultihashDigestSecp256k1Pub;
    AlgorithmBlsNormal: typeof AlgorithmBlsNormal;
    AlgorithmBlsSmall: typeof AlgorithmBlsSmall;
    AlgorithmEd25519: typeof AlgorithmEd25519;
    AlgorithmSecp256k1: typeof AlgorithmSecp256k1;
    createKeyPairFromKeys: typeof createKeyPairFromKeys;
}

export {
    Algorithm,
    Hash,
    IrohaCryptoInterface,
    Key,
    KeyGenConfiguration,
    KeyPair,
    Multihash,
    MultihashDigestFunction,
    PrivateKey,
    PublicKey,
    Signature,
};
