
import flow from 'lodash/fp/flow'
import queryHelper from '../queryHelper'
import * as pbResponse from '../proto/qry_responses_pb'
import { getProtoEnumName } from '../util'

const DEFAULT_OPTIONS = {
  privateKey: '',
  creatorAccountId: '',
  queryService: null,
  timeoutLimit: 5000
}

/**
 * wrapper function of queries
 * @param {Object} queryOptions
 * @param {Object} query
 * @param {Function} onResponse
 */
function sendQuery (
  {
    privateKey,
    creatorAccountId,
    queryService,
    timeoutLimit
  } = DEFAULT_OPTIONS,
  query,
  onResponse = function (resolve, reject, responseName, response) {}
) {
  return new Promise((resolve, reject) => {
    const queryClient = queryService

    let queryToSend = flow(
      (q) => queryHelper.addMeta(q, { creatorAccountId }),
      (q) => queryHelper.sign(q, privateKey)
    )(query)

    /**
     * grpc-node hangs against unresponsive server, which possibly occur when
     * invalid node IP is set. To avoid this problem, we use timeout timer.
     * c.f. {@link https://github.com/grpc/grpc/issues/13163 Grpc issue 13163}
     */
    const timer = setTimeout(() => {
      queryClient.$channel.close()
      reject(new Error('please check IP address OR your internet connection'))
    }, timeoutLimit)

    queryClient.find(queryToSend, (err, response) => {
      clearTimeout(timer)

      if (err) {
        return reject(err)
      }

      const type = response.getResponseCase()
      const responseName = getProtoEnumName(
        pbResponse.QueryResponse.ResponseCase,
        'iroha.protocol.QueryResponse',
        type
      )

      onResponse(resolve, reject, responseName, response)
    })
  })
}

/**
 * getAccount
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-account
 */
function getAccount (queryOptions, { accountId }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccount',
      {
        accountId
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ACCOUNT_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ACCOUNT_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const account = response.getAccountResponse().getAccount().toObject()
      resolve(account)
    }
  )
}

/**
 * getSignatories
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-signatories
 */
function getSignatories (queryOptions, { accountId }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getSignatories',
      {
        accountId
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'SIGNATORIES_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=SIGNATORIES_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const account = response.getSignatoriesResponse().toObject().keysList
      resolve(account)
    }
  )
}

/**
 * getTransactions
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String[]} args.txHashesList
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-transactions
 */
function getTransactions (queryOptions, { txHashesList }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getTransactions',
      {
        txHashesList
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'TRANSACTIONS_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=TRANSACTIONS_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = response.getTransactionsResponse()
      resolve(transactions)
    }
  )
}

/**
 * getPendingTransactions
 * @param {Object} queryOptions
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-pending-transactions
 */
function getPendingTransactions (queryOptions) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getPendingTransactions',
      {}
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'TRANSACTIONS_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=TRANSACTIONS_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = response.getTransactionsResponse().toObject().transactionsList
      resolve(transactions)
    }
  )
}

/**
 * getRawPendingTransactions
 * @param {Object} queryOptions
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-pending-transactions
 */
function getRawPendingTransactions (queryOptions) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getPendingTransactions',
      {}
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'TRANSACTIONS_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=TRANSACTIONS_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = response.getTransactionsResponse()
      resolve(transactions)
    }
  )
}

/**
 * getAccountTransactions
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {Number} args.pageSize
 * @property {String | undefined} args.firstTxHash
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-transactions
 */
function getAccountTransactions (queryOptions, { accountId, pageSize, firstTxHash }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccountTransactions',
      {
        accountId,
        paginationMeta: {
          pageSize,
          firstTxHash
        }
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'TRANSACTIONS_PAGE_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=TRANSACTIONS_PAGE_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = response.getTransactionsPageResponse().toObject()
      resolve(transactions)
    }
  )
}

/**
 * getAccountAssetTransactions
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.assetId
 * @property {Number} args.pageSize
 * @property {String | undefined} args.firstTxHash
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-asset-transactions
 */
function getAccountAssetTransactions (queryOptions, { accountId, assetId, pageSize, firstTxHash }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'GetAccountAssetTransactions',
      {
        accountId,
        assetId,
        paginationMeta: {
          pageSize,
          firstTxHash
        }
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'TRANSACTIONS_PAGE_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=TRANSACTIONS_PAGE_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = response.getTransactionsPageResponse().toObject()
      resolve(transactions)
    }
  )
}

/**
 * getAccountAssets
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-assets
 */
function getAccountAssets (queryOptions, { accountId }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccountAssets',
      {
        accountId
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ACCOUNT_ASSETS_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ACCOUNT_ASSETS_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const assets = response.getAccountAssetsResponse().toObject().accountAssetsList
      resolve(assets)
    }
  )
}

/**
 * getAccountDetail
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.key
 * @property {String} args.writerId
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-account-detail
 */
function getAccountDetail (queryOptions, { accountId, key, writerId }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccountDetail',
      {
        accountId
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ACCOUNT_DETAIL_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ACCOUNT_DETAIL_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = JSON.parse(response.getAccountDetailResponse().toObject().detail)
      resolve(transactions)
    }
  )
}

/**
 * getAssetInfo
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {String} args.assetId
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-asset-info
 */
function getAssetInfo (queryOptions, { assetId }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAssetInfo',
      {
        assetId
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ASSET_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ASSET_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const info = response.getAssetResponse().toObject().asset
      resolve(info)
    }
  )
}

/**
 * getRoles
 * @param {Object} queryOptions
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-roles
 */
function getRoles (queryOptions) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getRoles',
      {}
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ROLES_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ROLES_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const roles = response.getRolesResponse().toObject().rolesList
      resolve(roles)
    }
  )
}

/**
 * getRolePermissions
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {Number} args.roleId
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-role-permissions
 */
function getRolePermissions (queryOptions, { roleId }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getRolePermissions',
      {
        roleId
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ROLE_PERMISSIONS_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ROLE_PERMISSIONS_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const permissions = response.getRolePermissionsResponse().toObject().permissionsList
      resolve(permissions)
    }
  )
}

/**
 * getBlock
 * @param {Object} queryOptions
 * @param {Object} args
 * @property {Number} args.height
 * @link https://iroha.readthedocs.io/en/latest/api/queries.html#get-block
 */
function getBlock (queryOptions, { height }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getBlock',
      {
        height
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'BLOCK_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=BLOCK_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const block = response.getBlockResponse()
      resolve(block)
    }
  )
}

export default {
  getAccount,
  getSignatories,
  getTransactions,
  getPendingTransactions,
  getRawPendingTransactions,
  getAccountTransactions,
  getAccountAssetTransactions,
  getAccountAssets,
  getAccountDetail,
  getAssetInfo,
  getRoles,
  getRolePermissions,
  getBlock
}
