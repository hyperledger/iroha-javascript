import { Enum, IrohaDataModel, irohaCodec } from '@iroha2/data-model';
import Emittery from 'emittery';
import WebSocket, { CloseEvent, ErrorEvent } from 'ws';

export interface EventsEmitteryMap {
    close: CloseEvent;
    error: ErrorEvent;
    accepted: undefined;
    event: IrohaDataModel['iroha_data_model::events::Event'];
}

export interface SetupEventsParams {
    toriiURL: string;
    filter: IrohaDataModel['iroha_data_model::events::EventFilter'];
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
        event: IrohaDataModel['iroha_data_model::events::Event'];
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
        socket.terminate();
        return ee.once('close').then(() => {});

        // let closed = false;

        // ee.on('close', () => {
        //     closed = true;
        // });

        // socket.close();

        // setTimeout(() => {
        //     if (!closed) {
        //         console.log('too long, terminating..');
        //         socket.terminate();
        //     }
        // }, 1000);
    }

    function sendMessage(msg: IrohaDataModel['iroha_data_model::events::EventSocketMessage']) {
        const encoded = irohaCodec.encode(
            'iroha_data_model::events::VersionedEventSocketMessage',
            Enum.create('V1', [msg]),
        );
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

        const event = irohaCodec
            .decode('iroha_data_model::events::VersionedEventSocketMessage', new Uint8Array(data))
            .as('V1')[0];

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
