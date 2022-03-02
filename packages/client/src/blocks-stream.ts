import Emittery from 'emittery';
import Debug from 'debug';
import { initWebSocket, CloseEvent, Event as WsEvent } from '@iroha2/client-isomorphic-ws';
import { incomingDataToArrayBufferView, transformProtocolInUrlFromHttpToWs } from './util';
import {
    BlockPublisherMessageCodec,
    BlockSubscriberMessage,
    Enum,
    VersionedBlockSubscriberMessageCodec,
    VersionedCommittedBlock,
} from '@iroha2/data-model';

const debug = Debug('@iroha2/client:blocks-stream');

export interface SetupBlocksStreamParams {
    toriiApiURL: string;
    height: bigint;
}

export interface BlocksStreamEmitteryMap {
    error: WsEvent;
    close: CloseEvent;
    block: VersionedCommittedBlock;
}

export interface SetupBlocksStreamReturn {
    stop: () => void;
    ee: Emittery<BlocksStreamEmitteryMap>;
}

export async function setupBlocksStream(params: SetupBlocksStreamParams): Promise<SetupBlocksStreamReturn> {
    const url = transformProtocolInUrlFromHttpToWs(params.toriiApiURL) + '/blocks-stream';
    debug('opening connection to %o', url);

    const ee = new Emittery<
        {
            accepted: undefined;
        } & BlocksStreamEmitteryMap
    >();

    const socket = initWebSocket({
        url,
        onopen: () => {
            debug('connection opened, sending subscription request');
            sendMessage(Enum.variant('SubscriptionRequest', params.height));
        },
        onclose: (e) => {
            debug('connection closed: %o', e);
            ee.emit('close', e);
        },
        onerror: (e) => {
            debug('connection error: %o', e);
            ee.emit('error', e);
        },
        onmessage: ({ data }) => {
            const view = incomingDataToArrayBufferView(data);
            const msg = BlockPublisherMessageCodec.fromBuffer(view);

            msg.match({
                SubscriptionAccepted() {
                    debug('subscription accepted');
                    ee.emit('accepted');
                },
                Block(block) {
                    debug('new block: %o', block);
                    ee.emit('block', block);
                },
            });
        },
    });

    function sendMessage(msg: BlockSubscriberMessage) {
        const bytes = VersionedBlockSubscriberMessageCodec.toBuffer(Enum.variant('V1', msg));
        socket.send(bytes);
    }

    async function stop(): Promise<void> {
        if (socket.isClosed()) return;
        debug('closing connection...');
        socket.close();
        return ee.once('close').then(() => {});
    }

    await new Promise<void>((resolve, reject) => {
        ee.once('accepted').then(resolve);
        ee.once('close').then(() => {
            reject(new Error('Handshake acquiring failed - connection closed'));
        });
    });

    return {
        ee:
            // Emittery typing bug
            ee as unknown as Emittery<BlocksStreamEmitteryMap>,
        stop,
    };
}
