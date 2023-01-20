import { expect, test } from 'vitest'
import { crypto } from '@iroha2/crypto-target-node'

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
    "private_key": {
      "digest_function": "ed25519",
      "payload": "01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7",
    },
    "public_key": "ed0120f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7",
  }

  const keyPair = crypto.KeyPair.fromJSON(json)

  expect(keyPair.toJSON()).toEqual(json)
})
