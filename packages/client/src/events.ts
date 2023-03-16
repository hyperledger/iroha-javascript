import { Event, FilterBox, VersionedEventMessage, VersionedEventSubscriptionRequest } from '@iroha2/data-model'
import Emittery from 'emittery'
import Debug from 'debug'
import { SocketEmitMapBase, setupWebSocket } from './util'
import { ENDPOINT_EVENTS } from './const'
import { IsomorphicWebSocketAdapter } from './web-socket/types'

const debug = Debug('@iroha2/client:events')

export interface EventsEmitteryMap extends SocketEmitMapBase {
  event: Event
}

export interface SetupEventsParams {
  toriiApiURL: string
  filter: FilterBox
  adapter: IsomorphicWebSocketAdapter
}

export interface SetupEventsReturn {
  stop: () => Promise<void>
  isClosed: () => boolean
  ee: Emittery<EventsEmitteryMap>
}

/**
 * Promise resolved when connection handshake is acquired
 */
export async function setupEvents(params: SetupEventsParams): Promise<SetupEventsReturn> {
  const {
    ee,
    isClosed,
    close,
    accepted,
    send: sendRaw,
  } = setupWebSocket<EventsEmitteryMap>({
    baseURL: params.toriiApiURL,
    endpoint: ENDPOINT_EVENTS,
    parentDebugger: debug,
    adapter: params.adapter,
  })

  ee.on('open', () => {
    sendRaw(VersionedEventSubscriptionRequest.toBuffer(VersionedEventSubscriptionRequest('V1', params.filter)))
  })

  ee.on('message', (raw) => {
    const event = VersionedEventMessage.fromBuffer(raw).enum.content
    ee.emit('event', event)
  })

  await accepted()

  return {
    stop: close,
    ee:
      // Emittery typing bug :<
      ee as any,
    isClosed,
  }
}
