import { CLIENT_CONFIG } from '@iroha2/test-configuration'
import { Client, Signer, Torii } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/node'
import { crypto } from '@iroha2/crypto-target-node'

export const keyPair = crypto.KeyPair.fromJSON(CLIENT_CONFIG.keyPair)

export function clientFactory() {
  const { accountId } = CLIENT_CONFIG

  const signer = new Signer(accountId, keyPair)

  const pre = { ...CLIENT_CONFIG.torii, ws: WS, fetch }

  const client = new Client({ signer })

  const getBlocksListener = async () => {
    const stream = await Torii.listenForBlocksStream(pre, {
      // 1 is genesis block, which is committed before each test
      height: 2n,
    })

    return {
      /**
       * Do an operation that should trigger a block commit, and wait until the block
       * is emitted
       */
      async wait(fn: () => Promise<void>) {
        await Promise.all([stream.ee.once('block'), fn()])
      },
    }
  }

  return { signer, pre, client, accountId, getBlocksListener }
}
