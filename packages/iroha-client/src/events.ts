import { IrohaTypes, types } from '@iroha/data-model';
import Emittery from 'emittery';
import WebSocket, { CloseEvent, ErrorEvent } from 'ws';

interface Message<T> {
    version: '1';
    content: T;
}

export interface IrohaEventsAPIParams {
    eventFilter: IrohaTypes['iroha_data_model::events::EventFilter'];
    baseURL: string;

    /**
     * Event listeners
     */
    on: IrohaEventsAPIListeners;
}

export interface IrohaEventsAPIListeners {
    /**
     * When connection is closed
     */
    close?: (e: CloseEvent) => void;

    /**
     * When some socket error occured
     */
    error?: (err: ErrorEvent) => void;

    /**
     * When socket connected and handshake acquired
     */
    ready?: () => void;

    /**
     * Main callback with event payload
     */
    event: (event: IrohaTypes['iroha_data_model::events::Event']) => void;
}

export interface IrohaEventAPIReturn {
    close: () => void;
}

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

    function close() {
        // At the moment Iroha does not support gracefull connection closing, so
        // forced termination
        // Iroha issue: https://jira.hyperledger.org/browse/IR-1174
        socket.terminate();

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

    /**
     * TODO scale
     */
    function sendMessage(content: any) {
        const msg: Message<any> = {
            version: '1',
            content,
        };

        socket.send(JSON.stringify(msg));
    }

    socket.onopen = () => {
        // Sending handshake message
        // TODO
        // sendMessage({
        //     SubscriptionRequest: params.eventFilter.toHuman(),
        // });
    };

    socket.onclose = (event) => {
        ee.emit('close', event);
    };

    socket.onerror = (err) => {
        ee.emit('error', err);
    };

    let listeningForSubscriptionAccepted = false;

    socket.onmessage = ({ data }) => {
        // TODO
        // if (typeof data !== 'string') {
        //     console.error('unknown data:', data);
        //     return;
        // }
        // const {
        //     content,
        // }: Message<
        //     | 'SubscriptionAccepted'
        //     | {
        //           Event: any;
        //       }
        // > = JSON.parse(data);
        // if (content === 'SubscriptionAccepted') {
        //     if (!listeningForSubscriptionAccepted) throw new Error('No callback!');
        //     ee.emit('subscription_accepted');
        // } else {
        //     const event = params.createScale('Event', content.Event);
        //     ee.emit('event', event);
        //     sendMessage('EventReceived');
        // }
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
