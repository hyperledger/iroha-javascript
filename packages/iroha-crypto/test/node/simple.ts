import { hexToBytes } from 'hada';
import { JsKeyGenConfiguration, JsKeyPair, JsMultihash } from '../../iroha_crypto_wasm/pkg-node';

test('Generates KeyPair from seed as expected', () => {
    // given
    const privKeyHex =
        '01f2db2416255e79db67d5ac807e55459ed8754f07586864948aea00f6f81763f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7';
    const privKeyBytes = hexToBytes(privKeyHex);
    const pubKeyMultihashHex = 'ed0120f149bb4b59feb0ace3074f10c65e179880ea2c4fe4e0d6022b1e82c33c3278c7';
    const pubKeyMultihashBytes = hexToBytes(pubKeyMultihashHex);
    const seedBytes = [49, 50, 51, 52];

    // when
    const config = new JsKeyGenConfiguration().use_seed(Uint8Array.from(seedBytes));
    const keyPair = JsKeyPair.generate_with_configuration(config);

    // then
    expect(keyPair.private_key.payload).toEqual(Uint8Array.from(privKeyBytes));
    expect(JsMultihash.from_public_key(keyPair.public_key).to_bytes()).toEqual(Uint8Array.from(pubKeyMultihashBytes));
});
