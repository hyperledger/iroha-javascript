import { EventFilter, Event as WebsocketEvent } from '@iroha/data-model';
import Emittery from 'emittery';
import WebSocket, { CloseEvent, ErrorEvent } from 'ws';
import { CreateScaleFactory } from '@iroha/scale-codec-legacy';
import { AllRuntimeDefinitions } from './dsl';

// export type StopListenFn = () => void;

// export interface IrohaEventListenerMap {
//     error: unknown;
//     connected: undefined;
//     event: { msg: string };
// }

// type ListenerWithParams<T> = (payload: T) => void;

// class TypedEventEmitter<EventMap extends {}> {
//     private emitter = new Emittery<EventMap>();

//     public on<E extends keyof EventMap, Payload extends EventMap[E]>(
//         event: E,
//         callback: ListenerWithParams<Payload>,
//     ): StopListenFn {
//         this.emitter.on(event, callback as any);
//         return () => this.emitter.off(event, callback as any);
//     }

//     public emit<E extends keyof EventMap, Payload extends EventMap[E]>(event: E, payload: Payload): void {
//         this.emitter.emit(event, payload);
//     }
// }

interface Message<T> {
    version: '1';
    content: T;
}

function sendMessage(socket: WebSocket, content: any) {
    console.log('== Sending message: %o', content);

    const msg: Message<any> = {
        version: '1',
        content,
    };

    socket.send(JSON.stringify(msg));
}

export interface IrohaEventsAPIParams {
    createScale: CreateScaleFactory<AllRuntimeDefinitions>;
    eventFilter: EventFilter;
    baseURL: string;
    on: IrohaEventsAPIListeners;
}

export interface IrohaEventsAPIListeners {
    /**
     * Called when connection has closed
     */
    closed?: () => void;

    /**
     * Called when some websocket error occured
     */
    error?: (err: Error) => void;

    /**
     * Main callback with event payload
     */
    event: (event: WebsocketEvent) => void;
}

export interface IrohaEventAPIReturn {
    close: () => void;
}

export async function setupEventsWebsocketConnection(params: IrohaEventsAPIParams): Promise<IrohaEventAPIReturn> {
    const { createScale } = params;

    const ee = new Emittery<{
        error: Error;
        close: CloseEvent;
        subscription_accepted: undefined;
        event: WebsocketEvent;
    }>();

    ee.on('close', () => params.on.closed?.());
    ee.on('error', (err) => params.on.error?.(err));
    ee.on('event', (event) => params.on.event(event));

    // const emitter = new TypedEventEmitter<IrohaEventListenerMap>();

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

    // type IrohaMessageContent = 'SubscriptionAccepted' | IrohaMessageEvent;

    // interface IrohaMessageEvent {
    //     Event: unknown;
    // }

    // function sendEvent

    socket.onopen = () => {
        // Sending handshake message
        sendMessage(socket, {
            SubscriptionRequest: params.eventFilter.toHuman(),
        });

        // const msg: Message<{
        //     SubscriptionRequest: any;
        // }> = {
        //     version: '1',
        //     content: {
        //         SubscriptionRequest: params.eventFilter.toHuman(),
        //     },
        // };

        // socket.send(JSON.stringify(msg));
    };

    socket.onclose = (event) => {
        ee.emit('close', event);
        console.log('Closed: %s %s', event.code, event.reason);
    };

    socket.onerror = (err) => {
        console.error('error', err);
        ee.emit('error', err);
    };

    // let subscriptionAcceptedCallback: null | (() => void) = null;

    let listeningForSubscriptionAccepted = false;

    socket.onmessage = ({ data }) => {
        if (typeof data !== 'string') {
            console.error('unknown data:', data);
            return;
        }

        const { content }: Message<any> = JSON.parse(data);

        console.log('== Received message: %o', content);

        if (content === 'SubscriptionAccepted') {
            if (!listeningForSubscriptionAccepted) throw new Error('No callback!');
            ee.emit('subscription_accepted');
            // subscriptionAcceptedCallback();
            // console.log('Ok, accepted');
        } else {
            const event = createScale('Event', content.Event);

            ee.emit('event', event);

            sendMessage(socket, 'EventReceived');

            // const msg: Message<'EventReceived'> = {
            //     version: '1',
            //     content: 'EventReceived',
            // };

            // // console.log('sending "received"');

            // socket.send(JSON.stringify(msg));
        }

        // console.log('message', content);
    };

    await new Promise<void>((resolve, reject) => {
        const unsubs = [
            ee.on('subscription_accepted', () => {
                console.log('accepted!');
                stopAll();
                resolve();
            }),
            ee.on('error', () => {
                console.error('oops, catched error before handshake? Reject?');
            }),
            ee.on('close', () => {
                console.log('Closed! owo');
                reject(new Error('Handshake acquiring failed - connected closed'));
            }),
        ];

        function stopAll() {
            unsubs.forEach((x) => x());
        }

        listeningForSubscriptionAccepted = true;
    });

    // setTimeout(() => {
    //     console.log('ok closing?');
    //     socket.send(new Uint8Array([0x00, 0xff]));
    //     // socket.onclose = null;
    //     socket.close(1000);
    //     // socket.terminate();
    // }, 500);

    // socket.addEventListener('open', (event) => {
    //     console.log('opened', event);
    // });

    // socket.addEventListener('close', (event) => {
    //     console.log('opened', event);
    // });

    // socket.addEventListener('error', (event) => {
    //     console.log('error', event);
    // });

    // socket.addEventListener('message', (event) => {
    //     console.log('message', event);
    // });

    return {
        close,
        // on: (event, cb) => emitter.on(event, cb),
    };
}
