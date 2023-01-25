/* eslint-disable max-nested-callbacks */
import { afterAll, describe, expect, test } from 'vitest'
import { crypto } from '@iroha2/crypto-target-node'
import { FREE_HEAP, cryptoTypes, freeScope } from '@iroha2/crypto-core'

afterAll(() => {
  // TODO check that FREE_HEAP is empty to be more sure there are no internal leaks
  expect(FREE_HEAP.size).toEqual(0)
})

test('Generates KeyPair from seed as expected', () => {
  const SEED_BYTES = [49, 50, 51, 52]

  const json = freeScope(() =>
    crypto.KeyGenConfiguration.default().useSeed('array', Uint8Array.from(SEED_BYTES)).generate().toJSON(),
  )

  expect(json).toMatchInlineSnapshot(`
    {
      "private_key": {
        "digest_function": "ed25519",
        "payload": "01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7",
      },
      "public_key": "ed0120f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7",
    }
  `)
})

test('Constructs KeyPair from JSON', () => {
  const INPUT = {
    private_key: {
      digest_function: 'ed25519',
      payload:
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
    },
    public_key: 'ed0120f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
  }

  const json = freeScope(() => crypto.KeyPair.fromJSON(INPUT).toJSON())

  expect(json).toEqual(INPUT)
})

test('When keyGenConfiguration is created within a scope, its used outside of it throws an error', () => {
  let keyGenConfig: cryptoTypes.KeyGenConfiguration

  freeScope(() => {
    keyGenConfig = crypto.KeyGenConfiguration.default()
  })

  expect(() => keyGenConfig!.generate()).toThrowErrorMatchingInlineSnapshot('"The underlying object is missing"')
})

test('When key gen conf is created within a scope and forgotten in it, it can be used outside of the scope', () => {
  freeScope(() => {
    let keyGenConfig: cryptoTypes.KeyGenConfiguration

    freeScope((scope) => {
      keyGenConfig = crypto.KeyGenConfiguration.default().useSeed('hex', '001122')
      scope.forget(keyGenConfig)
    })

    expect(keyGenConfig!.generate().toJSON()).toMatchInlineSnapshot(`
    {
      "private_key": {
        "digest_function": "ed25519",
        "payload": "5720a4b3bffa5c9bbd83d09c88cd1db08ca3f0c302ec4c8c37a26bd734c37616797507786f9c6a4de91b5462b8a6f7bf9ab21c22b853e9c992c2ef68da5307f9",
      },
      "public_key": "ed0120797507786f9c6a4de91b5462b8a6f7bf9ab21c22b853e9c992c2ef68da5307f9",
    }
  `)
  })
})

test('Generating multiple key pairs from a single configuration does not error', () => {
  freeScope(() => {
    const config = crypto.KeyGenConfiguration.default()

    for (let i = 0; i < 10; i++) {
      config.useSeed('array', new Uint8Array([i])).generate()
    }
  })
})

describe('Given a multihash', () => {
  const MULTIHASH = 'ed0120797507786f9c6a4de91b5462b8a6f7bf9ab21c22b853e9c992c2ef68da5307f9'

  test('a public key could be constructed', () => {
    freeScope(() => {
      const key = crypto.PublicKey.fromMultihash('hex', MULTIHASH)

      expect(key.digestFunction).toMatchInlineSnapshot('"ed25519"')
      expect(key.payload('hex')).toMatchInlineSnapshot(
        '"797507786f9c6a4de91b5462b8a6f7bf9ab21c22b853e9c992c2ef68da5307f9"',
      )
    })
  })

  test('a public key could be parsed and transformed back through JSON methods', () => {
    expect(freeScope(() => crypto.PublicKey.fromJSON(MULTIHASH).toJSON())).toEqual(MULTIHASH)
  })
})

describe('Signature verification', () => {
  function pairFactory() {
    return freeScope((scope) => {
      const pair = crypto.KeyGenConfiguration.default().useSeed('hex', 'aa1108').generate()
      scope.forget(pair)
      return pair
    })
  }

  test('result is ok', () => {
    const MESSAGE = 'deadbeef'

    const result = freeScope(() => pairFactory().sign('hex', MESSAGE).verify('hex', MESSAGE))

    expect(result).toMatchInlineSnapshot(`
      {
        "t": "ok",
      }
    `)
  })

  test('result is err', () => {
    const result = freeScope(() => pairFactory().sign('hex', 'deadbeef').verify('hex', 'feedbabe'))

    expect(result).toMatchInlineSnapshot(`
      {
        "error": "Signing failed. Verification equation was not satisfied",
        "t": "err",
      }
    `)
  })

  test('exception is thrown if input is invalid', () => {
    freeScope(() => {
      const signature = pairFactory().sign('hex', 'deadbeef')

      expect(() => signature.verify('hex', 'not really a hex')).toThrowErrorMatchingInlineSnapshot(
        '"Invalid character \'n\' at position 0"',
      )
    })
  })
})

describe('PublicKey.toMultihash()', () => {
  const MULTIHASH = 'ed0120797507786f9c6a4de91b5462b8a6f7bf9ab21c22b853e9c992c2ef68da5307f9'

  test('When called without args, returns multihash instance', () => {
    freeScope(() => {
      const key = crypto.PublicKey.fromMultihash('hex', MULTIHASH)

      expect(key.toMultihash()).toBeInstanceOf(crypto.Multihash)
    })
  })

  test('When called in hex mode, returns hex', () => {
    freeScope(() => {
      const key = crypto.PublicKey.fromMultihash('hex', MULTIHASH)

      expect(key.toMultihash('hex')).toBe(MULTIHASH)
    })
  })
})

test('Signature serializes to data model repr as expected', () => {
  freeScope(() => {
    const cryptoSignature = crypto.KeyGenConfiguration.default().generate().sign('hex', '112233')
    const dataModelSignature = cryptoSignature.toDataModel()

    expect(cryptoSignature.payload()).toEqual(dataModelSignature.payload)
    expect(cryptoSignature.publicKey().digestFunction).toEqual(dataModelSignature.public_key.digest_function)
    expect(cryptoSignature.publicKey().payload()).toEqual(dataModelSignature.public_key.payload)
  })
})
