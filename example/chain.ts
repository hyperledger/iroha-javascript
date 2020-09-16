/* eslint-disable no-console */

import grpc from 'grpc'
import {
  CommandService_v1Client as CommandService
} from '../lib/proto/endpoint_grpc_pb'

import { TxBuilder, BatchBuilder } from '../lib/chain'

const IROHA_ADDRESS = 'localhost:50051'

const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const commandService = new CommandService(
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
