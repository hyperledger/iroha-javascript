import isEqual from 'lodash.isequal'
import isPlainObject from 'lodash.isplainobject'

import checks from './checks'

const allowEmpty = [
  'key',
  'writer'
]

const schema = {
  amount: checks.checkAmount,
  precision: checks.checkPresission,
  accountName: checks.checkAccountName,
  accountId: checks.checkAccountId,
  domainId: checks.checkDomain,
  assetId: checks.checkAssetId,
  srcAccountId: checks.checkAccountId,
  destAccountId: checks.checkAccountId,
  description: checks.checkDescription,
  quorum: checks.checkQuorum,
  assetName: checks.checkAssetName,
  roleName: checks.checkRoleName,
  defaultRole: checks.checkRoleName,
  key: checks.checkAccountDetailsKey,
  value: checks.checkAccountDetailsValue,
  oldValue: checks.checkAccountDetailsValue,
  roleId: checks.checkRoleName,
  writer: checks.checkAccountId,
  txHash: checks.checkHex,
  caller: checks.checkAccountId,

  type: checks.toImplement,
  callee: checks.toImplement,
  input: checks.toImplement,
  peerKey: checks.toImplement,
  publicKey: checks.toImplement,
  permissionsList: checks.toImplement,
  permission: checks.toImplement,
  txHashesList: checks.toImplement,
  address: checks.toImplement,
  pageSize: checks.toImplement,
  firstTxHash: checks.toImplement,
  height: checks.toImplement,
  syncingPeer: checks.toImplement
}

const compare = (a, b) => a - b

function validateParams (object, required) {
  if (!isPlainObject(object)) {
    throw new Error(
      `Expected type of arguments: object, actual: ${typeof object}`
    )
  }

  const keysSorted = {
    current: Object.keys(object).sort(compare),
    expected: required.sort(compare)
  }

  const isEquals = isEqual(keysSorted.current, keysSorted.expected)

  if (!isEquals) {
    throw new Error(
      `Expected arguments: ${keysSorted.expected}, actual: ${keysSorted.current}`
    )
  }

  const errors = required
    .map(property => {
      const validator = schema[property]

      // TODO: Create better way to handle not required arguments
      if (allowEmpty.includes(property)) {
        return [
          property,
          { isValid: true }
        ]
      }

      return [property, validator(object[property])]
    })
    .reduce((errors, pair) => {
      if (pair[1].isValid === false) {
        errors.push(
          new Error(
            `Field "${pair[0]}" (value: "${object[pair[0]]}") is incorrect\nReason: ${pair[1].reason}`
          )
        )
      }
      return errors
    }, [])

  if (errors.length) {
    throw errors
  }

  return object
}

export default validateParams
