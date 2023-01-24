/* tslint:disable */
/* eslint-disable */
/**
* @returns {DigestFunction}
*/
export function digest_function_default(): DigestFunction;
/**
* @param {number} value
* @returns {DigestFunction}
*/
export function digest_function_from_byte_code(value: number): DigestFunction;
/**
* @param {DigestFunction} digest
* @returns {number}
*/
export function digest_function_to_byte_code(digest: DigestFunction): number;
/**
* @returns {Algorithm}
*/
export function algorithm_default(): Algorithm;
/**
*/
export function main(): void;

export interface PrivateKeyJson {
    digest_function: string
    /** Hex-encoded bytes */
    payload: string
}
    


export type BytesInput =
    | { t: 'Array', c: Uint8Array }
    | { t: 'Hex', c: string }



export interface KeyPairJson {
    public_key: string
    private_key: PrivateKeyJson
}



export type DigestFunction =
    | 'ed25519-pub'
    | 'secp256k1-pub'
    | 'bls12_381-g1-pub'
    | 'bls12_381-g2-pub'



export type VerifyResult =
    | { t: 'ok' }
    | { t: 'err', error: string }



export type Algorithm = 
    | 'ed25519'
    | 'secp256k1'
    | 'bls_normal'
    | 'bls_small'


/**
* Hash of Iroha entities. Currently supports only blake2b-32.
*/
export class Hash {
  free(): void;
/**
* Construct zeroed hash
* @returns {Hash}
*/
  static zeroed(): Hash;
/**
* Hash the given bytes.
* @param {BytesInput} bytes
* @returns {Hash}
*/
  static hash(bytes: BytesInput): Hash;
/**
* @returns {Uint8Array}
*/
  bytes(): Uint8Array;
/**
* @returns {string}
*/
  bytes_hex(): string;
}
/**
* Configuration of key generation
*/
export class KeyGenConfiguration {
  free(): void;
/**
* @returns {KeyGenConfiguration}
*/
  static _default(): KeyGenConfiguration;
/**
* @param {Algorithm} algorithm
* @returns {KeyGenConfiguration}
*/
  static create_with_algorithm(algorithm: Algorithm): KeyGenConfiguration;
/**
* @param {Algorithm} algorithm
* @returns {KeyGenConfiguration}
*/
  with_algorithm(algorithm: Algorithm): KeyGenConfiguration;
/**
* @param {PrivateKey} key
* @returns {KeyGenConfiguration}
*/
  use_private_key(key: PrivateKey): KeyGenConfiguration;
/**
* @param {BytesInput} seed
* @returns {KeyGenConfiguration}
*/
  use_seed(seed: BytesInput): KeyGenConfiguration;
}
/**
* Pair of Public and Private keys.
*/
export class KeyPair {
  free(): void;
/**
* @param {KeyPairJson} value
* @returns {KeyPair}
*/
  static from_json(value: KeyPairJson): KeyPair;
/**
* @param {PrivateKey} priv_key
* @returns {KeyPair}
*/
  static from_private_key(priv_key: PrivateKey): KeyPair;
/**
* @param {KeyGenConfiguration} key_gen_configuration
* @returns {KeyPair}
*/
  static generate_with_configuration(key_gen_configuration: KeyGenConfiguration): KeyPair;
/**
* Generate with default configuration
* @returns {KeyPair}
*/
  static generate(): KeyPair;
/**
* @returns {PrivateKey}
*/
  private_key(): PrivateKey;
/**
* @returns {PublicKey}
*/
  public_key(): PublicKey;
/**
* @returns {KeyPairJson}
*/
  to_json(): KeyPairJson;
/**
*/
  readonly digest_function: Algorithm;
}
/**
* Multihash
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
* @param {string} hex
* @returns {Multihash}
*/
  static from_bytes_hex(hex: string): Multihash;
/**
* @returns {string}
*/
  to_bytes_hex(): string;
/**
* @returns {Uint8Array}
*/
  clone_payload(): Uint8Array;
/**
*/
  readonly digest_function: DigestFunction;
}
/**
* Private Key used in signatures.
*/
export class PrivateKey {
  free(): void;
/**
* @param {PrivateKeyJson} value
* @returns {PrivateKey}
*/
  static from_json(value: PrivateKeyJson): PrivateKey;
/**
* @returns {Uint8Array}
*/
  payload(): Uint8Array;
/**
* @returns {string}
*/
  payload_hex(): string;
/**
* @returns {PrivateKeyJson}
*/
  to_json(): PrivateKeyJson;
/**
*/
  readonly digest_function: Algorithm;
}
/**
* Public Key used in signatures.
*/
export class PublicKey {
  free(): void;
/**
* @param {string} multihash
* @returns {PublicKey}
*/
  static from_multihash_hex(multihash: string): PublicKey;
/**
* @param {Multihash} multihash
* @returns {PublicKey}
*/
  static from_multihash(multihash: Multihash): PublicKey;
/**
* @param {PrivateKey} key
* @returns {PublicKey}
*/
  static from_private_key(key: PrivateKey): PublicKey;
/**
* @returns {string}
*/
  to_format(): string;
/**
* @returns {Multihash}
*/
  to_multihash(): Multihash;
/**
* @returns {string}
*/
  to_multihash_hex(): string;
/**
* @returns {Uint8Array}
*/
  payload(): Uint8Array;
/**
* @returns {string}
*/
  payload_hex(): string;
/**
*/
  readonly digest_function: Algorithm;
}
/**
* Represents signature of the data (`Block` or `Transaction` for example).
*/
export class Signature {
  free(): void;
/**
* @param {KeyPair} key_pair
* @param {BytesInput} message
* @returns {Signature}
*/
  static sign_with_key_pair(key_pair: KeyPair, message: BytesInput): Signature;
/**
* @param {PrivateKey} private_key
* @param {BytesInput} message
* @returns {Signature}
*/
  static sign_with_private_key(private_key: PrivateKey, message: BytesInput): Signature;
/**
* @param {PublicKey} pub_key
* @param {BytesInput} payload
* @returns {Signature}
*/
  static create_from_public_key(pub_key: PublicKey, payload: BytesInput): Signature;
/**
* @param {BytesInput} payload
* @returns {VerifyResult}
*/
  verify(payload: BytesInput): VerifyResult;
/**
* @returns {PublicKey}
*/
  public_key(): PublicKey;
/**
* @returns {Uint8Array}
*/
  payload(): Uint8Array;
/**
* @returns {string}
*/
  payload_hex(): string;
}
