import { describe, expect, test } from 'vitest'
import { datamodel } from '../lib'

describe('Non zero integers in the data model', () => {
  for (const INVALID_VALUE of [-5, 0]) {
    test(`When NonZeroU32 is defined with ${INVALID_VALUE}, it throws`, () => {
      expect(() => datamodel.NonZeroU32(INVALID_VALUE)).toThrowError()
    })

    test(`When NonZeroU64 is defined with ${INVALID_VALUE}, it throws`, () => {
      expect(() => datamodel.NonZeroU64(BigInt(INVALID_VALUE))).toThrowError()
    })
  }
})
