import { Buffer } from 'buffer'
import { sha3_256 as sha3 } from 'js-sha3'
import cloneDeep from 'lodash.clonedeep'
import { Signature, AccountDetailRecordId } from './proto/primitive_pb'
import * as Queries from './proto/queries_pb'
import { capitalize } from './util.js'
import cryptoHelper from './cryptoHelper'

const emptyQuery = () => new Queries.Query()

const emptyBlocksQuery = () => new Queries.BlocksQuery()

/**
 * Returns payload from the query or a new one
 * @param {Object} query
 */
const getOrCreatePayload = query => query.hasPayload()
  ? cloneDeep(query.getPayload())
  : new Queries.Query.Payload()

/**
 * Returns new query with added command.
 * @param {Object} query base query
 * @param {stringing} queryName name of a query. For reference, visit http://iroha.readthedocs.io/en/latest/develop/api/queries.html
 * @param {Object} params query parameters. For reference, visit http://iroha.readthedocs.io/en/latest/develop/api/queries.html
 */
const addQuery = (query, queryName, params = {}) => {
  const payloadQuery = new Queries[capitalize(queryName)]()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const [key, value] of Object.entries<any>(params)) {
    const capitalizedKeyName = `set${capitalize(key)}`
    if (capitalizedKeyName === 'setPaginationMeta') {
      let paginationMeta = null
      if (queryName === 'getAccountDetail') {
        const firstRecordId = new AccountDetailRecordId()
        firstRecordId.setKey(value.firstRecordId.key)
        firstRecordId.setWriter(value.firstRecordId.writer)
        paginationMeta = new Queries.AccountDetailPaginationMeta()
        paginationMeta.setPageSize(value.pageSize)
        paginationMeta.setFirstRecordId(firstRecordId)
      } else {
        const queryOrder = new Queries.Ordering()
        queryOrder.setSequenceList([value.ordering.field, value.ordering.direction])
        paginationMeta = new Queries.TxPaginationMeta()
        paginationMeta.setPageSize(value.pageSize)
        paginationMeta.setFirstTxHash(value.firstTxHash)
        paginationMeta.setOrdering(queryOrder)
      }

      payloadQuery[capitalizedKeyName](paginationMeta)
    } else {
      payloadQuery[capitalizedKeyName](value)
    }
  }

  const payload = getOrCreatePayload(query)
  payload['set' + capitalize(queryName)](payloadQuery)

  const queryWithQuery = cloneDeep(query)
  queryWithQuery.setPayload(payload)

  return queryWithQuery
}

/**
 * Returns new query with meta information
 * @param {Object} query base query
 * @param {Object} meta - meta info
 * @param {stringing} meta.creatorAccountId accountID of query's creator
 * @param {Number} meta.createdTime time of query creation
 * @param {Number} meta.queryCounter query counter (will be removed soon)
 */
const addMeta = (query, { creatorAccountId, createdTime = Date.now(), queryCounter = 1 }) => {
  const meta = new Queries.QueryPayloadMeta()
  meta.setCreatorAccountId(creatorAccountId)
  meta.setCreatedTime(createdTime)
  meta.setQueryCounter(queryCounter)

  const queryWithMeta = cloneDeep(query)
  if (query instanceof Queries.Query) {
    const payload = getOrCreatePayload(query)
    payload.setMeta(meta)

    queryWithMeta.setPayload(payload)
  } else if (query instanceof Queries.BlocksQuery) {
    queryWithMeta.setMeta(meta)
  } else {
    throw new Error('Unknown query type')
  }

  return queryWithMeta
}

/**
 * Returns new signed query
 * @param {Object} query base query
 * @param {stringing} privateKeyHex - private key of query's creator in hex.
 */
const sign = (query, privateKeyHex) => {
  const privateKey = Buffer.from(privateKeyHex, 'hex')
  const publicKey = cryptoHelper.derivePublicKey(privateKeyHex)

  let payload = null
  if (query instanceof Queries.Query) {
    payload = query.getPayload()
  } else if (query instanceof Queries.BlocksQuery) {
    payload = query.getMeta()
  } else {
    throw new Error('Unknown query type')
  }

  const payloadHash = Buffer.from(sha3.array(payload.serializeBinary()))

  const signatory = cryptoHelper.sign(payloadHash, publicKey, privateKey)

  const s = new Signature()
  s.setPublicKey(publicKey.toString('hex'))
  s.setSignature(signatory.toString('hex'))

  const signedQueryWithSignature = cloneDeep(query)
  signedQueryWithSignature.setSignature(s)

  return signedQueryWithSignature
}

export default {
  sign,
  addMeta,
  addQuery,
  emptyQuery,
  emptyBlocksQuery
}
