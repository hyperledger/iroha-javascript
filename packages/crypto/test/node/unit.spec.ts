import { describe, expect, test } from 'vitest'
import { crypto } from '@iroha2/crypto-target-node'
import { cryptoTypes, freeScope } from '@iroha2/crypto-core'

test('Generates KeyPair from seed as expected', () => {
  const SEED_BYTES = [49, 50, 51, 52]

  const keyPair = crypto.KeyGenConfiguration.default().useSeed('array', Uint8Array.from(SEED_BYTES)).generate()

  expect(keyPair.toJSON()).toMatchInlineSnapshot(`
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
  const json = {
    private_key: {
      digest_function: 'ed25519',
      payload:
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
    },
    public_key: 'ed0120f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
  }

  const keyPair = crypto.KeyPair.fromJSON(json)

  expect(keyPair.toJSON()).toEqual(json)
})

test('When keyGenConfiguration is created within a scope, its used outside of it throws an error', () => {
  let keyGenConfig: cryptoTypes.KeyGenConfiguration

  freeScope(() => {
    keyGenConfig = crypto.KeyGenConfiguration.default()
  })

  expect(() => keyGenConfig!.generate()).toThrowErrorMatchingInlineSnapshot('"The underlying object is missing"')
})

test('When key gen conf is created within a scope and forgotten in it, it can be used outside of the scope', () => {
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
    const key = crypto.PublicKey.fromMultihash('hex', MULTIHASH)

    expect(key.digestFunction).toMatchInlineSnapshot('"ed25519"')
    expect(key.payload('hex')).toMatchInlineSnapshot(
      '"797507786f9c6a4de91b5462b8a6f7bf9ab21c22b853e9c992c2ef68da5307f9"',
    )
  })

  test('a public key could be parsed and transformed back through JSON methods', () => {
    const key = crypto.PublicKey.fromJSON(MULTIHASH)

    expect(key.toJSON()).toEqual(MULTIHASH)
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

  function privateKeyFactory() {
    return freeScope((scope) => {
      const pair = pairFactory()
      scope.track(pair)
      const key = pair.privateKey()
      scope.forget(key)
      return key
    })
  }

  test('result is ok', () => {
    const MESSAGE = 'deadbeef'
    const pair = pairFactory()

    const signature = pair.sign('hex', MESSAGE)

    expect(signature.verify('hex', MESSAGE)).toMatchInlineSnapshot(`
      {
        "t": "ok",
      }
    `)
  })

  test('result is err', () => {
    const pair = pairFactory()

    const signature = pair.sign('hex', 'deadbeef')

    expect(signature.verify('hex', 'feedbabe')).toMatchInlineSnapshot(`
      {
        "error": "Signing failed. Verification equation was not satisfied",
        "t": "err",
      }
    `)
  })

  test('exception is thrown if input is invalid', () => {
    const signature = pairFactory().sign('hex', 'deadbeef')

    expect(() => signature.verify('hex', 'not really a hex')).toThrowErrorMatchingInlineSnapshot(
      '"Invalid character \'n\' at position 0"',
    )
  })
})
