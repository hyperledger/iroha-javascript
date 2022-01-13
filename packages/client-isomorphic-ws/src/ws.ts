import { initWebSocket as trueInit, IncomingData } from '../types';
import WebSocket from 'ws';

function handleIncomingData(data: string | Buffer | ArrayBuffer | Buffer[]): IncomingData {
    if (Array.isArray(data)) {
        console.error('Data:', data);
        throw new Error('Unexpected array received');
    }

    return data;
}

export const initWebSocket: typeof trueInit = (params) => {
    const socket = new WebSocket(params.url);

    socket.onopen = params.onopen;
    socket.onclose = params.onclose;
    socket.onmessage = (msg) => {
        params.onmessage({
            data: handleIncomingData(msg.data),
        });
    };
    socket.onerror = params.onerror;

    return {
        isClosed: () => socket.readyState === socket.CLOSED,
        send: (data) => socket.send(data),
        close: (code, reason) => socket.close(code, reason),
    };
};
