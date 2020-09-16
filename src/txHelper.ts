import { Buffer as BF } from 'buffer'
import { sha3_256 as sha3 } from 'js-sha3'
import cloneDeep from 'lodash.clonedeep'
import * as Commands from './proto/commands_pb'
import { TxList } from './proto/endpoint_pb'
import { Signature, Peer } from './proto/primitive_pb'
import * as Transaction from './proto/transaction_pb'
import { capitalize } from './util.js'
import cryptoHelper from './cryptoHelper'

/**
 * Returns new transactions
 * @returns {Object} transaction
 */
const emptyTransaction = () => new Transaction.Transaction()

/**
 * Returns payload from the transaction or a new one
 * @param {Object} transaction
 */
const getOrCreatePayload = transaction => transaction.hasPayload()
  ? cloneDeep(transaction.getPayload())
  : new Transaction.Transaction.Payload()

/**
 * Returns reducedPayload from the payload or a new one
 * @param {Object} payload
 */
const getOrCreateReducedPayload = payload => payload.hasReducedPayload()
  ? cloneDeep(payload.getReducedPayload())
  : new Transaction.Transaction.Payload.ReducedPayload()

// TODO: Create corner cases for AddPeer, setPermission
/**
 * Returns new query with added command.
 * @param {Object} transaction base transaction
 * @param {String} commandName name of a commandName. For reference, visit http://iroha.readthedocs.io/en/latest/develop/api/commands.html
 * @param {Object} params command parameters. For reference, visit http://iroha.readthedocs.io/en/latest/develop/api/commands.html
 * @returns {Object} transaction with commands
 */
const addCommand = (transaction, commandName, params) => {
  const payloadCommand = new Commands[capitalize(commandName)]()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const [key, value] of Object.entries<any>(params)) {
    if ('set' + capitalize(key) === 'setPeer') {
      const peer = new Peer()
      peer.setAddress(value.address)
      peer.setPeerKey(value.peerKey)
      payloadCommand['set' + capitalize(key)](peer)
    } else {
      payloadCommand['set' + capitalize(key)](value)
    }
  }

  const command = new Commands.Command()

  const commandNameSetter = 'set' + capitalize(commandName)

  command[commandNameSetter](payloadCommand)

  const payload = getOrCreatePayload(transaction)
  const reducedPayload = getOrCreateReducedPayload(payload)

  reducedPayload.addCommands(command, reducedPayload.getCommandsList.length)
  payload.setReducedPayload(reducedPayload)

  const txWithCommand = cloneDeep(transaction)
  txWithCommand.setPayload(payload)

  return txWithCommand
}

/**
 * Returns new transaction with meta information
 * @param {Object} transaction base transaction
 * @param {Object} meta - meta info
 * @param {String} meta.creatorAccountId accountID of transaction's creator
 * @param {Number} meta.createdTime time of transaction creation
 * @param {Number} meta.quorum minimum amount of signatures needed to sign a transaction
 */
const addMeta = (transaction, { creatorAccountId, createdTime = Date.now(), quorum = 1 }) => {
  const payload = getOrCreatePayload(transaction)
  const reducedPayload = getOrCreateReducedPayload(payload)

  reducedPayload.setCreatorAccountId(creatorAccountId)
  reducedPayload.setCreatedTime(createdTime)
  reducedPayload.setQuorum(quorum)

  payload.setReducedPayload(reducedPayload)

  const transactionWithMeta = cloneDeep(transaction)
  transactionWithMeta.setPayload(payload)

  return transactionWithMeta
}

/**
 * Returns buffer hash of a transaction
 * @param {Object} transaction base transaction
 * @returns {Buffer} transaction hash
 */
const hash = transaction => {
  return BF.from(sha3.array(transaction.getPayload().serializeBinary()))
}

/**
 * Returns new transaction with one more signature
 * @param {Object} transaction base transaction
 * @param {String} privateKeyHex - private key of query's creator in hex.
 */
const sign = (transaction, privateKeyHex) => {
  const privateKey = BF.from(privateKeyHex, 'hex')
  const publicKey = cryptoHelper.derivePublicKey(privateKeyHex)

  const payloadHash = hash(transaction)

  const signatory = cryptoHelper.sign(payloadHash, publicKey, privateKey)

  const s = new Signature()
  s.setPublicKey(publicKey.toString('hex'))
  s.setSignature(signatory.toString('hex'))

  const signedTransactionWithSignature = cloneDeep(transaction)
  signedTransactionWithSignature.addSignatures(s, signedTransactionWithSignature.getSignaturesList.length)

  return signedTransactionWithSignature
}

/**
 * Returns array of transactions with Batch Meta in them
 * @param {Array} transactions transactions to be included in batch
 * @param {Number} type type of batch transaction, 0 for ATOMIC, 1 for ORDERED
 * @returns {Array} Transactions with all necessary fields
 */
const addBatchMeta = (transactions, type) => {
  const reducedHashes = transactions.map(tx => sha3(tx.getPayload().getReducedPayload().serializeBinary()))

  const batchMeta = new Transaction.Transaction.Payload.BatchMeta()
  batchMeta.setReducedHashesList(reducedHashes)
  batchMeta.setType(type)

  const transactionsWithBatchMeta = transactions.map(tx => {
    const transaction = cloneDeep(tx)
    const payload = getOrCreatePayload(transaction)

    payload.setBatch(batchMeta)
    transaction.setPayload(payload)

    return transaction
  })

  return transactionsWithBatchMeta
}

/**
 * Returns a TransactionList with transactions from array
 * @param {Array} transactions transactions to be included in batch
 * @returns {Object} TxList with all transactions
 */
const createTxListFromArray = (transactions) => {
  const txList = new TxList()
  txList.setTransactionsList(transactions)
  return txList
}

// TODO: Add types for commands
export default {
  addCommand,
  addMeta,
  sign,
  emptyTransaction,
  hash,
  addBatchMeta,
  createTxListFromArray
}
