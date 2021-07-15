import { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/common';
import { IrohaClient } from '@iroha/client';
import keys from '../config/keys';

const client = new IrohaClient({
    ...keys,
    baseUrl: 'http://localhost:8080',
    account: {
        name: 'alice',
        domainName: 'wonderland',
    },
    hasher: create_blake2b_32_hash,
    signer: sign_with_ed25519_sha512,
});

(async function () {
    const { close } = await client.listenToEvents({
        eventFilter: client.createScale('EventFilter', {
            Pipeline: {},
        }),
        on: {
            event: (event) => {
                console.log('Yay!', event.toHuman());
            },
        },
    });

    // wait 20 sec and close connection
    await new Promise<void>((r) => setTimeout(r, 2_000));

    close();
})().catch((err) => {
    console.error(err);
});
