import flow from 'lodash.flow'
import queryHelper from '../queryHelper'
import * as pbResponse from '../proto/qry_responses_pb'
import { reverseEnum } from '../util'
import validate from '../validation'

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
  // eslint-disable-next-line
  onResponse = function (resolve, reject, responseName, response) {}
) {
  return new Promise((resolve, reject) => {
    const queryClient = queryService

    const queryToSend = flow(
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
      const responseName = reverseEnum(
        pbResponse.QueryResponse.ResponseCase
      )[type]

      onResponse(resolve, reject, responseName, response)
    })
  })
}

/**
 * getAccount
 * @param {Object} queryOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-account
 */
function getAccount (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccount',
      validate(params, ['accountId'])
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
 * getRawAccount
 * @param {Object} queryOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-account
 */
function getRawAccount (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccount',
      validate(params, ['accountId'])
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ACCOUNT_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ACCOUNT_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const account = response.getAccountResponse()
      resolve(account)
    }
  )
}

/**
 * getSignatories
 * @param {Object} queryOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-signatories
 */
function getSignatories (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getSignatories',
      validate(params, ['accountId'])
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
 * @param {Object} params
 * @property {String[]} params.txHashesList
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-transactions
 */
function getTransactions (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getTransactions',
      validate(params, ['txHashesList'])
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
 * @property {Integer | undefined} params.firstTxTime
 * @property {Integer | undefined} params.lastTxTime
 * @property {Integer | undefined} params.firstTxHeight
 * @property {Integer | undefined} params.lastTxHeight
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-pending-transactions
 */
function getPendingTransactions (queryOptions, { pageSize, firstTxHash, ordering: { field, direction }, firstTxTime, lastTxTime, firstTxHeight, lastTxHeight }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getPendingTransactions',
      {
        paginationMeta: {
          pageSize,
          firstTxHash,
          ordering: {
            field,
            direction
          },
          firstTxTime,
          lastTxTime,
          firstTxHeight,
          lastTxHeight
        }
      }
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'PENDING_TRANSACTIONS_PAGE_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=PENDING_TRANSACTIONS_PAGE_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = response.getPendingTransactionsPageResponse().toObject().transactionsList
      resolve(transactions)
    }
  )
}

/**
 * getRawPendingTransactions
 * @param {Object} queryOptions
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-pending-transactions
 */
function getRawPendingTransactions (queryOptions) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getPendingTransactions'
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'PENDING_TRANSACTIONS_PAGE_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=PENDING_TRANSACTIONS_PAGE_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const transactions = response.getPendingTransactionsPageResponse()
      resolve(transactions)
    }
  )
}

/**
 * getAccountTransactions
 * @param {Object} queryOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {Number} params.pageSize
 * @property {String | undefined} params.firstTxHash
 * @property {Integer | undefined} params.firstTxTime
 * @property {Integer | undefined} params.lastTxTime
 * @property {Integer | undefined} params.firstTxHeight
 * @property {Integer | undefined} params.lastTxHeight
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-account-transactions
 */
function getAccountTransactions (queryOptions, { accountId, pageSize, firstTxHash, ordering: { field, direction }, firstTxTime, lastTxTime, firstTxHeight, lastTxHeight }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccountTransactions',
      {
        accountId,
        paginationMeta: {
          pageSize,
          firstTxHash,
          ordering: {
            field,
            direction
          },
          firstTxTime,
          lastTxTime,
          firstTxHeight,
          lastTxHeight
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
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.assetId
 * @property {Number} params.pageSize
 * @property {String | undefined} params.firstTxHash
 * @property {Integer | undefined} params.firstTxTime
 * @property {Integer | undefined} params.lastTxTime
 * @property {Integer | undefined} params.firstTxHeight
 * @property {Integer | undefined} params.lastTxHeight
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-account-asset-transactions
 */
function getAccountAssetTransactions (queryOptions, { accountId, assetId, pageSize, firstTxHash, ordering: { field, direction }, firstTxTime, lastTxTime, firstTxHeight, lastTxHeight }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccountAssetTransactions',
      {
        accountId,
        assetId,
        paginationMeta: {
          pageSize,
          firstTxHash,
          ordering: {
            field,
            direction
          },
          firstTxTime,
          lastTxTime,
          firstTxHeight,
          lastTxHeight
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
 * @param {Object} params
 * @property {String} params.accountId
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-account-assets
 */
function getAccountAssets (queryOptions, { accountId, pageSize, firstAssetId }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccountAssets',
      {
        accountId,
        paginationMeta: {
          pageSize,
          firstAssetId
        }
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
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.key
 * @property {String} params.writer
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-account-detail
 */
function getAccountDetail (queryOptions, { accountId, key, writer, pageSize, paginationWriter, paginationKey }) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAccountDetail',
      {
        accountId,
        key,
        writer,
        paginationMeta: {
          pageSize,
          firstRecordId: {
            writer: paginationWriter,
            key: paginationKey
          }
        }
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
 * @param {Object} params
 * @property {String} params.assetId
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-asset-info
 */
function getAssetInfo (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getAssetInfo',
      validate(params, ['assetId'])
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
 * getPeers
 * @param {Object} queryOptions
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-peers
 */
function getPeers (queryOptions) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getPeers'
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'PEERS_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=PEERS_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const peers = response.getPeersResponse().toObject().peersList
      resolve(peers)
    }
  )
}

/**
 * getRoles
 * @param {Object} queryOptions
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-roles
 */
function getRoles (queryOptions) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getRoles'
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
 * @param {Object} params
 * @property {Number} params.roleId
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-role-permissions
 */
function getRolePermissions (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getRolePermissions',
      validate(params, ['roleId'])
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
 * @param {Object} params
 * @property {Number} params.height
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-block
 */
function getBlock (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getBlock',
      validate(params, ['height'])
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'BLOCK_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=BLOCK_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const block = response.getBlockResponse().toObject().block.blockV1
      resolve(block)
    }
  )
}

/**
 * getEngineReceipts
 * @param {Object} queryOptions
 * @param {Object} params
 * @property {Number} params.txHash
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#get-block
 */
function getEngineReceipts (queryOptions, params) {
  return sendQuery(
    queryOptions,
    queryHelper.addQuery(
      queryHelper.emptyQuery(),
      'getEngineReceipts',
      validate(params, ['txHash'])
    ),
    (resolve, reject, responseName, response) => {
      if (responseName !== 'ENGINE_RECEIPTS_RESPONSE') {
        const error = JSON.stringify(response.toObject().errorResponse)
        return reject(new Error(`Query response error: expected=ENGINE_RECEIPTS_RESPONSE, actual=${responseName}\nReason: ${error}`))
      }

      const block = response.getEngineReceiptsResponse()
      resolve(block)
    }
  )
}

/**
 * fetchCommits
 * @param {Object} queryOptions
 * @param {Function} onBlock
 * @param {Function} onError
 * @link https://iroha.readthedocs.io/en/master/develop/api/queries.html#fetchcommits
 */
function fetchCommits (
  {
    privateKey,
    creatorAccountId,
    queryService
  } = DEFAULT_OPTIONS,
  // eslint-disable-next-line
  onBlock = function (block) {},
  // eslint-disable-next-line
  onError = function (error) {}
) {
  const query = queryHelper.emptyBlocksQuery()

  const queryToSend = flow(
    (q) => queryHelper.addMeta(q, { creatorAccountId }),
    (q) => queryHelper.sign(q, privateKey)
  )(query)

  const stream = queryService.fetchCommits(queryToSend)

  stream.on('data', (response) => {
    const type = response.getResponseCase()
    const responseName = reverseEnum(
      pbResponse.BlockQueryResponse.ResponseCase
    )[type]

    if (responseName !== 'BLOCK_RESPONSE') {
      const error = JSON.stringify(response.toObject().blockErrorResponse)
      onError(new Error(`Query response error: expected=BLOCK_RESPONSE, actual=${responseName}\nReason: ${error}`))
    } else {
      const block = response.toObject().blockResponse.block
      onBlock(block)
    }
  })
}

export default {
  getAccount,
  getRawAccount,
  getSignatories,
  getTransactions,
  getPendingTransactions,
  getRawPendingTransactions,
  getAccountTransactions,
  getAccountAssetTransactions,
  getAccountAssets,
  getAccountDetail,
  getAssetInfo,
  getPeers,
  getRoles,
  getRolePermissions,
  getBlock,
  getEngineReceipts,
  fetchCommits
}
