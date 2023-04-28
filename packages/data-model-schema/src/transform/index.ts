/* eslint-disable max-nested-callbacks */
import type { NamespaceDefinition, TypeDef } from '@scale-codec/definition-compiler'
import { type RustResult, variant } from '@scale-codec/definition-runtime'
import Debug from '../debug'
import { Map } from 'immutable'
import { P, match } from 'ts-pattern'
import { filter as filterRef, transform as transformRef } from './ref'
import { simplifyUnits } from './simplify-units'
import type { RustDefinitions, RustFixedPointDef, RustIntDef, RustTypeDefinitionVariant } from './types'

const debugRoot = Debug.extend('transform')
const debugFilter = debugRoot.extend('filter')
const debugEntry = debugRoot.extend('entry')

function filterRawEntry(
  value: RustTypeDefinitionVariant,
  key: string,
): value is Exclude<RustTypeDefinitionVariant, RustIntDef> {
  if (!filterRef(key)) {
    debugFilter('ignore %o: ref filter', key)
    return false
  }

  return match<typeof value, boolean>(value)
    .with({ Int: P.string }, () => {
      debugFilter('ignore %o: it is an int %o', key, value)
      return false
    })
    .otherwise(() => true)
}

function transformRustDef(
  def: Exclude<RustTypeDefinitionVariant, RustFixedPointDef | RustIntDef>,
): RustResult<TypeDef, string> {
  return match<typeof def, RustResult<TypeDef, string>>(def)
    .with({ Array: { type: 'u8', len: P.select() } }, (len) => {
      return variant('Ok', {
        t: 'bytes-array',
        len,
      })
    })
    .with({ Array: P.select() }, ({ len, type }) => {
      return variant('Ok', {
        t: 'array',
        len,
        item: transformRef(type),
      })
    })
    .with({ Map: P.select() }, ({ key, value }) => {
      return variant('Ok', {
        t: 'map',
        key: transformRef(key),
        value: transformRef(value),
      })
    })
    .with({ Struct: P.select() }, (fields) => {
      return variant('Ok', {
        t: 'struct',
        fields: fields.map(({ name, type }) => ({
          name,
          ref: transformRef(type),
        })),
      })
    })
    .with({ Enum: P.select() }, (variants) => {
      return variant('Ok', {
        t: 'enum',
        variants: variants.map(({ name, type }, i) => ({
          name,
          discriminant: i,
          ref: type && transformRef(type),
        })),
      })
    })
    .with({ Option: P.select() }, (some) => {
      return variant('Ok', {
        t: 'option',
        some: transformRef(some),
      })
    })
    .with({ Vec: P.select() }, (item) => {
      return variant('Ok', { t: 'vec', item: transformRef(item) })
    })
    .with({ Tuple: P.select() }, (items) => {
      return variant('Ok', {
        t: 'tuple',
        items: items.map(transformRef),
      })
    })
    .with(null, () => {
      return variant('Ok', { t: 'alias', ref: 'Unit' })
    })
    .with(P.string, (alias) => {
      return variant('Ok', { t: 'alias', ref: transformRef(alias) })
    })
    .exhaustive()
}

export interface FixedPointParams {
  base: string
  decimalPlaces: number
  ref: string
}

export interface TransformReturn {
  definition: NamespaceDefinition
  fixedPoints: FixedPointParams[]
}

export function transformSchema(schema: RustDefinitions): TransformReturn {
  const { definition: almostReady, fixedPoints } = Map(schema)
    .filter(filterRawEntry)
    .reduce<TransformReturn>(
      (acc, value, key) => {
        const ref = transformRef(key)

        match(value)
          .with({ FixedPoint: P.select() }, ({ base, decimal_places: decimalPlaces }) => {
            acc.fixedPoints.push({ base, ref, decimalPlaces })
          })
          .otherwise((value) => {
            const def = match(transformRustDef(value))
              .with({ tag: 'Ok' }, ({ content }) => content)
              .with({ tag: 'Err' }, ({ content }) => {
                throw new Error(content)
              })
              .exhaustive()

            debugEntry('transform %o to %o', value, def)

            acc.definition[ref] = def
          })

        return acc
      },
      { definition: {}, fixedPoints: [] },
    )

  return {
    definition: simplifyUnits(almostReady, { unitType: 'Unit' }),
    fixedPoints,
  }
}
