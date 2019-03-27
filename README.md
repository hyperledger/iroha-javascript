
[![npm version](https://img.shields.io/npm/v/iroha-helpers.svg)](https://www.npmjs.com/package/iroha-helpers) [![Iroha 1.0.0-rc5](https://img.shields.io/badge/Iroha-1.0.0--rc5-red.svg)](https://github.com/hyperledger/iroha/releases/tag/1.0.0_rc5)

# iroha-helpers

Some functions which will help you to interact with [Hyperledger Iroha](https://github.com/hyperledger/iroha) from your JS program.

## Trying an example

 1. Clone this repository
 2. Run Iroha http://iroha.readthedocs.io/en/latest/getting_started/
 3. Run `grpc-web-proxy` for iroha https://gitlab.com/snippets/1713665
 4. `yarn build && node example`

## Instalation
Using npm:
``` bash
$ npm i iroha-helpers
```
Using yarn:
``` bash
$ yarn add iroha-helpers
```

In javascript:
``` javascript
import grpc from 'grpc'
import {
  QueryService_v1Client,
  CommandService_v1Client
} from '../iroha-helpers/lib/proto/endpoint_grpc_pb'
import { commands, queries } from 'iroha-helpers'

const IROHA_ADDRESS = 'localhost:50051'
const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const commandService = new CommandService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

const queryService = new QueryService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

Promise.all([
  commands.setAccountDetail({
    privateKeys: [adminPriv],
    creatorAccountId: 'admin@test',
    quorum: 1,
    commandService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test',
    key: 'jason',
    value: 'statham'
  }),
  queries.getAccountDetail({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test'
  })
])
  .then(a => console.log(a))
  .catch(e => console.error(e))
```

## Commands
For usage of any command you need to provide `commandOptions` as a first argument.
``` javascript
const commandOptions = {
  privateKeys: [''], // Array of private keys in hex format
  creatorAccountId: '', // Account id, ex. admin@test
  quorum: 1,
  commandService: null,
  timeoutLimit: 5000 // Set timeout limit
}
```

- [x] [addAssetQuantity](https://iroha.readthedocs.io/en/latest/api/commands.html#add-asset-quantity)
- [x] [addPeer](https://iroha.readthedocs.io/en/latest/api/commands.html#add-peer)
- [x] [addSignatory](https://iroha.readthedocs.io/en/latest/api/commands.html#add-signatory)
- [x] [appendRole](https://iroha.readthedocs.io/en/latest/api/commands.html#append-role)
- [x] [createAccount](https://iroha.readthedocs.io/en/latest/api/commands.html#create-account)
- [x] [createAsset](https://iroha.readthedocs.io/en/latest/api/commands.html#create-asset)
- [x] [createDomain](https://iroha.readthedocs.io/en/latest/api/commands.html#create-domain)
- [x] [createRole](https://iroha.readthedocs.io/en/latest/api/commands.html#create-role)
- [x] [detachRole](https://iroha.readthedocs.io/en/latest/api/commands.html#detach-role)
- [x] [grantPermission](https://iroha.readthedocs.io/en/latest/api/commands.html#grant-permission)
- [x] [removeSignatory](https://iroha.readthedocs.io/en/latest/api/commands.html#remove-signatory)
- [x] [revokePermission](https://iroha.readthedocs.io/en/latest/api/commands.html#revoke-permission)
- [x] [setAccountDetail](https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-detail)
- [x] [setAccountQuorum](https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-quorum)
- [x] [substractAssetQuantity](https://iroha.readthedocs.io/en/latest/api/commands.html#subtract-asset-quantity)
- [x] [transferAsset](https://iroha.readthedocs.io/en/latest/api/commands.html#transfer-asset)

## Queries
For usage of any query you need to provide `queryOptions` as a first argument.
``` javascript
const queryOptions = {
  privateKey: '', // Private key in hex format
  creatorAccountId: '', // Account id, ex. admin@test
  queryService: null,
  timeoutLimit: 5000 // Set timeout limit
}
```

- [x] [getAccount](https://iroha.readthedocs.io/en/latest/api/queries.html#get-account)
- [x] [getSignatories](https://iroha.readthedocs.io/en/latest/api/queries.html#get-signatories)
- [x] [getTransactions](https://iroha.readthedocs.io/en/latest/api/queries.html#get-transactions)
- [x] [getPendingTransactions](https://iroha.readthedocs.io/en/latest/api/queries.html#get-pending-transactions)
- [x] [getAccountTransactions](https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-transactions)
- [x] [getAccountAssetTransactions](https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-asset-transactions)
- [x] [getAccountAssets](https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-assets)
- [x] [getAccountDetail](https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-detail)
- [x] [getAssetInfo](https://iroha.readthedocs.io/en/latest/api/queries.html#get-asset-info)
- [x] [getRoles](https://iroha.readthedocs.io/en/latest/api/queries.html#get-roles)
- [x] [getRolePermissions](https://iroha.readthedocs.io/en/latest/api/queries.html#get-role-permissions)
- [x] [getBlock](https://iroha.readthedocs.io/en/latest/api/queries.html#get-block)

## Known issues
 - Please be careful: API might and WILL change.

## TODO
 - [ ] Field validation
 - [ ] Add tests
 - [ ] Integration tests with Iroha
 - [ ] Add more documentation
 - [ ] Minify/Uglify
