import { Client } from '@iroha2/client';
import { AccountId } from '@iroha2/data-model';
import { crypto } from './crypto';
import { KeyPair } from '@iroha2/crypto-core';
import { hexToBytes } from 'hada';
import { client_config } from '../../config';

// proxified with vite
export const API_URL = `http://${window.location.host}/torii`;

export const ACCOUNT_ID = AccountId.defineUnwrap({
    name: 'alice',
    domain_name: 'wonderland',
});

export const KEY_PAIR = generateKeyPair({
    publicKeyMultihash: client_config.publicKey,
    privateKey: client_config.privateKey,
});

export const client = Client.create({
    torii: {
        apiURL: API_URL,
    },
});

function generateKeyPair(params: {
    publicKeyMultihash: string;
    privateKey: {
        digestFunction: string;
        payload: string;
    };
}): KeyPair {
    const multihashBytes = Uint8Array.from(hexToBytes(params.publicKeyMultihash));
    const multihash = crypto.createMultihashFromBytes(multihashBytes);
    const publicKey = crypto.createPublicKeyFromMultihash(multihash);
    const privateKey = crypto.createPrivateKeyFromJsKey(params.privateKey);

    const keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey);

    for (const x of [publicKey, privateKey, multihash]) {
        x.free();
    }

    return keyPair;
}
