import txHelper from '../txHelper'
import { signWithArrayOfKeys, sendTransactions } from '../util'
import validate from '../validation'
import { CallEngine } from '../proto/commands_pb'

const DEFAULT_OPTIONS = {
  privateKeys: [''],
  creatorAccountId: '',
  quorum: 1,
  commandService: null,
  timeoutLimit: 5000
}

/**
 * wrapper function of queries
 * @param {Object} commandOptions
 * @param {Object} transactions
 */
function command (
  {
    privateKeys,
    creatorAccountId,
    quorum,
    commandService,
    timeoutLimit
  } = DEFAULT_OPTIONS,
  tx
) {
  let txToSend = txHelper.addMeta(tx, {
    creatorAccountId,
    quorum
  })

  txToSend = signWithArrayOfKeys(txToSend, privateKeys)

  const txClient = commandService

  return sendTransactions([txToSend], txClient, timeoutLimit)
}

/**
 * addAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.assetId
 * @property {Number} params.amount
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#add-asset-quantity
 */
function addAssetQuantity (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addAssetQuantity',
      validate(params, ['assetId', 'amount'])
    )
  )
}

/**
 * addPeer
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.address
 * @property {String} params.peerKey
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#add-peer
 */
function addPeer (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addPeer',
      {
        peer: validate(params, ['address', 'peerKey'])
      }
    )
  )
}

/**
 * addSignatory
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.publicKey
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#add-signatory
 */
function addSignatory (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addSignatory',
      validate(params, ['accountId', 'publicKey'])
    )
  )
}

/**
 * appendRole
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.roleName
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#append-role
 */
function appendRole (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'appendRole',
      validate(params, ['accountId', 'roleName'])
    )
  )
}

/**
 * callEngine
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.type
 * @property {String} params.caller
 * @property {String} params.callee
 * @property {String} params.input
 * @link //https://iroha.readthedocs.io/en/master/develop/api/commands.html#call-engine
 */
function callEngine (commandOptions, { type = CallEngine.EngineType.KSOLIDITY, caller, callee, input }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'callEngine',
      {
        type,
        caller,
        callee,
        input
      }
    )
  )
}

/**
 * compareAndSetAccountDetail
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.key
 * @property {String} args.value
 * @property {String} args.oldValue
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#compare-and-set-account-detail
 */
function compareAndSetAccountDetail (commandOptions, { accountId, key, value, oldValue }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'compareAndSetAccountDetail',
      {
        accountId,
        key,
        value,
        oldValue
      }
    )
  )
}

/**
 * createAccount
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountName
 * @property {String} params.domainId
 * @property {String} params.publicKey
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#create-account
 */
function createAccount (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createAccount',
      validate(params, ['accountName', 'domainId', 'publicKey'])
    )
  )
}

/**
 * createAsset
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.assetName
 * @property {String} params.domainId
 * @property {Number} params.precision
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#create-asset
 */
function createAsset (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createAsset',
      validate(params, ['assetName', 'domainId', 'precision'])
    )
  )
}

/**
 * createDomain
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.domainId
 * @property {String} params.defaultRole
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#create-domain
 */
function createDomain (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createDomain',
      validate(params, ['domainId', 'defaultRole'])
    )
  )
}

/**
 * createRole
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.roleName
 * @property {Number[]} params.permissionsList
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#create-role
 */
function createRole (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createRole',
      validate(params, ['roleName', 'permissionsList'])
    )
  )
}

/**
 * detachRole
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.roleName
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#detach-role
 */
function detachRole (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'detachRole',
      validate(params, ['accountId', 'roleName'])
    )
  )
}

/**
 * grantPermission
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.permission
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#grant-permission
 */
function grantPermission (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'grantPermission',
      validate(params, ['accountId', 'permission'])
    )
  )
}

/**
 * removeSignatory
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.publicKey
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#remove-signatory
 */
function removeSignatory (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'removeSignatory',
      validate(params, ['accountId', 'publicKey'])
    )
  )
}

/**
 * revokePermission
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.permission
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#revoke-permission
 */
function revokePermission (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'revokePermission',
      validate(params, ['accountId', 'permission'])
    )
  )
}

/**
 * setAccountDetail
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.key
 * @property {String} params.value
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#set-account-detail
 */
function setAccountDetail (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'setAccountDetail',
      validate(params, ['accountId', 'key', 'value'])
    )
  )
}

/**
 * setAccountQuorum
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {Number} params.quorum
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#set-account-quorum
 */
function setAccountQuorum (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'setAccountQuorum',
      validate(params, ['accountId', 'quorum'])
    )
  )
}

/**
 * setSettingValue
 * This command is not available for use, it was added for backward compatibility with Iroha
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.key
 * @property {String} params.value
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#set-setting-value
 */
function setSettingValue (commandOptions, params) {
  throw new Error('Command not allowed to use')
  // return command(
  //   commandOptions,
  //   txHelper.addCommand(
  //     txHelper.emptyTransaction(),
  //     'setSettingValue',
  //     validate(params, ['key', 'value'])
  //   )
  // )
}

/**
 * subtractAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.assetId
 * @property {Number} params.amount
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#subtract-asset-quantity
 */
function subtractAssetQuantity (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'subtractAssetQuantity',
      validate(params, ['assetId', 'amount'])
    )
  )
}

/**
 * transferAsset
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.srcAccountId
 * @property {String} params.destAccountId
 * @property {String} params.assetId
 * @property {String} params.description
 * @property {Number} params.amount
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#transfer-asset
 */
function transferAsset (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'transferAsset',
      validate(params, ['srcAccountId', 'destAccountId', 'assetId', 'description', 'amount'])
    )
  )
}

/**
 * removePeer
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.publicKey
 * @link https://iroha.readthedocs.io/en/master/develop/api/commands.html#remove-peer
 */
function removePeer (commandOptions, { publicKey }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'removePeer',
      {
        publicKey
      }
    )
  )
}

export default {
  addAssetQuantity,
  addPeer,
  addSignatory,
  appendRole,
  compareAndSetAccountDetail,
  callEngine,
  createAccount,
  createAsset,
  createDomain,
  createRole,
  detachRole,
  grantPermission,
  removePeer,
  removeSignatory,
  revokePermission,
  setAccountDetail,
  setAccountQuorum,
  setSettingValue,
  subtractAssetQuantity,
  transferAsset
}
