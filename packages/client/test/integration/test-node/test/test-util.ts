import nodeFetch from 'node-fetch'
import { client_config, PIPELINE_MS } from '../../config'
import { delay } from '../../util'
import { Signer, Client } from '@iroha2/client'
import * as Iroha from '@iroha2/data-model'
import { adapter as WS } from '@iroha2/client/web-socket/node'
import { crypto } from '@iroha2/crypto-target-node'

export const keyPair = crypto.KeyPair.fromJSON(client_config)

export async function pipelineStepDelay() {
  await delay(PIPELINE_MS)
}

export function clientFactory() {
  const signer = new Signer(client_config.account as Iroha.AccountId, keyPair)

  const pre = { ...client_config.torii, ws: WS, fetch: nodeFetch as typeof fetch }

  const client = new Client({ signer })

  return { signer, pre, client }
}
