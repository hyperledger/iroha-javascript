import Emittery from 'emittery'
import Debug from 'debug'
import {
  BlockSubscriberMessage,
  VersionedBlockPublisherMessage,
  VersionedBlockSubscriberMessage,
  VersionedCommittedBlock,
} from '@iroha2/data-model'
import { ENDPOINT_BLOCKS_STREAM } from './const'
import { SocketEmitMapBase, setupWebSocket } from './util'
import { IsomorphicWebSocketAdapter } from './web-socket/types'

const debug = Debug('@iroha2/client:blocks-stream')

export interface SetupBlocksStreamParams {
  toriiApiURL: string
  height: bigint
  adapter: IsomorphicWebSocketAdapter
}

export interface BlocksStreamEmitteryMap extends SocketEmitMapBase {
  block: VersionedCommittedBlock
}

export interface SetupBlocksStreamReturn {
  stop: () => Promise<void>
  isClosed: () => boolean
  ee: Emittery<BlocksStreamEmitteryMap>
}

export async function setupBlocksStream(params: SetupBlocksStreamParams): Promise<SetupBlocksStreamReturn> {
  const {
    ee,
    send: sendRaw,
    isClosed,
    close,
    accepted,
  } = setupWebSocket<BlocksStreamEmitteryMap>({
    baseURL: params.toriiApiURL,
    endpoint: ENDPOINT_BLOCKS_STREAM,
    parentDebugger: debug,
    adapter: params.adapter,
  })

  function send(msg: BlockSubscriberMessage) {
    sendRaw(VersionedBlockSubscriberMessage.toBuffer(VersionedBlockSubscriberMessage('V1', msg)))
  }

  ee.on('open', () => {
    send(BlockSubscriberMessage('SubscriptionRequest', params.height))
  })

  ee.on('message', (raw) => {
    const msg = VersionedBlockPublisherMessage.fromBuffer(raw).as('V1')

    msg.match({
      SubscriptionAccepted() {
        debug('subscription accepted')
        ee.emit('accepted')
      },
      Block(block) {
        debug('new block: %o', block)
        ee.emit('block', block)
        send(BlockSubscriberMessage('BlockReceived'))
      },
    })
  })

  await accepted()

  return {
    ee:
      // Emittery typing bug
      ee as unknown as Emittery<BlocksStreamEmitteryMap>,
    stop: close,
    isClosed,
  }
}
