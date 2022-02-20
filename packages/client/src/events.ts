import {
    Event,
    EventFilter,
    EventSubscriberMessage,
    VersionedEventPublisherMessage,
    VersionedEventSubscriberMessage,
    FragmentFromBuilder,
} from '@iroha2/data-model';
import Emittery from 'emittery';
import { initWebSocket, CloseEvent, Event as WsEvent, MessageEvent } from '@iroha2/client-isomorphic-ws';
import Debug from 'debug';

const debug = Debug('@iroha2/client:events');

export interface EventsEmitteryMap {
    close: CloseEvent;
    error: WsEvent;
    accepted: undefined;
    event: FragmentFromBuilder<typeof Event>;
}

export interface SetupEventsParams {
    toriiApiURL: string;
    filter: FragmentFromBuilder<typeof EventFilter>;
}

export interface SetupEventsReturn {
    close: () => void;
    ee: Emittery<EventsEmitteryMap>;
}

function transformProtocolInUrlFromHttpToWs(url: string): string {
    return url.replace(/^https?:\/\//, (substr) => {
        const isSafe = /https/.test(substr);
        return `ws${isSafe ? 's' : ''}://`;
    });
}

/**
 * Promise resolved when connection handshake is acquired
 */
export async function setupEventsWebsocketConnection(params: SetupEventsParams): Promise<SetupEventsReturn> {
    const eeExternal = new Emittery<EventsEmitteryMap>();

    const ee = new Emittery<{
        error: WsEvent;
        close: CloseEvent;
        subscription_accepted: undefined;
        event: FragmentFromBuilder<typeof Event>;
    }>();

    ee.on('close', (e) => eeExternal.emit('close', e));
    ee.on('error', (e) => eeExternal.emit('error', e));
    ee.on('event', (e) => eeExternal.emit('event', e));
    ee.on('subscription_accepted', () => eeExternal.emit('accepted'));

    const url = `${transformProtocolInUrlFromHttpToWs(params.toriiApiURL)}/events`;
    debug('opening connection to %o', url);

    const socket = initWebSocket({
        url,
        onopen: () => {
            debug('connection opened, sending subscription request');
            sendMessage(EventSubscriberMessage.variants.SubscriptionRequest(params.filter));
        },
        onclose: (e) => {
            debug('connection closed: %o', e);
            ee.emit('close', e);
        },
        onerror: (e) => {
            debug('connection error: %o', e);
            ee.emit('error', e);
        },
        onmessage: (msg) => handleMessage(msg),
    });

    function handleMessage({ data }: MessageEvent) {
        if (typeof data === 'string') {
            console.error(data);
            throw new Error('Unexpected string data');
        }

        const event = VersionedEventPublisherMessage.fromBytes(new Uint8Array(data)).value.as('V1').value;

        if (event.is('SubscriptionAccepted')) {
            if (!listeningForSubscriptionAccepted) throw new Error('No callback!');
            debug('subscription accepted');
            ee.emit('subscription_accepted');
        } else {
            ee.emit('event', event.as('Event'));
            sendMessage(EventSubscriberMessage.variants.EventReceived);
        }
    }

    async function close(): Promise<void> {
        if (socket.isClosed()) return;
        debug('closing connection...');
        socket.close();
        return ee.once('close').then(() => {});
    }

    function sendMessage(msg: FragmentFromBuilder<typeof EventSubscriberMessage>) {
        const encoded: Uint8Array = VersionedEventSubscriberMessage.variants.V1(msg).bytes;
        socket.send(encoded);
    }

    let listeningForSubscriptionAccepted = false;

    await new Promise<void>((resolve, reject) => {
        ee.once('subscription_accepted').then(resolve);
        ee.once('close').then(() => {
            reject(new Error('Handshake acquiring failed - connected closed'));
        });

        listeningForSubscriptionAccepted = true;
    });

    return {
        close,
        ee: eeExternal,
    };
}
