import {
    Enum,
    Event,
    EventFilter,
    EventSocketMessage,
    FragmentFromBuilder,
    VersionedEventSocketMessage,
} from '@iroha2/data-model';
import Emittery from 'emittery';
import WebSocket, { CloseEvent, ErrorEvent } from 'ws';

export interface EventsEmitteryMap {
    close: CloseEvent;
    error: ErrorEvent;
    accepted: undefined;
    event: FragmentFromBuilder<typeof Event>;
}

export interface SetupEventsParams {
    toriiApiUrl: string;
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
        error: ErrorEvent;
        close: CloseEvent;
        subscription_accepted: undefined;
        event: FragmentFromBuilder<typeof Event>;
    }>();

    ee.on('close', (e) => eeExternal.emit('close', e));
    ee.on('error', (e) => eeExternal.emit('error', e));
    ee.on('event', (e) => eeExternal.emit('event', e));
    ee.on('subscription_accepted', () => eeExternal.emit('accepted'));

    const socket = new WebSocket(`${transformProtocolInUrlFromHttpToWs(params.toriiApiUrl)}/events`);

    socket.onopen = () => {
        sendMessage(EventSocketMessage.fromValue(Enum.valuable('SubscriptionRequest', params.filter)));
    };

    socket.onclose = (event) => {
        ee.emit('close', event);
    };

    socket.onerror = (err) => {
        ee.emit('error', err);
    };

    async function close(): Promise<void> {
        if (socket.readyState === socket.CLOSED) return;

        // At the moment Iroha does not support gracefull connection closing, so
        // forced termination
        // Iroha issue: https://github.com/hyperledger/iroha/issues/1195
        // In future it should be done via `socket.close()`
        socket.terminate();
        return ee.once('close').then(() => {});
    }

    function sendMessage(msg: FragmentFromBuilder<typeof EventSocketMessage>) {
        const encoded: Uint8Array = VersionedEventSocketMessage.fromValue(Enum.valuable('V1', msg)).bytes;
        socket.send(encoded);
    }

    let listeningForSubscriptionAccepted = false;

    socket.onmessage = ({ data }) => {
        if (typeof data === 'string') {
            console.error(data);
            throw new Error('Unexpected string data');
        }
        if (Array.isArray(data)) {
            console.error(data);
            throw new Error('Unexpected array data');
        }

        const { value: event }: FragmentFromBuilder<typeof EventSocketMessage> = VersionedEventSocketMessage.fromBytes(
            new Uint8Array(data),
        ).value.as('V1');

        if (event.is('SubscriptionAccepted')) {
            if (!listeningForSubscriptionAccepted) throw new Error('No callback!');
            ee.emit('subscription_accepted');
        } else {
            ee.emit('event', event.as('Event'));
            sendMessage(EventSocketMessage.fromValue(Enum.empty('EventReceived')));
        }
    };

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
