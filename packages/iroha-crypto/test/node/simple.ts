import { hexToBytes } from 'hada';
import init, { KeyGenConfiguration, KeyPair, Multihash } from '@iroha2/crypto';
import fs from 'fs/promises';

beforeAll(async () => {
    const buffer = await fs.readFile(require.resolve('@iroha2/crypto/wasm/iroha_crypto_bg.wasm'));
    await init(buffer);
});

test('Generates KeyPair from seed as expected', () => {
    // given
    const privKeyHex =
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7';
    const privKeyBytes = hexToBytes(privKeyHex);
    const pubKeyMultihashHex = 'ed0120f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7';
    const pubKeyMultihashBytes = hexToBytes(pubKeyMultihashHex);
    const seedBytes = [49, 50, 51, 52];

    // when
    const config = new KeyGenConfiguration().use_seed(Uint8Array.from(seedBytes));
    const keyPair = KeyPair.generate_with_configuration(config);

    // then
    expect(keyPair.private_key.payload).toEqual(Uint8Array.from(privKeyBytes));
    expect(Multihash.from_public_key(keyPair.public_key).to_bytes()).toEqual(Uint8Array.from(pubKeyMultihashBytes));
});
