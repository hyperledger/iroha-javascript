import { IncomingData } from '@iroha2/client-isomorphic-ws';

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

export function incomingDataToArrayBufferView(data: IncomingData): ArrayBufferView {
    if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    }
    throw new Error(`Incoming data is not ArrayBuffer`);
}
