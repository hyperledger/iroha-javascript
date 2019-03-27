import txHelper from '../txHelper'
import { signWithArrayOfKeys, sendTransactions } from '../util'

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

  let txClient = commandService

  return sendTransactions([txToSend], txClient, timeoutLimit)
}

/**
 * addAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.assetId
 * @property {Number} args.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-asset-quantity
 */
function addAssetQuantity (commandOptions, { assetId, amount }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addAssetQuantity',
      {
        assetId,
        amount
      }
    )
  )
}

/**
 * addPeer
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.address
 * @property {String} args.peerKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-peer
 */
function addPeer (commandOptions, { address, peerKey }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addPeer',
      {
        peer: {
          address,
          peerKey
        }
      }
    )
  )
}

/**
 * addSignatory
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-signatory
 */
function addSignatory (commandOptions, { accountId, publicKey }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addSignatory',
      {
        accountId,
        publicKey
      }
    )
  )
}

/**
 * appendRole
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.roleName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#append-role
 */
function appendRole (commandOptions, { accountId, roleName }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'appendRole',
      {
        accountId,
        roleName
      }
    )
  )
}

/**
 * createAccount
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountName
 * @property {String} args.domainId
 * @property {String} args.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-account
 */
function createAccount (commandOptions, { accountName, domainId, publicKey }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createAccount',
      {
        accountName,
        domainId,
        publicKey
      }
    )
  )
}

/**
 * createAsset
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.assetName
 * @property {String} args.domainId
 * @property {Number} args.precision
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-asset
 */
function createAsset (commandOptions, { assetName, domainId, precision }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createAsset',
      {
        assetName,
        domainId,
        precision
      }
    )
  )
}

/**
 * createDomain
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.domainId
 * @property {String} args.defaultRole
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-domain
 */
function createDomain (commandOptions, { domainId, defaultRole }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createDomain',
      {
        domainId,
        defaultRole
      }
    )
  )
}

/**
 * createRole
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.roleName
 * @property {Number[]} args.permissionsList
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-role
 */
function createRole (commandOptions, { roleName, permissionsList }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createRole',
      {
        roleName,
        permissionsList
      }
    )
  )
}

/**
 * detachRole
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.roleName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#detach-role
 */
function detachRole (commandOptions, { accountId, roleName }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'detachRole',
      {
        accountId,
        roleName
      }
    )
  )
}

/**
 * grantPermission
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.grantablePermissionName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#grant-permission
 */
function grantPermission (commandOptions, { accountId, grantablePermissionName }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'grantPermission',
      {
        accountId,
        grantablePermissionName
      }
    )
  )
}

/**
 * removeSignatory
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#remove-signatory
 */
function removeSignatory (commandOptions, { accountId, publicKey }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'removeSignatory',
      {
        accountId,
        publicKey
      }
    )
  )
}

/**
 * revokePermission
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.grantablePermissionName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#revoke-permission
 */
function revokePermission (commandOptions, { accountId, grantablePermissionName }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'revokePermission',
      {
        accountId,
        grantablePermissionName
      }
    )
  )
}

/**
 * setAccountDetail
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.key
 * @property {String} args.value
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-detail
 */
function setAccountDetail (commandOptions, { accountId, key, value }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'setAccountDetail',
      {
        accountId,
        key,
        value
      }
    )
  )
}

/**
 * setAccountQuorum
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {Number} args.quorum
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-quorum
 */
function setAccountQuorum (commandOptions, { accountId, quorum }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'setAccountQuorum',
      {
        accountId,
        quorum
      }
    )
  )
}

/**
 * substractAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.assetId
 * @property {Number} args.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#subtract-asset-quantity
 */
function substractAssetQuantity (commandOptions, { assetId, amount }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'substractAssetQuantity',
      {
        assetId,
        amount
      }
    )
  )
}

/**
 * transferAsset
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.srcAccountId
 * @property {String} args.destAccountId
 * @property {String} args.assetId
 * @property {String} args.description
 * @property {Number} args.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#transfer-asset
 */
function transferAsset (commandOptions, { srcAccountId, destAccountId, assetId, description, amount }) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'transferAsset',
      {
        srcAccountId,
        destAccountId,
        assetId,
        description,
        amount
      }
    )
  )
}

export default {
  addAssetQuantity,
  addPeer,
  addSignatory,
  appendRole,
  createAccount,
  createAsset,
  createDomain,
  createRole,
  detachRole,
  grantPermission,
  removeSignatory,
  revokePermission,
  setAccountDetail,
  setAccountQuorum,
  substractAssetQuantity,
  transferAsset
}
