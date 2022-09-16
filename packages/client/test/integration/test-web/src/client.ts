import { Client, Signer, Torii } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/native'
import { crypto } from './crypto'
import { KeyPair } from '@iroha2/crypto-core'
import { hexToBytes } from 'hada'
import { client_config } from '../../config'
import { AccountId } from '@iroha2/data-model'

const HOST = window.location.host

const torii = new Torii({
  // proxified with vite
  apiURL: `http://${HOST}/torii/api`,
  telemetryURL: `http://${HOST}/torii/telemetry`,
  ws: WS,
  fetch: fetch.bind(window),
})

const signer = new Signer(
  client_config.account as AccountId,
  generateKeyPair({
    publicKeyMultihash: client_config.publicKey,
    privateKey: client_config.privateKey,
  }),
)

export const client = new Client({ torii, signer })

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
