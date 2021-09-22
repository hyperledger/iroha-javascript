import {
    EncodeAsIs,
    Enum,
    iroha_data_model_events_EventFilter_Encodable,
    iroha_data_model_events_EventSocketMessage_Encodable,
    iroha_data_model_events_Event_Decoded,
    iroha_data_model_events_VersionedEventSocketMessage_decode,
    iroha_data_model_events_VersionedEventSocketMessage_encode,
} from '@iroha2/data-model';
import Emittery from 'emittery';
import WebSocket, { CloseEvent, ErrorEvent } from 'ws';

export interface EventsEmitteryMap {
    close: CloseEvent;
    error: ErrorEvent;
    accepted: undefined;
    event: iroha_data_model_events_Event_Decoded;
}

export interface SetupEventsParams {
    toriiURL: string;
    filter: iroha_data_model_events_EventFilter_Encodable | EncodeAsIs;
}

export interface SetupEventsReturn {
    close: () => void;
    ee: Emittery<EventsEmitteryMap>;
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
        event: iroha_data_model_events_Event_Decoded;
    }>();

    ee.on('close', (e) => eeExternal.emit('close', e));
    ee.on('error', (e) => eeExternal.emit('error', e));
    ee.on('event', (e) => eeExternal.emit('event', e));
    ee.on('subscription_accepted', () => eeExternal.emit('accepted'));

    const socket = new WebSocket(`${params.toriiURL}/events`);

    socket.onopen = () => {
        sendMessage(Enum.create('SubscriptionRequest', [params.filter]));
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

    function sendMessage(msg: iroha_data_model_events_EventSocketMessage_Encodable) {
        const encoded = iroha_data_model_events_VersionedEventSocketMessage_encode(Enum.create('V1', [msg]));
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

        const event = iroha_data_model_events_VersionedEventSocketMessage_decode(new Uint8Array(data))[0].as('V1')[0];

        if (event.is('SubscriptionAccepted')) {
            if (!listeningForSubscriptionAccepted) throw new Error('No callback!');
            ee.emit('subscription_accepted');
        } else {
            ee.emit('event', event.as('Event'));
            sendMessage(Enum.create('EventReceived'));
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
