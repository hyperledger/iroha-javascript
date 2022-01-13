import { initWebSocket as trueInit, IncomingData } from '../types';

async function handleIncomingData(data: any): Promise<IncomingData> {
    if (data instanceof Blob) {
        const buff = await new Response(data).arrayBuffer();
        return buff;
    }

    if (typeof data === 'string') return data;

    console.error('Unexpected incoming data type:', data);
    throw new Error('Unable to parse incoming data');
}

export const initWebSocket: typeof trueInit = (params) => {
    const socket = new WebSocket(params.url);

    socket.onclose = params.onclose;
    socket.onmessage = async (msg) => {
        params.onmessage({ data: await handleIncomingData(msg.data) });
    };
    socket.onerror = params.onerror;
    socket.onopen = params.onopen;

    return {
        send: (data) => socket.send(data),
        close: (code, reason) => socket.close(code, reason),
        isClosed: () => socket.readyState === socket.CLOSED,
    };
};
