# @iroha2/client

Client for Iroha 2.

## Installation

Configure your package manager to fetch scoped packages from nexus. Example for `npm`/`pnpm` - file `.npmrc`:

```ini
# .npmrc
@iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
```

Then, install packages: 

```sh
npm i @iroha2/client @iroha2/crypto @iroha2/data-model jsbi
```

> `jsbi` is a peer dependency of `@scale-codec/*` packages

## Usage

### Client creation

```ts
import { createClient, IrohaDataModel } from '@iroha2/client';
import { KeyPair } from '@iroha2/crypto';

// you create KeyPair in some way
const keyPair: KeyPair = /* ... */;

const client = createClient({
    toriiURL: 'http://localhost:8080'
})

// use it!

const payload: IrohaDataModel['iroha_data_model::transaction::Payload'] = {
    /* ... */
}

await client.submitTransaction({
    payload,
    signing: keyPair
})
```

### Submit transaction

Let's add new account:

```ts
import { IrohaDataModel, Enum } from '@iroha2/client';
import JSBI from 'jsbi';

const newAccountId: IrohaDataModel['iroha_data_model::account::Id'] = {
    name: 'bob',
    domainName: 'wonderland',
};

const registerBox: IrohaDataModel['iroha_data_model::isi::RegisterBox'] = {
    object: {
        expression: Enum.create(
            'Raw',
            Enum.create(
                'Identifiable',
                Enum.create('NewAccount', {
                    id: newAccountId,
                    signatories: [],
                    metadata: {
                        map: new Map(),
                    },
                }),
            ),
        ),
    },
};

const payload: IrohaDataModel['iroha_data_model::transaction::Payload'] = {
    instructions: [item],
    timeToLiveMs: JSBI.BigInt(100_000),
    creationTime: JSBI.BigInt(Date.now()),
    metadata: new Map(),
    accountId: {
        name: 'alice',
        domainName: 'wonderland',
    },
};

// Submitting transaction
await client.submitTransaction({
    payload,
    signing: keyPair,
});
```

### Make query

Let's find all of existing accounts and extract from them their IDs:

```ts
import { IrohaDataModel, Enum } from '@iroha2/client';
import JSBI from 'jsbi';

const query: IrohaDataModel['iroha_data_model::query::QueryBox'] = Enum.create('FindAllAccounts', {});

const payload: IrohaDataModel['iroha_data_model::query::Payload'] = {
    query,
    accountId: client_config.account,
    timestampMs: JSBI.BigInt(Date.now()),
};

// Making query
const result = await client.makeQuery({
    payload,
    signing: keyPair,
});

const existingAccounts: IrohaDataModel['iroha_data_model::account::Id'][] = result
    .as('Ok')
    .as('Vec')
    .map((val) => val.as('Identifiable').as('Account').id);

console.log('IDs of existing accounts:', existingAccounts);
```

### Listen for events

Let's listen for any committed transactions:

```ts
import { Enum, IrohaDataModel } from '@iroha2/client';

const pipelineFilter: IrohaDataModel['iroha_data_model::events::pipeline::EventFilter'] = {
    entity: Enum.create('Some', Enum.create('Transaction')),
    hash: Enum.create('None'),
};
const filter: IrohaDataModel['iroha_data_model::events::EventFilter'] = Enum.create('Pipeline', pipelineFilter);

// Setting up WebSocket connection
// `await` here for final connection establishment
// `ee` is an instance of Emmittery, a convenient event-emitter library
// `close` is for connection closing
const { ee, close } = await client.listenForEvents({ filter });

ee.on('event', (event) => {
    event.match({
        Pipeline({ entityType, status }) {
            if (entityType.is('Transaction') && status.is('Committed')) {
                console.log('New transaction has been committed!');
            }
        },
        Data() {},
    });
});

// Close connection after 10 seconds, for example
setTimeout(close, 10_000);
```
