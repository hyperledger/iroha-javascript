import type { NamespaceDefinition } from '@scale-codec/definition-compiler'
import { expect, test } from 'vitest'
import { simplifyUnits } from './simplify-units'

test('simplifies units in enums', () => {
  const input = {
    A: { t: 'alias', ref: 'Unit' },
    B: { t: 'alias', ref: 'Str' },
    C: {
      t: 'enum',
      variants: [
        { name: 'A', ref: 'A', discriminant: 0 },
        { name: 'B', ref: 'B', discriminant: 1 },
        { name: 'C', ref: 'Unit', discriminant: 2 },
        { name: 'D', ref: 'D', discriminant: 3 },
      ],
    },
  } satisfies NamespaceDefinition

  expect(simplifyUnits(input, { unitType: 'Unit' })).toEqual({
    B: { t: 'alias', ref: 'Str' },
    C: {
      t: 'enum',
      variants: [
        { name: 'A', discriminant: 0 },
        { name: 'B', ref: 'B', discriminant: 1 },
        { name: 'C', discriminant: 2 },
        { name: 'D', ref: 'D', discriminant: 3 },
      ],
    },
  } satisfies NamespaceDefinition)
})

test('replaces unit aliases with unit type itself in different types', () => {
  const input = {
    UnitAlias: { t: 'alias', ref: 'Unit' },
    Struct: {
      t: 'struct',
      fields: [{ name: 'A', ref: 'UnitAlias' }],
    },
    // todo: add other types
  } satisfies NamespaceDefinition

  expect(simplifyUnits(input, { unitType: 'Unit' })).toMatchInlineSnapshot(`
    {
      "Struct": {
        "fields": [
          {
            "name": "A",
            "ref": "Unit",
          },
        ],
        "t": "struct",
      },
    }
  `)
})

test('resolves unit aliases chain', () => {
  expect(
    simplifyUnits(
      {
        a: { t: 'alias', ref: 'unit' },
        b: { t: 'alias', ref: 'a' },
        c: { t: 'alias', ref: 'b' },
        d: { t: 'struct', fields: [{ name: 'null', ref: 'c' }] },
      },
      { unitType: 'unit' },
    ),
  ).toEqual({
    d: { t: 'struct', fields: [{ name: 'null', ref: 'unit' }] },
  } satisfies NamespaceDefinition)
})
