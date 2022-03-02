import {
    Event,
    EventFilter,
    EventSubscriberMessage,
    Enum,
    VersionedEventPublisherMessageCodec,
    VersionedEventSubscriberMessageCodec,
} from '@iroha2/data-model';
import Emittery from 'emittery';
import { initWebSocket, CloseEvent, Event as WsEvent, MessageEvent } from '@iroha2/client-isomorphic-ws';
import Debug from 'debug';
import { incomingDataToArrayBufferView, transformProtocolInUrlFromHttpToWs } from './util';

const debug = Debug('@iroha2/client:events');

export interface EventsEmitteryMap {
    close: CloseEvent;
    error: WsEvent;
    event: Event;
}

export interface SetupEventsParams {
    toriiApiURL: string;
    filter: EventFilter;
}

export interface SetupEventsReturn {
    stop: () => void;
    ee: Emittery<EventsEmitteryMap>;
}

/**
 * Promise resolved when connection handshake is acquired
 */
export async function setupEvents(params: SetupEventsParams): Promise<SetupEventsReturn> {
    // const eeExternal = new Emittery<EventsEmitteryMap>();

    const ee = new Emittery<
        EventsEmitteryMap & {
            acquired: undefined;
        }
    >();

    const url = `${transformProtocolInUrlFromHttpToWs(params.toriiApiURL)}/events`;
    debug('opening connection to %o', url);

    const socket = initWebSocket({
        url,
        onopen: () => {
            debug('connection opened, sending subscription request');
            sendMessage(Enum.variant('SubscriptionRequest', params.filter));
        },
        onclose: (e) => {
            debug('connection closed: %o', e);
            ee.emit('close', e);
        },
        onerror: (e) => {
            debug('connection error: %o', e);
            ee.emit('error', e);
        },
        onmessage: ({ data }) => {
            const event = VersionedEventPublisherMessageCodec.fromBuffer(data).as('V1');

            if (event.is('SubscriptionAccepted')) {
                debug('subscription accepted');
                ee.emit('acquired');
            } else {
                ee.emit('event', event.as('Event'));
                sendMessage(Enum.variant('EventReceived'));
            }
        },
    });

    async function close(): Promise<void> {
        if (socket.isClosed()) return;
        debug('closing connection...');
        socket.close();
        return ee.once('close').then(() => {});
    }

    function sendMessage(msg: EventSubscriberMessage) {
        const encoded = VersionedEventSubscriberMessageCodec.toBuffer(Enum.variant('V1', msg));
        socket.send(encoded);
    }

    await new Promise<void>((resolve, reject) => {
        ee.once('acquired').then(resolve);
        ee.once('close').then(() => {
            reject(new Error('Handshake acquiring failed - connected closed'));
        });
    });

    return {
        stop: close,
        ee:
            // Emittery typing bug :<
            ee as any,
    };
}
