// for usage with grpc package use endpoint_grpc_pb file
import grpc from 'grpc'
import {
  QueryService_v1Client,
  CommandService_v1Client
} from '../lib/proto/endpoint_grpc_pb'

import commands from '../lib/commands'
import queries from '../lib/queries'

const IROHA_ADDRESS = 'localhost:50051'

let adminPriv =
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
    commandService
  }, {
    accountId: 'admin@test',
    key: 'jason',
    value: 'statham'
  }),
  queries.getAccount({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService
  }, {
    accountId: 'admin@test'
  }),
  queries.getAccountDetail({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService
  }, {
    accountId: 'admin@test'
  }),
  queries.getSignatories({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService
  }, {
    accountId: 'admin@test'
  }),
  queries.getRoles({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService
  }),
  queries.getAccount({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService
  }, {
    accountId: 'admin@test'
  }),
  queries.getAccountTransactions({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService
  }, {
    accountId: 'admin@test',
    pageSize: 5
  })
])
  .then(a => console.log(a))
  .catch(e => console.error(e))
