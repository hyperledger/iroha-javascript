import { Enum, IrohaTypes, types } from '@iroha/data-model';
import Emittery from 'emittery';
import WebSocket, { CloseEvent, ErrorEvent } from 'ws';
import { IrohaEventsAPIParams, IrohaEventAPIReturn } from './types';

/**
 * Promise resolved when connection handshake is acquired
 */
export async function setupEventsWebsocketConnection(params: IrohaEventsAPIParams): Promise<IrohaEventAPIReturn> {
    const ee = new Emittery<{
        error: ErrorEvent;
        close: CloseEvent;
        subscription_accepted: undefined;
        event: IrohaTypes['iroha_data_model::events::Event'];
    }>();

    ee.on('close', (e) => params.on.close?.(e));
    ee.on('error', (e) => params.on.error?.(e));
    ee.on('event', (event) => params.on.event(event));
    ee.on('subscription_accepted', () => params.on.ready?.());

    const socket = new WebSocket(`${params.baseURL}/events`);

    socket.onopen = () => {
        sendMessage(Enum.create('SubscriptionRequest', [params.eventFilter]));
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

    function sendMessage(msg: IrohaTypes['iroha_data_model::events::EventSocketMessage']) {
        const encoded = types.encode('iroha_data_model::events::VersionedEventSocketMessage', Enum.create('V1', [msg]));
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

        const event = types
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
        const unsubs = [
            ee.on('subscription_accepted', () => {
                stopAll();
                resolve();
            }),
            ee.on('close', () => {
                reject(new Error('Handshake acquiring failed - connected closed'));
            }),
        ];

        function stopAll() {
            unsubs.forEach((x) => x());
        }

        listeningForSubscriptionAccepted = true;
    });

    return {
        close,
    };
}
