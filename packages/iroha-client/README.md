# @iroha/client

## Usage

### Client creation

```ts
import { IrohaClient, IrohaClientConfiguration } from '@iroha/client';
import { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/cjs';

const config: IrohaClientConfiguration = {
    toriiURL: 'http://localhost:8080',
    account: {
        name: 'alice',
        domainName: 'wonderland',
    },
    publicKey: {
        digest: 'ed25519',
        hex: 'e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    privateKey: {
        digest: 'ed25519',
        hex: 'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
};

const client = new IrohaClient({
    config,
    hashFn: create_blake2b_32_hash,
    signFn: sign_with_ed25519_sha512,
});
```

> If you import crypto-functions from `@iroha/crypto/cjs`, then you can use client immediately, but if from `@iroha/crypto/esm` (in browser), then you should initialize crypto first with `init()`:
>
> ```ts
> import init, { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/esm';
>
> init().then(() => {
>     // now you can use client
> });
> ```

### Submit instruction

Let's add new account:

```ts
import { IrohaTypes, Enum } from '@iroha/data-model';

const accountId: IrohaTypes['iroha_data_model::account::Id'] = {
    name: 'Alice',
    domainName: 'Wonderland',
};

const registerBox: IrohaTypes['iroha_data_model::isi::RegisterBox'] = {
    object: {
        expression: Enum.create(
            'Raw',
            Enum.create(
                'Identifiable',
                Enum.create('NewAccount', {
                    id: accountId,
                    signatories: [],
                    metadata: {
                        map: new Map(),
                    },
                }),
            ),
        ),
    },
};

client.submitInstruction(Enum.create('Register', registerBox)).then(() => {
    console.log('Submitted!');
});
```

### Query

```ts
import { IrohaTypes, Enum } from '@iroha/data-model';

client.query(Enum.create('FindAllAccounts', {})).then((queryResult) => {
    const existingAccounts: IrohaTypes['iroha_data_model::account::Id'][] = queryResult
        .as('Ok')
        .as('Vec')
        .map((val) => val.as('Identifiable').as('Account').id);

    console.log("Existing account's ids:", existingAccounts);
});
```

### Listening for events

```ts
import { Enum } from '@iroha/data-model';

client
    .listenToEvents({
        eventFilter: Enum.create('Pipeline', pipelineFilter),
        on: {
            event: (event) => {
                event.match({
                    Pipeline({ entityType, status }) {
                        if (entityType.is('Transaction') && status.is('Committed')) {
                            console.log('New transaction has committed!');
                        }
                    },
                    Data() {},
                });
            },
        },
    })
    .then(({ close }) => {
        console.log('Connection opened');

        // Closing connection after 10 seconds
        setTimeout(close, 10_000);
    })
    .catch((err) => {
        console.error('Connection failed:', err);
    });
```
