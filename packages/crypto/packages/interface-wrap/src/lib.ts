import * as wasmPkg from '~wasm-pkg'

export type Algorithm = wasmPkg.Algorithm

export const Algorithm = {
  default: (): Algorithm => (wasmPkg.algorithm_default())
}

export type DigestFunction = wasmPkg.DigestFunction

export const DigestFunction = {
  default: (): DigestFunction => (wasmPkg.digest_function_default()),
  fromByteCode: (code: number): DigestFunction => (wasmPkg.digest_function_from_byte_code(code)),
  toByteCode: (digest: DigestFunction): number => wasmPkg.digest_function_to_byte_code(digest)
}

/**
 * **TODO:** Store all non-freed structures in some global constant for debugging memory leaks?
 * Or even track & free everything automatically within a scope like `track(() => { ... })`?
 */
class FreeGuard<T extends Freeable> implements Freeable {
  #object: null | [T]

  public constructor(value: T) {
    this.#object = [value]
  }

  public get object(): T {
    if (!this.#object) {
      throw new Error('Already freed')
    }
    return this.#object[0]
  }

  public free(): void {
    this.object.free()
    this.#object = null
  }
}

class SingleFreeWrap<T extends Freeable> implements Freeable {
  #guard: FreeGuard<T>

  protected constructor(object: T) {
    this.#guard = new FreeGuard(object)
  }

  /**
   * @internal
   */
  public get underlying(): T {
    return this.#guard.object
  }

  public free() {
    this.#guard.free()
  }

}

export interface Freeable {
  free: () => void
}


type BytesInputTuple =
  | [kind: "array", array: Uint8Array]
  | [kind: "hex", hex: string]

function bytesInputTupleToEnum(tuple: BytesInputTuple): wasmPkg.BytesInput {
  return tuple[0] === 'array' ? {t: "Array", c: tuple[1]} : {t: 'Hex', c: tuple[1]}
}

export interface HasDigestFunction<T extends DigestFunction | Algorithm> {
  readonly digestFunction: T
}

export interface HasPayload {
  readonly payload: {
    (): Uint8Array
    (kind: "hex"): string
  }
}


declare function freeableScope<R extends (() => void) | (() => { keep?: Record<string, Freeable>, etc?: any })>(fn: R): R extends (() => infer R) ? R : never;

const test1 = freeableScope(() => {
})
const test2 = freeableScope(() => {
  return {etc: null}
})

const test3 = freeableScope(() => {
  return {keep: {a: 32}}
})

export class Hash extends SingleFreeWrap<wasmPkg.Hash> {
  public static zeroed(): Hash {
    return new Hash(wasmPkg.Hash.zeroed())
  }

  public static hash(payload: Uint8Array): Hash {
    return new Hash(wasmPkg.Hash.hash(payload))
  }


  public bytes(): Uint8Array {
    return this.underlying.clone_bytes()
  }

}

export class Multihash extends SingleFreeWrap<wasmPkg.Multihash> implements HasDigestFunction<DigestFunction> {

  public static fromBytes(...bytes: BytesInputTuple): Multihash {
    const multihash = bytes[0] === 'array' ? wasmPkg.Multihash.from_bytes(bytes[1]) : wasmPkg.Multihash.from_bytes_hex(bytes[1])
    return new Multihash(multihash)
  }

  public static fromPublicKey(key: PublicKey): Multihash {
    const multihash = key.underlying.to_multihash();
    return new Multihash(multihash)
  }


  public bytes(): Uint8Array;
  public bytes(mode: 'hex'): string;
  public bytes(mode?: 'hex'): Uint8Array | string {
    if (mode === 'hex') return this.underlying.to_bytes_hex()
    return this.underlying.to_bytes()
  }

  public get digestFunction(): DigestFunction {
    return this.underlying.digest_function
  }

}

export class PrivateKey extends SingleFreeWrap<wasmPkg.PrivateKey> implements HasDigestFunction<Algorithm>, HasPayload {
  public static fromJson(value: wasmPkg.PrivateKeyJson): PrivateKey {

    const key = wasmPkg.PrivateKey.from_json(value)
    return new PrivateKey(key)
  };

  public static fromKeyPair(pair: KeyPair): PrivateKey {
    return new PrivateKey(pair.underlying.private_key_wasm())
  }


  public get digestFunction(): Algorithm {
    return this.underlying.digest_function()
  };

  public payload(): Uint8Array;
  public payload(kind: "hex"): string;
  public payload(kind?: 'hex'): string | Uint8Array {
    return kind === 'hex' ? this.underlying.payload_hex() : this.underlying.payload()
  }
}

export class PublicKey extends SingleFreeWrap<wasmPkg.PublicKey> implements HasDigestFunction<Algorithm>, HasPayload {
  public static fromMultihash(...multihash: [kind: "hex", hex: string] | [kind: "instance", instance: Multihash]): PublicKey {
    const key = (multihash[0] === 'hex') ? wasmPkg.PublicKey.from_multihash_hex(multihash[1]) : wasmPkg.PublicKey.from_multihash(multihash[1].underlying)
    return new PublicKey(key)
  };

  public static fromPrivateKey(privateKey: PrivateKey): PublicKey {
    const key = wasmPkg.PublicKey.from_private_key(privateKey.underlying)
    return new PublicKey(key)
  };

  public static fromKeyPair(pair: KeyPair): PublicKey {
    return new PublicKey(pair.underlying.public_key_wasm())
  }


  public static fromBytes(...bytes: BytesInputTuple): PublicKey {
    const key = wasmPkg.PublicKey.from_bytes(bytesInputTupleToEnum(bytes))
    return new PublicKey(key)
  };


  public toMultihash(): Multihash
  public toMultihash(kind: "hex"): string;
  public toMultihash(kind?: 'hex'): string | Multihash {
    return kind === 'hex' ? this.underlying.to_multihash_hex() : Multihash.fromPublicKey(this)
  }

  public get digestFunction(): Algorithm {
    return this.underlying.digest_function
  };

  public payload(): Uint8Array;
  public payload(kind: 'hex'): string;
  public payload(kind?: 'hex'): string | Uint8Array {
    return kind === 'hex' ? this.underlying.payload_hex() : this.underlying.payload()
  }

}

class KeyGenConfiguration extends SingleFreeWrap<wasmPkg.KeyGenConfiguration> {
  public static default(): KeyGenConfiguration {
    return new KeyGenConfiguration(wasmPkg.KeyGenConfiguration.default_wasm())
  };

  public static withAlgorithm(algorithm: Algorithm): KeyGenConfiguration {
    return new KeyGenConfiguration(wasmPkg.KeyGenConfiguration.create_with_algorithm(algorithm))
  };


  public withAlgorithm(algorithm: Algorithm): KeyGenConfiguration {
    this.underlying.with_algorithm(algorithm)
    return this
  };

  public usePrivateKey(privateKey: PrivateKey): KeyGenConfiguration {
    this.underlying.use_private_key(privateKey.underlying)
    return this
  };

  public useSeed(...seed: BytesInputTuple): KeyGenConfiguration {
    this.underlying.use_seed(bytesInputTupleToEnum(seed))
    return this
  };

  public generate(): KeyPair {
    return KeyPair.generate(this)
  }

}

export class KeyPair extends SingleFreeWrap<wasmPkg.KeyPair> implements HasDigestFunction<Algorithm> {

  public static fromJson(value: wasmPkg.KeyPairJson): KeyPair {
    const pair = wasmPkg.KeyPair.from_json(value)
    return new KeyPair(pair)
  };

  public static generate(configuration?: KeyGenConfiguration): KeyPair {
    const pair = configuration ? wasmPkg.KeyPair.generate_with_configuration_wasm(configuration.underlying) : wasmPkg.KeyPair.generate_wasm()
    return new KeyPair(pair)
  };


  public get digestFunction(): Algorithm {
    return this.underlying.digest_function_wasm()
  };

  public privateKey(): PrivateKey {
    return PrivateKey.fromKeyPair(this)
  };

  public publicKey(): PublicKey {
    return PublicKey.fromKeyPair(this)
  };

  public sign(payload: BytesInputTuple): Signature {
    return Signature.fromKeyPair(this, payload)
  };

}

export class Signature extends SingleFreeWrap<wasmPkg.Signature> {
  public static fromKeyPair(keyPair: KeyPair, payload: BytesInputTuple): Signature {
    return new Signature(wasmPkg.Signature.create_from_key_pair(keyPair.underlying, bytesInputTupleToEnum(payload)))
  };

  public static fromPublicKey(publicKey: PublicKey, payload: BytesInputTuple): Signature {
    return new Signature(wasmPkg.Signature.create_from_public_key(publicKey.underlying, bytesInputTupleToEnum(payload)))
  };


  public verify(payload: BytesInputTuple): wasmPkg.VerifyResult {
    return this.underlying.verify_wasm(bytesInputTupleToEnum(payload))
  };

}
