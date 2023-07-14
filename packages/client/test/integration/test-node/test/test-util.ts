import nodeFetch from 'node-fetch'
import { PIPELINE_MS, CLIENT_CONFIG } from '@iroha2/test-configuration'
import { delay } from '../../util'
import { Client, Signer } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/node'
import { crypto } from '@iroha2/crypto-target-node'

export const keyPair = crypto.KeyPair.fromJSON(CLIENT_CONFIG.keyPair)

export async function pipelineStepDelay() {
  await delay(2_000) // FIXME: why so long?
}

export function clientFactory() {
  const { accountId } = CLIENT_CONFIG

  const signer = new Signer(accountId, keyPair)

  const pre = { ...CLIENT_CONFIG.torii, ws: WS, fetch: nodeFetch as typeof fetch }

  const client = new Client({ signer })

  return { signer, pre, client, accountId }
}
