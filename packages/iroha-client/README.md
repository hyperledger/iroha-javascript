# @iroha/client

### Instruction example (browser)

```ts
import { IrohaClient } from '@iroha/client';
import init, { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/esm';

const client = new IrohaClient({
    publicKey: {
        digest: 'ed0120',
        hex: 'e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    privateKey: {
        digest: 'ed25519',
        hex: 'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    baseUrl: 'http://localhost:3000',
    account: {
        name: 'alice',
        domainName: 'wonderland',
    },
    hasher: create_blake2b_32_hash,
    signer: sign_with_ed25519_sha512,
});

const { createScale } = client;

(async function () {
    // This item can be removed in node.js (with the import, of course)
    await init();

    const normal_account_id = createScale('AccountId');

    const createAccountInstruction = createScale('Instruction', {
        Register: {
            object: {
                expression: {
                    Raw: {
                        Identifiable: {
                            NewAccount: {
                                id: normal_account_id,
                            },
                        },
                    },
                },
            },
        },
    });

    await client.submitInstruction(createAccountInstruction);
})();
```

### Query example (node)

```ts
import { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/common';
import { IrohaClient } from '@iroha/client';

const client = new IrohaClient({
    publicKey: {
        digest: 'ed0120',
        hex: 'e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    privateKey: {
        digest: 'ed25519',
        hex: 'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    baseUrl: 'http://localhost:8080',
    account: {
        name: 'alice',
        domainName: 'wonderland',
    },
    hasher: create_blake2b_32_hash,
    signer: sign_with_ed25519_sha512,
});

(async function () {
    const result = await client.request(
        client.createScale('QueryBox', {
            FindAllAccounts: {},
        }),
    );

    for (const i of result.asVec) {
        const {
            id: { domainName, name },
        } = i.asIdentifiable.asAccount;

        console.log('Account: %s -> %s', domainName.toString(), name.toString());
    }
})();
```

Output:

```
Account: genesis -> genesis
Account: wonderland -> alice
```

### Events example (node)

```ts
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
    await new Promise<void>((r) => setTimeout(r, 20_000));

    close();
})().catch((err) => {
    console.error(err);
});
```
