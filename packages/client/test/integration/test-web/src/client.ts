import { Client, Signer } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/native'
import { crypto } from './crypto'
import { CLIENT_CONFIG } from '@iroha2/test-configuration'

const HOST = window.location.host

export const toriiPre = {
  // proxified with vite
  apiURL: `http://${HOST}/torii/api`,
  telemetryURL: `http://${HOST}/torii/telemetry`,
  ws: WS,
  fetch: fetch.bind(window),
}

const signer = new Signer(CLIENT_CONFIG.accountId, crypto.KeyPair.fromJSON(CLIENT_CONFIG.keyPair))

export const client = new Client({ signer })
