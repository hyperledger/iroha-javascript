import { Client } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/native'
import { crypto } from './crypto'
import { KeyPair } from '@iroha2/crypto-core'
import { hexToBytes } from 'hada'
import { client_config } from '../../config'
import { AccountId } from '@iroha2/data-model'

export const client = new Client({
  torii: {
    // proxified with vite
    apiURL: `http://${window.location.host}/torii/api`,
    telemetryURL: `http://${window.location.host}/torii/telemetry`,
  },
  accountId: client_config.account as AccountId,
  keyPair: generateKeyPair({
    publicKeyMultihash: client_config.publicKey,
    privateKey: client_config.privateKey,
  }),
  ws: WS,
})

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

  for (const x of [publicKey, privateKey, multihash]) {
    x.free()
  }

  return keyPair
}
