import { expect, test } from 'vitest'
import { transformSchema } from './index'
import type { Schema } from '@iroha2/data-model-schema'

test('NonZero<u32> is handled properly', () => {
  const SCHEMA: Schema = {
    'NonZero<u32>': 'u32',
    'Option<NonZero<u32>>': {
      Option: 'NonZero<u32>',
    },
  }

  const { nonZero, definition } = transformSchema(SCHEMA)

  expect(definition).toEqual({
    OptionNonZeroU32: {
      t: 'option',
      some: 'NonZeroU32',
    },
  })
  expect(nonZero).toEqual([{ ty: 'NonZeroU32' }])
})
