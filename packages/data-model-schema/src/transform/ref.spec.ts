import { transform } from './ref'
import { describe, expect, test } from 'vitest'

describe('Refs transformation', () => {
  test.each([
    ['EvaluatesTo<Value>', 'Expression'],
    ['EvaluatesTo<Vec<Value>>', 'Expression'],
    ['Event<Map<A, B>, C>', 'EventMapABC'],
    ['Vec<u8>', 'VecU8'],
    ['Array<u32, 5>', 'ArrayU32L5'],
    ['Array<Interval<u16>, 8>', 'ArrayIntervalU16L8'],
    ['String', 'Str'],
    ['Vec<u32>', 'VecU32'],
    ['Map<AccountId, AssetId>', 'MapAccountIdAssetId'],
    ['Map<String, EvaluatesTo>', 'MapStrExpression'],
    ['SignatureOf<TransactionPayload>', 'Signature'],
    ['SignaturesOf<CommittedBlock>', 'SortedSignatures'],
    ['SortedVec<SignatureOf<CommittedBlock>>', 'SortedVecSignature'],
    ['Fixed<i64>', 'FixedI64'],
    ['Vec<GenericPredicateBox<ValuePredicate>>', 'VecPredicateBox'],
    ['GenericPredicateBox<ValuePredicate>', 'PredicateBox'],
    ['NonTrivial<GenericPredicateBox<ValuePredicate>>', 'NonTrivialPredicateBox'],
    ['HashOf<VersionedCommittedBlock>', 'Hash'],
    ['Compact<u128>', 'Compact'],
  ])('%s transformed into %s', (input, output) => {
    expect(transform(input)).toEqual(output)
  })
})
