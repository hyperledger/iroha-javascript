/* eslint-disable no-console */

import grpc from '@grpc/grpc-js'
import {
  QueryService_v1Client as QueryService,
  CommandService_v1Client as CommandService
} from '../lib/proto/endpoint_grpc_pb'

import { TxBuilder, BatchBuilder } from '../lib/chain'
import queries from '../lib/queries'

const IROHA_ADDRESS = 'localhost:50051'

const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const commandService = new CommandService(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

const queryService = new QueryService(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

const firstTx = new TxBuilder()
  .createAccount({
    accountName: 'usera',
    domainId: 'test',
    publicKey: '0000000000000000000000000000000000000000000000000000000000000000'
  })
  .addMeta('admin@test', 1)
  .tx

const secondTx = new TxBuilder()
  .createAccount({
    accountName: 'userb',
    domainId: 'test',
    publicKey: '0000000000000000000000000000000000000000000000000000000000000000'
  })
  .addMeta('admin@test', 1)
  .tx

new BatchBuilder([
  firstTx,
  secondTx
])
  .setBatchMeta(0)
  .sign([adminPriv], 0)
  .sign([adminPriv], 1)
  .send(commandService)
  .then(res => console.log(res))
  .catch(err => console.error(err))

Promise.all([
  queries.getAccountTransactions({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test',
    pageSize: 10,
    firstTxHash: undefined,
    ordering: {
      field: undefined,
      direction: undefined
    },
    firstTxTime: undefined,
    lastTxTime: undefined,
    firstTxHeight: 1,
    lastTxHeight: 3
  })
])
  .then(a => console.log(a))
  .catch(e => console.error(e))
