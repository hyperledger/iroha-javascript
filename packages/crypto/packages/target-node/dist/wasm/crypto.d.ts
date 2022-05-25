/* tslint:disable */
/* eslint-disable */
/**
*/
export function main(): void;
/**
* @param {KeyPair} key_pair
* @param {Uint8Array} payload
* @returns {Signature}
*/
export function createSignature(key_pair: KeyPair, payload: Uint8Array): Signature;
/**
* @returns {Algorithm}
*/
export function AlgorithmBlsNormal(): Algorithm;
/**
* @returns {Algorithm}
*/
export function AlgorithmBlsSmall(): Algorithm;
/**
* @returns {Algorithm}
*/
export function AlgorithmSecp256k1(): Algorithm;
/**
* @returns {Algorithm}
*/
export function AlgorithmEd25519(): Algorithm;
/**
* @returns {KeyGenConfiguration}
*/
export function createKeyGenConfiguration(): KeyGenConfiguration;
/**
* @param {Key} key
* @returns {PrivateKey}
*/
export function createPrivateKeyFromJsKey(key: Key): PrivateKey;
/**
* @param {Multihash} multihash
* @returns {PublicKey}
*/
export function createPublicKeyFromMultihash(multihash: Multihash): PublicKey;
/**
* @param {KeyGenConfiguration} config
* @returns {KeyPair}
*/
export function generateKeyPairWithConfiguration(config: KeyGenConfiguration): KeyPair;
/**
* @param {PublicKey} public_key
* @param {PrivateKey} private_key
* @returns {KeyPair}
*/
export function createKeyPairFromKeys(public_key: PublicKey, private_key: PrivateKey): KeyPair;
/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestEd25519Pub(): MultihashDigestFunction;
/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestSecp256k1Pub(): MultihashDigestFunction;
/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestBls12381g1Pub(): MultihashDigestFunction;
/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestBls12381g2Pub(): MultihashDigestFunction;
/**
* @param {string} val
* @returns {MultihashDigestFunction}
*/
export function createMultihashDigestFunctionFromString(val: string): MultihashDigestFunction;
/**
* @param {Uint8Array} bytes
* @returns {Multihash}
*/
export function createMultihashFromBytes(bytes: Uint8Array): Multihash;
/**
* @param {PublicKey} public_key
* @returns {Multihash}
*/
export function createMultihashFromPublicKey(public_key: PublicKey): Multihash;
/**
* @param {Uint8Array} input
* @returns {Hash}
*/
export function createHash(input: Uint8Array): Hash;

export interface Key {
    digestFunction: string;
    payload: string;
}


/**
*/
export class Algorithm {
  free(): void;
}
/**
*/
export class Hash {
  free(): void;
/**
* @returns {Uint8Array}
*/
  bytes(): Uint8Array;
}
/**
* Configuration of key generation
*/
export class KeyGenConfiguration {
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
export class KeyPair {
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
export class Multihash {
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
export class MultihashDigestFunction {
  free(): void;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class PrivateKey {
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
export class PublicKey {
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
export class Signature {
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
