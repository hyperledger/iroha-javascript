/* eslint-disable no-console */

import grpc from 'grpc'
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import {
  QueryService_v1Client as QueryService,
  CommandService_v1Client as CommandService
} from '../lib/proto/endpoint_grpc_pb'

import { TxBuilder, BatchBuilder } from '../lib/chain'
import queries from '../lib/queries'

const IROHA_ADDRESS = 'localhost:50051'

const adminPriv =
  'f5c8a59e998d5e215881ed5f90d134acbf36fea44c06c18377131e2f5145b2db'

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
    accountName: 'user1',
    domainId: 'test',
    publicKey: '0000000000000000000000000000000000000000000000000000000000000000'
  })
  .addMeta('admin@test', 1)
  .tx

const secondTx = new TxBuilder()
  .createAccount({
    accountName: 'user2',
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
// set timestamps to correct values
const firstTxTime = new Timestamp()
firstTxTime.fromDate(new Date(1626342627382))
const lastTxTime = new Timestamp()
lastTxTime.fromDate(new Date(1626350943490))
Promise.all([
  queries.getAccountTransactions({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test',
    pageSize: 5,
    firstTxHash: null,
    firstTxTime: firstTxTime,
    lastTxTime: lastTxTime,
    firstTxHeight: null,
    lastTxHeight: null,
    ordering: {
      field: undefined,
      direction: undefined
    }
  })
])
  .then(a => console.log(a))
  .catch(e => console.error(e))
