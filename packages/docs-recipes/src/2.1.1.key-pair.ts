import { crypto } from '@iroha2/crypto-target-node'
import { KeyPair } from '@iroha2/crypto-core'

// the package for hex-bytes transform
import { hexToBytes } from 'hada'

function generateKeyPair(params: {
  publicKeyMultihash: string
  privateKey: {
    digestFunction: string
    payload: string
  }
}): KeyPair {
  const multihashBytes = Uint8Array.from(hexToBytes(params.publicKeyMultihash))
  const multihash = crypto.createMultihashFromBytes(multihashBytes)
  const publicKey = crypto.createPublicKeyFromMultihash(multihash)
  const privateKey = crypto.createPrivateKeyFromJsKey(params.privateKey)

  const keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey)

  // don't forget to "free" created structures
  for (const x of [publicKey, privateKey, multihash]) {
    x.free()
  }

  return keyPair
}

const keyPair = generateKeyPair({
  publicKeyMultihash:
    'ed0120e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
  privateKey: {
    digestFunction: 'ed25519',
    payload:
      'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
  },
})
