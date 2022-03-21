import { initWebSocket, CloseEvent, Event as WsEvent, SendData } from '@iroha2/client-isomorphic-ws';
import { Debugger } from 'debug';
import Emittery from 'emittery';

const MAX_SAFE_U32 = 0xffff_ffff;

export function randomU32(): number {
    return ~~(Math.random() * MAX_SAFE_U32);
}

export function transformProtocolInUrlFromHttpToWs(url: string): string {
    return url.replace(/^https?:\/\//, (substr) => {
        const isSafe = /https/.test(substr);
        return `ws${isSafe ? 's' : ''}://`;
    });
}

export interface SocketEmitMapBase {
    accepted: undefined;
    open: WsEvent;
    close: CloseEvent;
    error: WsEvent;
    message: ArrayBufferView;
}

export function setupWebSocket<EmitMap extends SocketEmitMapBase>(params: {
    baseURL: string;
    endpoint: string;
    parentDebugger: Debugger;
}): {
    ee: Emittery<EmitMap>;
    isClosed: () => boolean;
    send: (data: SendData) => void;
    close: () => Promise<void>;
    accepted: () => Promise<void>;
} {
    const debug = params.parentDebugger.extend('websocket');
    const url = transformProtocolInUrlFromHttpToWs(params.baseURL) + params.endpoint;
    const ee = new Emittery<EmitMap>();

    debug('opening connection to %o', url);

    const { isClosed, send, close } = initWebSocket({
        url,
        onopen: (e) => {
            debug('connection opened');
            ee.emit('open', e);
        },
        onclose: (e) => {
            debug('connection closed; code: %o, reason: %o, was clean: %o', e.code, e.reason, e.wasClean);
            ee.emit('close', e);
        },
        onerror: (e) => {
            debug('connection error %o', e);
            ee.emit('error', e);
        },
        onmessage: ({ data }) => {
            debug('message', data);
            ee.emit('message', data);
        },
    });

    async function closeAsync() {
        if (isClosed()) return;
        debug('closing connection...');
        close();
        return ee.once('close').then(() => {});
    }

    async function accepted() {
        return new Promise<void>((resolve, reject) => {
            ee.once('accepted').then(resolve);
            ee.once('close').then(() => {
                reject(new Error('Handshake acquiring failed - connection closed'));
            });
        });
    }

    return { isClosed, send, close: closeAsync, ee, accepted };
}
