/* eslint-disable max-nested-callbacks */
import { afterAll, describe, expect, test } from 'vitest'
import { crypto } from '@iroha2/crypto-target-node'
import { Bytes, FREE_HEAP, freeScope } from '@iroha2/crypto-core'

const { hex: bytesHex } = Bytes

afterAll(() => {
  expect(FREE_HEAP.size).toEqual(0)
})

describe('KeyPair generation', () => {
  test('Generates KeyPair from seed as expected', () => {
    const SEED_BYTES = [49, 50, 51, 52]

    const json = freeScope(() => crypto.KeyPair.generateFromSeed(Bytes.array(Uint8Array.from(SEED_BYTES))).toJSON())

    expect(json).toMatchInlineSnapshot(`
    {
      "private_key": {
        "algorithm": "ed25519",
        "payload": "01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7",
      },
      "public_key": "ed0120F149BB4B59FEB0ACE3074F10C65E179880EA2C4FE4E0D6022B1E82C33C3278C7",
    }
  `)
  })

  test('Generates KeyPair from a private key as expected', () => {
    const SAMPLE = {
      algorithm: 'ed25519',
      payload:
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
    } satisfies crypto.PrivateKeyJson

    expect(freeScope(() => crypto.KeyPair.generateFromPrivateKey(crypto.PrivateKey.fromJSON(SAMPLE)).toJSON()))
      .toMatchInlineSnapshot(`
      {
        "private_key": {
          "algorithm": "ed25519",
          "payload": "01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7",
        },
        "public_key": "ed0120F149BB4B59FEB0ACE3074F10C65E179880EA2C4FE4E0D6022B1E82C33C3278C7",
      }
    `)
  })
})

describe('Given a multihash', () => {
  const MULTIHASH = 'ed0120797507786F9C6A4DE91B5462B8A6F7BF9AB21C22B853E9C992C2EF68DA5307F9'

  test('a public key could be constructed', () => {
    freeScope(() => {
      const key = crypto.PublicKey.fromMultihash(MULTIHASH)

      expect(key.algorithm).toMatchInlineSnapshot('"ed25519"')
      expect(key.payload('hex')).toMatchInlineSnapshot(
        '"797507786f9c6a4de91b5462b8a6f7bf9ab21c22b853e9c992c2ef68da5307f9"',
      )
      expect(key.toMultihash()).toBe(MULTIHASH)
    })
  })

  test('a public key could be parsed and transformed back through JSON methods', () => {
    expect(freeScope(() => crypto.PublicKey.fromJSON(MULTIHASH).toJSON())).toEqual(MULTIHASH)
  })
})

describe('Signature verification', () => {
  function pairFactory() {
    return freeScope((scope) => {
      const pair = crypto.KeyPair.generateFromSeed(Bytes.hex('aa1108'))
      scope.forget(pair)
      return pair
    })
  }

  test('result is ok', () => {
    const MESSAGE = 'deadbeef'

    const result = freeScope(() => pairFactory().sign(bytesHex(MESSAGE)).verify(bytesHex(MESSAGE)))

    expect(result).toMatchInlineSnapshot(`
      {
        "t": "ok",
      }
    `)
  })

  test('result is err', () => {
    const result = freeScope(() => pairFactory().sign(bytesHex('deadbeef')).verify(bytesHex('feedbabe')))

    expect(result).toMatchInlineSnapshot(`
      {
        "error": "Signature verification failed",
        "t": "err",
      }
    `)
  })

  test('exception is thrown if input is invalid', () => {
    freeScope(() => {
      const signature = pairFactory().sign(bytesHex('deadbeef'))

      expect(() => signature.verify(bytesHex('not really a hex'))).toThrowErrorMatchingInlineSnapshot(
        '"Invalid character \'n\' at position 0"',
      )
    })
  })
})

describe('JSON representation', () => {
  test('for PublicKey is as expected', () => {
    const SAMPLE = 'ed0120F149BB4B59FEB0ACE3074F10C65E179880EA2C4FE4E0D6022B1E82C33C3278C7'

    freeScope(() => {
      expect(crypto.PublicKey.fromJSON(SAMPLE).toJSON()).toBe(SAMPLE)
    })
  })

  test('for PrivateKey is as expected', () => {
    const SAMPLE = {
      algorithm: 'ed25519',
      payload:
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
    }

    freeScope(() => {
      expect(crypto.PrivateKey.fromJSON(SAMPLE).toJSON()).toEqual(SAMPLE)
    })
  })

  test('for KeyPair is as expected', () => {
    const SAMPLE = {
      private_key: {
        algorithm: 'ed25519',
        payload:
          '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
      },
      public_key: 'ed0120F149BB4B59FEB0ACE3074F10C65E179880EA2C4FE4E0D6022B1E82C33C3278C7',
    }

    freeScope(() => {
      const kp = crypto.KeyPair.fromJSON(SAMPLE)

      expect(kp.publicKey().toMultihash()).toBe(
        'ed0120F149BB4B59FEB0ACE3074F10C65E179880EA2C4FE4E0D6022B1E82C33C3278C7',
      )
      expect(kp.privateKey().algorithm).toBe('ed25519')
      expect(kp.privateKey().payload('hex')).toBe(
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
      )

      expect(kp.toJSON()).toEqual(SAMPLE)
    })
  })

  test('for Signature is as expected', () => {
    const SAMPLE = {
      public_key: 'ed0120797507786F9C6A4DE91B5462B8A6F7BF9AB21C22B853E9C992C2EF68DA5307F9',
      payload:
        'd0fbac97dcc1c859c110dcf3c55ecff6c28dd49b6e5560e2175a7f308a2214d3d4666c37f0ebfbeb24341a15e606d71780f992f151652adba39fe87e831a2000',
    }

    freeScope(() => {
      expect(crypto.Signature.fromJSON(SAMPLE).toJSON()).toEqual(SAMPLE)
    })
  })
})

describe('Data Model representation', () => {
  test('Signature serializes as expected', () => {
    freeScope(() => {
      const cryptoSignature = crypto.KeyPair.generateFromSeed(bytesHex('001122')).sign(bytesHex('112233'))
      const dataModelSignature = cryptoSignature.toDataModel()

      expect(cryptoSignature.payload()).toEqual(dataModelSignature.payload)
      expect(cryptoSignature.publicKey().algorithm).toBe('ed25519')
      expect(dataModelSignature.public_key.digest_function.enum.tag).toBe('Ed25519')
      expect(cryptoSignature.publicKey().payload()).toEqual(dataModelSignature.public_key.payload)
    })
  })
})

describe('Raw conversion', () => {
  test('Construct PublicKey', () => {
    const multihash = freeScope(() =>
      crypto.PublicKey.fromRaw(
        'ed25519',
        bytesHex('A88D1B0D23BC1ADC564DE57CEDBF8FD7D045D0D698EF27E5D9C1807C1041E016'),
      ).toMultihash(),
    )

    expect(multihash).toMatchInlineSnapshot('"ed0120A88D1B0D23BC1ADC564DE57CEDBF8FD7D045D0D698EF27E5D9C1807C1041E016"')
  })

  test('Fail to construct PublicKey', () => {
    expect(() =>
      crypto.PublicKey.fromRaw(
        'bls_normal',
        bytesHex('A88D1B0D23BC1ADC564DE57CEDBF8FD7D045D0D698EF27E5D9C1807C1041E016'),
      ),
    ).toThrowErrorMatchingInlineSnapshot('"the input buffer contained invalid data"')
  })

  test('Construct PrivateKey', () => {
    const json = freeScope(() =>
      crypto.PrivateKey.fromRaw(
        'ed25519',
        bytesHex(
          '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
        ),
      ).toJSON(),
    )

    expect(json).toMatchInlineSnapshot(`
      {
        "algorithm": "ed25519",
        "payload": "01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7",
      }
    `)
  })

  test('Fail to construct PrivateKey', () => {
    expect(() =>
      crypto.PrivateKey.fromRaw(
        'secp256k1',
        bytesHex(
          '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7',
        ),
      ),
    ).toThrowErrorMatchingInlineSnapshot('"crypto error"')
  })

  test('Construct KeyPair', () => {
    const json = freeScope(() => {
      const kp = crypto.KeyPair.generateFromSeed(bytesHex('deadbeef'))
      return crypto.KeyPair.fromRaw(kp.publicKey(), kp.privateKey()).toJSON()
    })

    expect(json).toMatchInlineSnapshot(`
      {
        "private_key": {
          "algorithm": "ed25519",
          "payload": "5dc9d5612f1f29ae846b12fc3cf59e831195ac4320dda2df7f2fa452a30fc5e1d05cdb30231bd9a257253e485432f44b139595981e04996dd795f38a1b4a011a",
        },
        "public_key": "ed0120D05CDB30231BD9A257253E485432F44B139595981E04996DD795F38A1B4A011A",
      }
    `)
  })

  test('Fail to construct KeyPair', () => {
    expect(() =>
      freeScope(() => {
        const kp1 = crypto.KeyPair.generateFromSeed(bytesHex('deadbeef'), { algorithm: 'bls_normal' })
        const kp2 = crypto.KeyPair.generateFromSeed(bytesHex('beefdead'))

        // should fail here:
        crypto.KeyPair.fromRaw(kp1.publicKey(), kp2.privateKey())
      }),
    ).toThrowErrorMatchingInlineSnapshot('"Key generation failed. Mismatch of key algorithms"')
  })

  test('Construct Signature', () => {
    const SAMPLE_JSON = {
      public_key: 'ed0120797507786F9C6A4DE91B5462B8A6F7BF9AB21C22B853E9C992C2EF68DA5307F9',
      payload:
        'd0fbac97dcc1c859c110dcf3c55ecff6c28dd49b6e5560e2175a7f308a2214d3d4666c37f0ebfbeb24341a15e606d71780f992f151652adba39fe87e831a2000',
    }

    const actual_json = freeScope(() =>
      crypto.Signature.fromRaw(
        crypto.PublicKey.fromMultihash(SAMPLE_JSON.public_key),
        bytesHex(SAMPLE_JSON.payload),
      ).toJSON(),
    )

    expect(actual_json).toEqual(SAMPLE_JSON)
  })
})
