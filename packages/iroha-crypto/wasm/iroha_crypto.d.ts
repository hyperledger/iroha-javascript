/* tslint:disable */
/* eslint-disable */
/**
*/
export function main(): void;

export interface Key {
    digest_function: string;
    payload: string;
}


/**
*/
export class Algorithm {
  free(): void;
/**
* @returns {Algorithm}
*/
  static bls_normal(): Algorithm;
/**
* @returns {Algorithm}
*/
  static bls_small(): Algorithm;
/**
* @returns {Algorithm}
*/
  static secp256k1(): Algorithm;
/**
* @returns {Algorithm}
*/
  static ed25519(): Algorithm;
}
/**
*/
export class Hash {
  free(): void;
/**
* @param {Uint8Array} input
*/
  constructor(input: Uint8Array);
/**
* @returns {Uint8Array}
*/
  readonly bytes: Uint8Array;
}
/**
* Configuration of key generation
*/
export class KeyGenConfiguration {
  free(): void;
/**
*/
  constructor();
/**
* Use seed
* @param {Uint8Array} seed
* @returns {KeyGenConfiguration}
*/
  use_seed(seed: Uint8Array): KeyGenConfiguration;
/**
* Use private key
* @param {PrivateKey} private_key
* @returns {KeyGenConfiguration}
*/
  use_private_key(private_key: PrivateKey): KeyGenConfiguration;
/**
* with algorithm
* @param {Algorithm} algorithm
* @returns {KeyGenConfiguration}
*/
  with_algorithm(algorithm: Algorithm): KeyGenConfiguration;
}
/**
*/
export class KeyPair {
  free(): void;
/**
* @param {KeyGenConfiguration} config
* @returns {KeyPair}
*/
  static generate_with_configuration(config: KeyGenConfiguration): KeyPair;
/**
* @param {PublicKey} public_key
* @param {PrivateKey} private_key
* @returns {KeyPair}
*/
  static from_pair(public_key: PublicKey, private_key: PrivateKey): KeyPair;
/**
* @returns {PrivateKey}
*/
  readonly private_key: PrivateKey;
/**
* @returns {PublicKey}
*/
  readonly public_key: PublicKey;
}
/**
*/
export class Multihash {
  free(): void;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* @param {Uint8Array} bytes
* @returns {Multihash}
*/
  static from_bytes(bytes: Uint8Array): Multihash;
/**
* @param {PublicKey} public_key
* @returns {Multihash}
*/
  static from_public_key(public_key: PublicKey): Multihash;
/**
* @returns {MultihashDigestFunction}
*/
  readonly digest_function: MultihashDigestFunction;
/**
* @returns {Uint8Array}
*/
  readonly payload: Uint8Array;
}
/**
*/
export class MultihashDigestFunction {
  free(): void;
/**
* @returns {MultihashDigestFunction}
*/
  static ed25519pub(): MultihashDigestFunction;
/**
* @returns {MultihashDigestFunction}
*/
  static secp256k1pub(): MultihashDigestFunction;
/**
* @returns {MultihashDigestFunction}
*/
  static bls12381g1pub(): MultihashDigestFunction;
/**
* @returns {MultihashDigestFunction}
*/
  static bls12381g2pub(): MultihashDigestFunction;
/**
* @returns {string}
*/
  to_string(): string;
/**
* @returns {BigInt}
*/
  to_u64(): BigInt;
/**
* @param {string} val
* @returns {MultihashDigestFunction}
*/
  static from_string(val: string): MultihashDigestFunction;
/**
* @param {BigInt} val
* @returns {MultihashDigestFunction}
*/
  static from_u64(val: BigInt): MultihashDigestFunction;
}
/**
*/
export class PrivateKey {
  free(): void;
/**
* @param {Key} key
* @returns {PrivateKey}
*/
  static from_js_key(key: Key): PrivateKey;
/**
* @returns {string}
*/
  readonly digest_function: string;
/**
* @returns {Uint8Array}
*/
  readonly payload: Uint8Array;
}
/**
*/
export class PublicKey {
  free(): void;
/**
* @param {Multihash} multihash
* @returns {PublicKey}
*/
  static from_multihash(multihash: Multihash): PublicKey;
/**
* @returns {string}
*/
  readonly digest_function: string;
/**
* @returns {Uint8Array}
*/
  readonly payload: Uint8Array;
}
/**
*/
export class Signature {
  free(): void;
/**
* @param {KeyPair} key_pair
* @param {Uint8Array} payload
*/
  constructor(key_pair: KeyPair, payload: Uint8Array);
/**
* @param {Uint8Array} payload
*/
  verify(payload: Uint8Array): void;
/**
* @returns {PublicKey}
*/
  readonly public_key: PublicKey;
/**
* @returns {Uint8Array}
*/
  readonly signature: Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_signature_free: (a: number) => void;
  readonly signature_new: (a: number, b: number, c: number) => number;
  readonly signature_verify: (a: number, b: number, c: number) => void;
  readonly signature_signature: (a: number, b: number) => void;
  readonly __wbg_algorithm_free: (a: number) => void;
  readonly algorithm_bls_normal: () => number;
  readonly algorithm_bls_small: () => number;
  readonly algorithm_secp256k1: () => number;
  readonly algorithm_ed25519: () => number;
  readonly __wbg_keygenconfiguration_free: (a: number) => void;
  readonly keygenconfiguration_new: () => number;
  readonly keygenconfiguration_use_seed: (a: number, b: number, c: number) => number;
  readonly keygenconfiguration_use_private_key: (a: number, b: number) => number;
  readonly keygenconfiguration_with_algorithm: (a: number, b: number) => number;
  readonly __wbg_privatekey_free: (a: number) => void;
  readonly privatekey_digest_function: (a: number, b: number) => void;
  readonly privatekey_payload: (a: number, b: number) => void;
  readonly privatekey_from_js_key: (a: number) => number;
  readonly publickey_from_multihash: (a: number) => number;
  readonly __wbg_keypair_free: (a: number) => void;
  readonly keypair_public_key: (a: number) => number;
  readonly keypair_private_key: (a: number) => number;
  readonly keypair_generate_with_configuration: (a: number) => number;
  readonly keypair_from_pair: (a: number, b: number) => number;
  readonly __wbg_multihashdigestfunction_free: (a: number) => void;
  readonly multihashdigestfunction_ed25519pub: () => number;
  readonly multihashdigestfunction_secp256k1pub: () => number;
  readonly multihashdigestfunction_bls12381g1pub: () => number;
  readonly multihashdigestfunction_bls12381g2pub: () => number;
  readonly multihashdigestfunction_to_string: (a: number, b: number) => void;
  readonly multihashdigestfunction_to_u64: (a: number, b: number) => void;
  readonly multihashdigestfunction_from_string: (a: number, b: number) => number;
  readonly multihashdigestfunction_from_u64: (a: number, b: number) => number;
  readonly __wbg_multihash_free: (a: number) => void;
  readonly multihash_to_bytes: (a: number, b: number) => void;
  readonly multihash_from_bytes: (a: number, b: number) => number;
  readonly multihash_from_public_key: (a: number) => number;
  readonly multihash_digest_function: (a: number) => number;
  readonly multihash_payload: (a: number, b: number) => void;
  readonly __wbg_hash_free: (a: number) => void;
  readonly hash_new: (a: number, b: number) => number;
  readonly hash_bytes: (a: number, b: number) => void;
  readonly publickey_payload: (a: number, b: number) => void;
  readonly main: () => void;
  readonly signature_public_key: (a: number) => number;
  readonly __wbg_publickey_free: (a: number) => void;
  readonly publickey_digest_function: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
