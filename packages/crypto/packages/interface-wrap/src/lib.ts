import { wasmPkg } from '@iroha2/crypto-interface-wrap/~wasm-pack-proxy'
import { FreeGuard, Free, FreeScope, GetInnerTrackObject } from '@iroha2/crypto-util'

export type Algorithm = wasmPkg.Algorithm

export const Algorithm = {
  default: (): Algorithm => wasmPkg.algorithm_default(),
}

export type DigestFunction = wasmPkg.DigestFunction

export const DigestFunction = {
  default: (): DigestFunction => wasmPkg.digest_function_default(),
  fromByteCode: (code: number): DigestFunction => wasmPkg.digest_function_from_byte_code(code),
  toByteCode: (digest: DigestFunction): number => wasmPkg.digest_function_to_byte_code(digest),
}

class SingleFreeWrap<T extends Free> implements Free, GetInnerTrackObject {
  /**
   * We don't use `#guard` or `private guard`, because it breaks assignability checks with
   * non-direct implementations
   * @private
   */
  public __guard: FreeGuard<T>

  protected constructor(object: T) {
    this.__guard = new FreeGuard(object)
  }

  /**
   * Get access to the underlying free-able object. For internal use.
   * @internal
   */
  public get underlying(): T {
    return this.__guard.object
  }

  public underlyingMove(fn: (object: T) => T): void {
    const moved = fn(this.underlying)
    this.__guard.forget()
    this.__guard = new FreeGuard(moved)
  }

  public free() {
    this.__guard.free()
  }

  public [FreeScope.getInnerTrackObject]() {
    return this.__guard
  }
}

type BytesInputTuple = [kind: 'array', array: Uint8Array] | [kind: 'hex', hex: string]

function bytesInputTupleToEnum(tuple: BytesInputTuple): wasmPkg.BytesInput {
  return tuple[0] === 'array' ? { t: 'Array', c: tuple[1] } : { t: 'Hex', c: tuple[1] }
}

export interface HasDigestFunction<T extends DigestFunction | Algorithm> {
  readonly digestFunction: T
}

export interface HasPayload {
  readonly payload: {
    (): Uint8Array
    (kind: 'hex'): string
  }
}

export interface SignMessage {
  sign: (...message: BytesInputTuple) => Signature
}

export class Hash extends SingleFreeWrap<wasmPkg.Hash> {
  public static zeroed(): Hash {
    return new Hash(wasmPkg.Hash.zeroed())
  }

  public static hash(...payload: BytesInputTuple): Hash {
    return new Hash(wasmPkg.Hash.hash(bytesInputTupleToEnum(payload)))
  }

  // TODO extract as HEX
  public bytes(): Uint8Array
  public bytes(mode: 'hex'): string
  public bytes(mode?: 'hex'): Uint8Array | string {
    return mode === 'hex' ? this.underlying.bytes_hex() : this.underlying.bytes()
  }
}

export class Multihash extends SingleFreeWrap<wasmPkg.Multihash> implements HasDigestFunction<DigestFunction> {
  public static fromBytes(...bytes: BytesInputTuple): Multihash {
    const multihash =
      bytes[0] === 'array' ? wasmPkg.Multihash.from_bytes(bytes[1]) : wasmPkg.Multihash.from_bytes_hex(bytes[1])
    return new Multihash(multihash)
  }

  public static fromPublicKey(key: PublicKey): Multihash {
    const multihash = key.underlying.to_multihash()
    return new Multihash(multihash)
  }

  public bytes(): Uint8Array
  public bytes(mode: 'hex'): string
  public bytes(mode?: 'hex'): Uint8Array | string {
    if (mode === 'hex') return this.underlying.to_bytes_hex()
    return this.underlying.to_bytes()
  }

  public get digestFunction(): DigestFunction {
    return this.underlying.digest_function
  }
}

export class PrivateKey
  extends SingleFreeWrap<wasmPkg.PrivateKey>
  implements HasDigestFunction<Algorithm>, HasPayload, SignMessage
{
  public static fromJSON(value: wasmPkg.PrivateKeyJson): PrivateKey {
    const key = wasmPkg.PrivateKey.from_json(value)
    return new PrivateKey(key)
  }

  public static fromKeyPair(pair: KeyPair): PrivateKey {
    return new PrivateKey(pair.underlying.private_key())
  }

  public get digestFunction(): Algorithm {
    return this.underlying.digest_function
  }

  public payload(): Uint8Array
  public payload(kind: 'hex'): string
  public payload(kind?: 'hex'): string | Uint8Array {
    return kind === 'hex' ? this.underlying.payload_hex() : this.underlying.payload()
  }

  public sign(...message: BytesInputTuple): Signature {
    return Signature.signWithPrivateKey(this, ...message)
  }

  public toKeyPair(): KeyPair {
    return KeyPair.fromPrivateKey(this)
  }

  public toJSON(): wasmPkg.PrivateKeyJson {
    return this.underlying.to_json()
  }
}

export class PublicKey extends SingleFreeWrap<wasmPkg.PublicKey> implements HasDigestFunction<Algorithm>, HasPayload {
  public static fromMultihash(
    ...multihash: [kind: 'hex', hex: string] | [kind: 'instance', instance: Multihash]
  ): PublicKey {
    const key =
      multihash[0] === 'hex'
        ? wasmPkg.PublicKey.from_multihash_hex(multihash[1])
        : wasmPkg.PublicKey.from_multihash(multihash[1].underlying)
    return new PublicKey(key)
  }

  /**
   * Equal to {@link fromMultihash} in `'hex'` mode.
   */
  public static fromJSON(multihashHex: string): PublicKey {
    return PublicKey.fromMultihash('hex', multihashHex)
  }

  public static fromPrivateKey(privateKey: PrivateKey): PublicKey {
    const key = wasmPkg.PublicKey.from_private_key(privateKey.underlying)
    return new PublicKey(key)
  }

  public static fromKeyPair(pair: KeyPair): PublicKey {
    return new PublicKey(pair.underlying.public_key())
  }

  public toMultihash(): Multihash
  public toMultihash(kind: 'hex'): string
  public toMultihash(kind?: 'hex'): string | Multihash {
    return kind === 'hex' ? this.underlying.to_multihash_hex() : Multihash.fromPublicKey(this)
  }

  public get digestFunction(): Algorithm {
    return this.underlying.digest_function
  }

  public payload(): Uint8Array
  public payload(kind: 'hex'): string
  public payload(kind?: 'hex'): string | Uint8Array {
    return kind === 'hex' ? this.underlying.payload_hex() : this.underlying.payload()
  }

  /**
   * Equal to {@link toMultihash} in `'hex'` mode
   */
  public toJSON(): string {
    return this.toMultihash('hex')
  }
}

export class KeyGenConfiguration extends SingleFreeWrap<wasmPkg.KeyGenConfiguration> {
  public static default(): KeyGenConfiguration {
    return new KeyGenConfiguration(wasmPkg.KeyGenConfiguration._default())
  }

  public static withAlgorithm(algorithm: Algorithm): KeyGenConfiguration {
    return new KeyGenConfiguration(wasmPkg.KeyGenConfiguration.create_with_algorithm(algorithm))
  }

  public withAlgorithm(algorithm: Algorithm): KeyGenConfiguration {
    this.underlyingMove((cfg) => cfg.with_algorithm(algorithm))
    return this
  }

  public usePrivateKey(privateKey: PrivateKey): KeyGenConfiguration {
    this.underlyingMove((cfg) => cfg.use_private_key(privateKey.underlying))
    return this
  }

  public useSeed(...seed: BytesInputTuple): KeyGenConfiguration {
    this.underlyingMove((cfg) => cfg.use_seed(bytesInputTupleToEnum(seed)))
    return this
  }

  public generate(): KeyPair {
    return KeyPair.generate(this)
  }
}

export class KeyPair extends SingleFreeWrap<wasmPkg.KeyPair> implements HasDigestFunction<Algorithm>, SignMessage {
  public static fromJSON(value: wasmPkg.KeyPairJson): KeyPair {
    const pair = wasmPkg.KeyPair.from_json(value)
    return new KeyPair(pair)
  }

  public static generate(configuration?: KeyGenConfiguration): KeyPair {
    const pair = configuration
      ? wasmPkg.KeyPair.generate_with_configuration(configuration.underlying)
      : wasmPkg.KeyPair.generate()
    return new KeyPair(pair)
  }

  public static fromPrivateKey(key: PrivateKey): KeyPair {
    const pair = wasmPkg.KeyPair.from_private_key(key.underlying)
    return new KeyPair(pair)
  }

  public get digestFunction(): Algorithm {
    return this.underlying.digest_function
  }

  public privateKey(): PrivateKey {
    return PrivateKey.fromKeyPair(this)
  }

  public publicKey(): PublicKey {
    return PublicKey.fromKeyPair(this)
  }

  public sign(...message: BytesInputTuple): Signature {
    return Signature.signWithKeyPair(this, ...message)
  }

  public toJSON(): wasmPkg.KeyPairJson {
    return this.underlying.to_json()
  }
}

export class Signature extends SingleFreeWrap<wasmPkg.Signature> implements HasPayload {
  public static signWithKeyPair(keyPair: KeyPair, ...message: BytesInputTuple): Signature {
    return new Signature(wasmPkg.Signature.sign_with_key_pair(keyPair.underlying, bytesInputTupleToEnum(message)))
  }

  public static signWithPrivateKey(privateKey: PrivateKey, ...message: BytesInputTuple): Signature {
    return new Signature(wasmPkg.Signature.sign_with_private_key(privateKey.underlying, bytesInputTupleToEnum(message)))
  }

  /**
   * Create a signature from its payload and public key. This function **does not sign the payload**.
   */
  public static fromPublicKey(publicKey: PublicKey, ...payload: BytesInputTuple): Signature {
    return new Signature(wasmPkg.Signature.create_from_public_key(publicKey.underlying, bytesInputTupleToEnum(payload)))
  }

  public verify(...message: BytesInputTuple): wasmPkg.VerifyResult {
    return this.underlying.verify(bytesInputTupleToEnum(message))
  }

  public publicKey(): PublicKey {
    return new PublicKey(this.underlying.public_key())
  }

  public payload(): Uint8Array
  public payload(mode: 'hex'): string
  public payload(mode?: 'hex'): string | Uint8Array {
    return mode === 'hex' ? this.underlying.payload_hex() : this.underlying.payload()
  }
}
