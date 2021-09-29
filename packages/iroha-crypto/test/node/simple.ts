import { hexToBytes } from 'hada';
import { crypto } from '@iroha2/crypto/node';

const { createMultihashFromPublicKey, createKeyGenConfiguration, generateKeyPairWithConfiguration } = crypto;

test('Generates KeyPair from seed as expected', () => {
    // given
    const privKeyHex =
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7';
    const privKeyBytes = hexToBytes(privKeyHex);
    const pubKeyMultihashHex = 'ed0120f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7';
    const pubKeyMultihashBytes = hexToBytes(pubKeyMultihashHex);
    const seedBytes = [49, 50, 51, 52];

    // when
    const config = createKeyGenConfiguration().useSeed(Uint8Array.from(seedBytes));
    const keyPair = generateKeyPairWithConfiguration(config);

    // then
    expect(keyPair.privateKey().payload()).toEqual(Uint8Array.from(privKeyBytes));
    expect(createMultihashFromPublicKey(keyPair.publicKey()).toBytes()).toEqual(Uint8Array.from(pubKeyMultihashBytes));
});
