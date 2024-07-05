import type { Schema, SchemaTypeDefinition } from '@iroha2/data-model-schema'
import { P, match } from 'ts-pattern'
import invariant from 'tiny-invariant'
import { camelCase, pascalCase } from 'change-case'
import type { Algorithm } from '@iroha2/crypto-core'

export function generate(schema: Schema): string {
  const transformed = transform(schema)
  transformed.sort((a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : 1))

  return [`import { z, core, crypto } from './prelude'`, ...transformed.map((x) => generateSingleEntry(x))].join('\n')
}

type ActualCodegenSchema = CodegenEntry[]

type CodegenEntry = { id: string } & (
  | { t: 'enum'; mode: 'explicit' | 'normal'; variants: CodegenEnumVariant[] }
  | { t: 'struct'; fields: { name: string; type: TypeIdent }[] }
  | { t: 'struct-gen'; genericsCount: number; fields: { name: string; type: CodegenGenericTypeRef }[] }
  | { t: 'tuple'; elements: TypeIdent[] }
  | { t: 'bitmap'; repr: LibCodec; masks: { name: string; mask: number }[] }
  | { t: 'alias'; to: TypeIdent }
  | { t: 'branded-alias'; to: TypeIdent }
)

type CodegenEnumVariant =
  | { t: 'unit'; tag: string; discriminant: number }
  | { t: 'with-type'; tag: string; discriminant: number; type: TypeIdent }

type CodegenGenericTypeRef = TypeIdent | { t: 'gen'; genericIndex: number }

/**
 * Identifier of a type, either a local one or from the "library"
 */
type TypeIdent =
  | { t: 'ref'; id: string; generics?: TypeIdent[]; extendSchema?: ExtendSchemaFn }
  | { t: 'lib'; id: LibCodec; generics?: TypeIdent[]; extendSchema?: ExtendSchemaFn }
  | { t: 'lit'; literal: string }

type ExtendSchemaFn = (schema: string) => string

type LibCodec =
  | 'BytesVec'
  | 'String'
  | 'U8'
  | 'U16'
  | 'U32'
  | 'U64'
  | 'U128'
  | 'NonZero'
  | 'Option'
  | 'Compact'
  | 'Vec'
  | 'Map'
  | 'Array'
  | 'Json'
  | 'Bool'
  | 'U8Array'
  | 'U16Array'

const CRYPTO_ALGORITHMS: Algorithm[] = ['ed25519', 'secp256k1', 'bls_normal', 'bls_small']

/**
 * Apply a number of transformations to the schema:
 *
 * - Remove useless aliases (e.g. `bool` -> `bool`, void types, etc),
 * - Expand some "newtype"-aliases to structs with a named field
 * - Remove integer definitions
 * - De-monomorphisation of generic containers
 * - Simplify `GenericPredicateBox` to just `PredicateBox`
 * - Replace `HashOf<T>` with `Hash`
 * - Replace `SignatureOf<T>` with `Signature`
 * - Make `BlockSubscriptionRequest` a struct, not an alias
 * - Make `Duration` a struct, not a tuple
 * - Handle stringified array definitions
 * - Expand some types to _special_ ones, such as `JsonString` and `NonZero` integers
 * - Fix `Compact<T>` to just `Compact`
 */
function transform(schema: Schema): ActualCodegenSchema {
  const items: ActualCodegenSchema = [
    ...['Register', 'Unregister'].map(
      (id): CodegenEntry => ({
        t: 'struct-gen',
        id,
        genericsCount: 1,
        fields: [{ name: 'object', type: { t: 'gen', genericIndex: 0 } }],
      }),
    ),
    ...['SetKeyValue', 'RemoveKeyValue'].map(
      (id): CodegenEntry => ({
        t: 'struct-gen',
        id,
        genericsCount: 1,
        fields: [
          { name: 'object', type: { t: 'gen', genericIndex: 0 } },
          { name: 'key', type: { t: 'lib', id: 'String' } },
          { name: 'value', type: { t: 'ref', id: 'MetadataValueBox' } },
        ],
      }),
    ),
    ...['Mint', 'Burn', 'Grant', 'Revoke'].map(
      (id): CodegenEntry => ({
        t: 'struct-gen',
        id,
        genericsCount: 2,
        fields: [
          { name: 'object', type: { t: 'gen', genericIndex: 0 } },
          { name: 'destination', type: { t: 'gen', genericIndex: 1 } },
        ],
      }),
    ),
    {
      t: 'struct-gen',
      id: 'Transfer',
      genericsCount: 3,
      fields: [
        { name: 'source', type: { t: 'gen', genericIndex: 0 } },
        { name: 'object', type: { t: 'gen', genericIndex: 1 } },
        { name: 'destination', type: { t: 'gen', genericIndex: 2 } },
      ],
    },
    {
      t: 'struct-gen',
      id: 'MetadataChanged',
      genericsCount: 1,
      fields: [
        { name: 'target', type: { t: 'gen', genericIndex: 0 } },
        { name: 'key', type: { t: 'lib', id: 'String' } },
        { name: 'value', type: { t: 'ref', id: 'MetadataValueBox' } },
      ],
    },
    // TODO: move to transform definition
    {
      t: 'struct',
      id: 'EventSubscriptionRequest',
      fields: [{ name: 'filters', type: transformIdent('Vec<EventFilterBox>') }],
    },
    {
      t: 'struct-gen',
      id: 'SemiInterval',
      genericsCount: 1,
      fields: [
        { name: 'start', type: { t: 'gen', genericIndex: 0 } },
        { name: 'limit', type: { t: 'gen', genericIndex: 0 } },
      ],
    },
  ]

  const NULL_TYPES = new Set(
    Object.entries(schema)
      .filter(([_, right]) => right === null)
      .map(([id]) => id),
  )

  const IGNORE = new Set([...NULL_TYPES, ...items.map((x) => x.id)])

  for (const [key, value] of Object.entries(schema)) {
    if (IGNORE.has(parseIdent(key).id)) continue
    items.push(...transformDefinition(key, value, NULL_TYPES))
  }

  return items
}

function transformDefinition(name: string, item: SchemaTypeDefinition, nullTypes: Set<string>): CodegenEntry[] {
  const id = transformIdent(name)

  // has been resolved to a lib type, can exclude from schema
  if (id.t === 'lib' || id.t === 'lit') return []

  return match([id, item])
    .returnType<CodegenEntry[]>()
    .with([{ generics: P.array() }, P._], () => {
      throw new Error(`don't know how to transform the definition of "${name}"`)
    })
    .with([{ id: 'Signature' }, { Struct: [{ name: 'payload', type: 'Vec<u8>' }] }], () => [
      {
        t: 'branded-alias',
        id: 'Signature',
        to: {
          ...transformIdent('Vec<u8>'),
          extendSchema: (schema) => `z.instanceof(crypto.Signature).transform(x => x.payload()).or(${schema})`,
        },
      },
    ])
    .with([{ id: 'BlockSignature' }, { Tuple: ['u64', P.string.startsWith('Signature')] }], () => [
      {
        t: 'struct',
        id: 'BlockSignature',
        fields: [
          { name: 'peer_topology_index', type: { t: 'lib', id: 'U64' } },
          { name: 'signature', type: { t: 'ref', id: 'Signature' } },
        ],
      },
    ])
    .with([{ id: 'BlockSubscriptionRequest' }, 'NonZero<u64>'], ([{ id }, type]) => {
      return [{ t: 'struct', id, fields: [{ name: 'from_block_height', type: transformIdent(type) }] }]
    })
    .with(
      [{ id: 'Duration' }, { Tuple: ['u64', 'u32'] }],
      ([
        { id },
        {
          Tuple: [secs, nanos],
        },
      ]) => [
        {
          t: 'struct',
          id,
          fields: [
            {
              name: 'secs',
              type: { t: 'lib', id: upcase(secs) },
            },
            {
              name: 'nanos',
              type: { t: 'lib', id: upcase(nanos) },
            },
          ],
        } satisfies CodegenEntry,
      ],
    )
    .with(
      [{ id: 'FetchSize' }, { Struct: [{ name: 'fetch_size' }] }],
      ([
        { id },
        {
          Struct: [{ type }],
        },
      ]) => [{ t: 'alias', id, to: transformIdent(type) }],
    )
    .with([{ id: 'Algorithm' }, { Enum: P._ }], ([{ id }, { Enum: variants }]) => {
      const variantsParsed = variants.map<CodegenEnumVariant>((x, i) => {
        invariant(x.tag === pascalCase(CRYPTO_ALGORITHMS[i]))
        invariant(!x.type)
        return { t: 'unit', tag: CRYPTO_ALGORITHMS[i], discriminant: x.discriminant }
      })

      return [
        {
          t: 'enum',
          id,
          mode: 'normal',
          variants: variantsParsed,
        },
      ]
    })
    .with([{ id: 'NonTrivial' }, 'Vec<GenericPredicateBox<QueryOutputPredicate>>'], () => [
      {
        t: 'alias',
        id: 'NonTrivial',
        to: transformIdent('Vec<PredicateBox>'),
      },
    ])
    .with([{ id: 'WasmSmartContract' }, 'Vec<u8>'], ([{ id }]) => [
      {
        t: 'struct',
        id,
        fields: [{ name: 'blob', type: { t: 'lib', id: 'BytesVec' } }],
      },
    ])
    .with([{ id: 'IpfsPath' }, 'String'], ([{ id }]) => [
      {
        t: 'branded-alias',
        id,
        to: { t: 'lib', id: 'String' },
      },
    ])
    .with(
      [
        { id: P.union('DomainId', 'PermissionId', 'TriggerId', 'RoleId').select() },
        { Struct: [{ name: 'name', type: 'Name' }] },
      ],
      (id) => [
        {
          t: 'branded-alias',
          id,
          to: { t: 'ref', id: 'Name' },
        },
      ],
    )
    .with([P._, { Struct: P._ }], ([{ id }, { Struct: fields }]) => {
      return [
        {
          t: 'struct',
          id,
          fields: fields.map((x) => ({
            name: x.name,
            type: transformIdent(x.type),
          })),
        } satisfies CodegenEntry,
      ]
    })
    .with([P._, { Enum: P._ }], ([{ id }, { Enum: variants }]) => {
      const mode = match(id)
        .returnType<(CodegenEntry & { t: 'enum' })['mode']>()
        .with(
          P.union('PredicateBox', 'QueryOutputBox', 'MetadataValueBox', 'InstructionBox', 'QueryOutputPredicate'),
          () => 'explicit',
        )
        .otherwise(() => 'normal')

      return [
        {
          t: 'enum',
          id,
          mode,
          variants: variants.map((x) =>
            match(x)
              .returnType<CodegenEnumVariant>()
              .with({ type: P.when((x) => x && nullTypes.has(x)) }, ({ discriminant, tag }) => ({
                t: 'unit',
                discriminant,
                tag,
              }))
              .with({ type: P.string }, ({ type, discriminant, tag }) => ({
                t: 'with-type',
                type: transformIdent(type),
                tag,
                discriminant,
              }))
              .otherwise(({ discriminant, tag }) => ({
                t: 'unit',
                discriminant,
                tag,
              })),
          ),
        } satisfies CodegenEntry,
      ]
    })
    .with(
      [P._, { Bitmap: { repr: 'u32' } }],
      ([
        { id },
        {
          Bitmap: { masks, repr },
        },
      ]) => [
        {
          t: 'bitmap',
          id,
          repr: upcase(repr),
          masks,
        },
      ],
    )
    .with([{ id: P.union('ChainId', 'Name') }, 'String'], ([{ id }]) => [
      {
        t: 'branded-alias',
        id,
        to: { t: 'lib', id: 'String' },
      },
    ])
    .with([P._, P.string], ([type, aliasTo]) => {
      const aliasParsed = transformIdent(aliasTo)

      if (aliasParsed.t === 'ref' && !aliasParsed.generics && aliasParsed.id === type.id)
        // it is a redundant self-alias. hard to formulate "why"... just is
        return []

      if (type.id === 'Ipv4Addr') {
        const LEN = 4

        match(aliasParsed)
          .with({ t: 'lib', id: 'U8Array', generics: [{ literal: String(LEN) }] }, () => {})
          .otherwise(() => {
            throw new Error('unexpected shape')
          })

        return [
          {
            t: 'tuple',
            id: type.id,
            elements: Array.from({ length: LEN }, () => ({ t: 'lib', id: 'U8' })),
          } satisfies CodegenEntry,
        ]
      }

      if (type.id === 'Ipv6Addr') {
        const LEN = 8

        match(aliasParsed)
          .with({ t: 'lib', id: 'U16Array', generics: [{ literal: String(LEN) }] }, () => {})
          .otherwise(() => {
            throw new Error('unexpected shape')
          })

        return [
          {
            t: 'tuple',
            id: type.id,
            elements: Array.from({ length: LEN }, () => ({ t: 'lib', id: 'U16' })),
          } satisfies CodegenEntry,
        ]
      }
      if (type.id === 'Hash') {
        return [
          {
            t: 'branded-alias',
            id: type.id,
            to: {
              ...aliasParsed,
              extendSchema: (s) => `z.instanceof(crypto.Hash).transform(x => x.payload()).or(${s})`,
            },
          },
        ]
      }

      return [
        {
          t: 'alias',
          id: type.id,
          to: aliasParsed,
        },
      ]
    })
    .otherwise((what) => {
      console.log(what)
      throw new Error(`unexpected format of type "${name}"`)
    })
}

/**
 * Single transform logic for all type names
 */
function transformIdent(id: string | Ident): TypeIdent {
  return match(typeof id === 'string' ? parseIdent(id) : id)
    .returnType<TypeIdent>()
    .with({ id: 'HashOf', items: [P.any] }, () => ({ t: 'ref', id: 'Hash' }))
    .with(
      P.union(
        { id: 'TransactionSignature', items: [] },
        { id: 'QuerySignature', items: [] },
        { id: 'SignatureOf', items: [P.any] },
      ),
      () => ({
        t: 'ref',
        id: 'Signature',
      }),
    )
    .with({ id: 'NonTrivial', items: [P._] }, () => ({
      t: 'lib',
      id: 'Vec',
      generics: [{ t: 'ref', id: 'PredicateBox' }],
    }))
    .with(
      { id: P.union('BatchedResponse', 'BatchedResponseV1'), items: [{ id: 'QueryOutputBox', items: [] }] },
      ({ id }) => ({ t: 'ref', id }),
    )
    .with({ id: 'MerkleTree', items: [{ id: 'SignedTransaction', items: [] }] }, () => transformIdent('Vec<Hash>'))
    .with({ id: 'BlockMessage', items: [] }, () => ({ t: 'ref', id: 'SignedBlock' }))
    .with({ id: P.union('SortedMap', 'Map'), items: [P._, P._] }, ({ items: [key, value] }) => ({
      t: 'lib',
      id: 'Map',
      generics: [transformIdent(key), transformIdent(value)],
    }))
    .with({ id: 'NonZero', items: [{ id: P.union('u32', 'u64').select() }] }, (int) => ({
      t: 'lib',
      id: 'NonZero',
      generics: [{ t: 'lib', id: upcase(int) }],
    }))
    .with({ id: 'Vec', items: [{ id: 'u8', items: [] }] }, () => ({ t: 'lib', id: 'BytesVec' }))
    .with({ id: P.union('SortedVec', 'Vec'), items: [P.select()] }, (item) => ({
      t: 'lib',
      id: 'Vec',
      generics: [transformIdent(item)],
    }))
    .with({ id: 'Option', items: [P.select()] }, (some) => ({
      t: 'lib',
      id: 'Option',
      generics: [transformIdent(some)],
    }))
    .with({ id: 'TimeEventFilter', items: [] }, () => ({ t: 'ref', id: 'ExecutionTime' }))
    .with({ id: 'Mismatch', items: [{ id: 'AssetValueType' }] }, () => ({ t: 'ref', id: 'AssetValueTypeMismatch' }))
    .with(
      { id: 'Transfer', items: [{ items: [] }, { items: [] }, { items: [] }] },
      ({ items: [{ id: source }, { id: object }, { id: destination }] }) => ({
        t: 'ref',
        id: 'Transfer',
        generics: [source + 'Id', object, destination + 'Id'].map((id) => transformIdent(id)),
      }),
    )
    .with(
      {
        id: P.union('Mint', 'Burn', 'Grant', 'Revoke').select('isi'),
        items: [
          { items: [], id: P.select('object') },
          { items: [], id: P.select('destination') },
        ],
      },
      ({ isi, object, destination }) => ({
        t: 'ref',
        id: isi,
        generics: [object, destination + 'Id'].map((id) => transformIdent(id)),
      }),
    )
    .with({ id: 'MetadataChanged', items: [{ id: P.select(), items: [] }] }, (id) => ({
      t: 'ref',
      id: 'MetadataChanged',
      generics: [{ t: 'ref', id }],
    }))
    .with(
      { id: P.union('SetKeyValue', 'RemoveKeyValue').select('isi'), items: [{ items: [], id: P.select('id') }] },
      ({ isi, id }) => ({
        t: 'ref',
        id: isi,
        generics: [{ t: 'ref', id }],
      }),
    )
    .with(
      {
        id: 'Register',
        items: [{ id: P.union('Domain', 'AssetDefinition', 'Account', 'Role').select('object'), items: [] }],
      },
      ({ object }) => ({
        t: 'ref',
        id: 'Register',
        generics: [{ t: 'ref', id: `New${object}` }],
      }),
    )
    .with({ id: 'Register', items: [{ id: P.select('object'), items: [] }] }, ({ object }) => ({
      t: 'ref',
      id: 'Register',
      generics: [{ t: 'ref', id: object }],
    }))
    .with({ id: 'Unregister', items: [{ id: P.select('object'), items: [] }] }, ({ object }) => ({
      t: 'ref',
      id: 'Unregister',
      generics: [{ t: 'ref', id: `${object}Id` }],
    }))
    .with({ id: 'GenericPredicateBox', items: [{ id: 'QueryOutputPredicate', items: [] }] }, () => ({
      t: 'ref',
      id: 'PredicateBox',
    }))
    .with({ id: 'EventMessage', items: [] }, () => ({ t: 'ref', id: 'EventBox' }))
    .with({ id: 'Compact' }, () => ({ t: 'lib', id: 'Compact' }))
    .with({ id: 'bool' }, () => ({ t: 'lib', id: 'Bool' }))
    .with({ id: P.union('String'), items: [] }, () => ({ t: 'lib', id: 'String' }))
    .with({ id: P.union('u8', 'u16', 'u32', 'u64', 'u128') }, ({ id }) => ({
      t: 'lib',
      id: upcase(id),
    }))
    .with({ id: 'JsonString', items: [] }, () => ({ t: 'lib', id: 'Json' }))
    .with(
      {
        id: 'Array',
        items: [
          { id: P.union('u8', 'u16').select('int'), items: [] },
          { id: P.select('len'), items: [] },
        ],
      },
      ({ int, len: lenStr }) => {
        const len = Number(lenStr)
        invariant(!Number.isNaN(len))
        return {
          t: 'lib',
          id: `${upcase(int)}Array`,
          generics: [{ t: 'lit', literal: lenStr }],
        } satisfies TypeIdent
      },
    )
    .with({ id: 'Level', items: [] }, () => ({ t: 'ref', id: 'LogLevel' }))
    .otherwise(({ id, items }) => {
      return { t: 'ref', id, generics: items.length ? items.map(transformIdent) : undefined }
    })
}

interface IdentGenerated {
  /** type-layer, `T` */
  type: string
  /** value that has type `Codec<T>` */
  codec: string
  /** Zod schema */
  schema: string
  /** typeof schema */
  typeofSchema: string
}

function generateIdent(ident: TypeIdent, params?: { removeDefault?: boolean }): IdentGenerated {
  const generated = match(ident)
    .returnType<IdentGenerated>()
    .with({ t: 'ref', generics: P.array() }, ({ id, generics }) => {
      return {
        type: id + `<${generics.map((x) => generateIdent(x).type).join(', ')}>`,
        codec: `core.lazyCodec(() => ${id}$codec(${generics.map((x) => generateIdent(x).codec).join(', ')}))`,
        schema: `z.lazy(() => ${id}$schema(${generics.map((x) => generateIdent(x).schema).join(', ')}))`,
        typeofSchema: `ReturnType<typeof ${id}$schema<${generics.map((x) => generateIdent(x).typeofSchema).join(', ')}>>`,
      }
    })
    .with({ t: 'ref' }, ({ id }) => ({
      type: id,
      codec: `core.lazyCodec(() => ${id}$codec)`,
      schema: `z.lazy(() => ${id}$schema)`,
      typeofSchema: `typeof ${id}$schema`,
    }))
    .with({ t: 'lib', generics: P.array() }, ({ id, generics }) => {
      const maybeRemoveDefault = (params?.removeDefault ?? false) && id === 'Vec' ? '.removeDefault()' : ''
      const typeGenerics = match({ id, generics })
        .with({ id: P.union('U8Array', 'U16Array'), generics: [{ t: 'lit' }] }, () => '')
        .otherwise(() => `<${generics.map((x) => generateIdent(x).type).join(', ')}>`)

      return {
        type: `core.${id}${typeGenerics}`,
        codec: `core.${id}$codec(${generics.map((x) => generateIdent(x).codec).join(', ')})`,
        schema: `core.${id}$schema(${generics.map((x) => generateIdent(x).schema).join(', ')})${maybeRemoveDefault}`,
        typeofSchema: `ReturnType<typeof core.${id}$schema<${generics.map((x) => generateIdent(x).typeofSchema).join(', ')}>>`,
      }
    })
    .with({ t: 'lib' }, ({ id }) => {
      return {
        type: `core.${id}`,
        codec: `core.${id}$codec`,
        schema: match(id)
          .with('String', () => `z.string()`)
          .with('Bool', () => `z.boolean()`)
          .otherwise(() => `core.${id}$schema`),
        typeofSchema: match(id)
          .with('String', () => `z.ZodString`)
          .with('Bool', () => `z.ZodBoolean`)
          .otherwise(() => `typeof core.${id}$schema`),
      }
    })
    .with({ t: 'lit' }, ({ literal }) => ({ type: literal, codec: literal, schema: literal, typeofSchema: literal }))
    .exhaustive()

  return {
    ...generated,
    schema: match(ident)
      .with({ extendSchema: P.not(P.nullish).select() }, (fn) => fn(generated.schema))
      .otherwise(() => generated.schema),
  }
}

function generateZodDiscriminatedUnion(variants: CodegenEnumVariant[], params?: { removeDefault?: boolean }): string {
  const options = variants.map((variant) => {
    return match(variant)
      .with(
        { t: 'with-type' },
        ({ tag, type }) => `z.object({ t: z.literal('${tag}'), value: ${generateIdent(type, params).schema} })`,
      )
      .with({ t: 'unit' }, ({ tag }) => `z.object({ t: z.literal('${tag}') })`)
      .exhaustive()
  })

  return `z.discriminatedUnion('t', [${options.join(', ')}])`
}

function generateBaseEnumCodec(variants: CodegenEnumVariant[]): string {
  const types = variants.map((variant) =>
    match(variant)
      .with({ t: 'unit' }, ({ tag }) => `${tag}: []`)
      .with({ t: 'with-type' }, ({ tag, type }) => `${tag}: [${generateIdent(type).type}]`)
      .exhaustive(),
  )
  const options = variants.map((variant) =>
    match(variant)
      .with({ t: 'unit' }, ({ tag, discriminant }) => `[${discriminant}, '${tag}']`)
      .with(
        { t: 'with-type' },
        ({ tag, discriminant, type }) => `[${discriminant}, '${tag}', ${generateIdent(type).codec}]`,
      )
      .exhaustive(),
  )
  return `core.enumCodec<{ ${types.join(', ')} }>([${options.join(', ')}])`
}

function generateDiscriminatedUnionExplicitTypes(variants: CodegenEnumVariant[]) {
  const typeInputOutput = variants
    .map((variant) =>
      match(variant)
        .with({ t: 'unit' }, ({ tag }) => `{ t: '${tag}' }`)
        .with({ t: 'with-type' }, ({ tag, type }) => ({
          output: `{ t: '${tag}', value: ${generateIdent(type).type} }`,
          input: `{ t: '${tag}', value: z.input<${generateIdent(type).typeofSchema}> }`,
        }))
        .exhaustive(),
    )
    .map((x) =>
      match(x)
        .with(P.string, (output) => ({ output, input: output }))
        .otherwise((x) => x),
    )

  const output = typeInputOutput.map((x) => x.output).join(' | ')
  const input = typeInputOutput.map((x) => x.input).join(' | ')

  return { input, output }
}

function generateParseFn(id: string) {
  return `export const ${id} = (input: z.input<typeof ${id}$schema>): ${id} => ${id}$schema.parse(input)`
}

/**
 * TODO:
 *
 * - extend signature/hash schema: z.instanceof(crypto.Hash).transform(x => x.bytes).or(actualArraySchema)
 * - tx payload: creation time default new Date; time to live default to some value; default nonce
 * - query payload:
 *   - default pagination with nones
 * - Discriminated unions: extend objects??
 * - implement conversions between ids/names via zod transform!
 * - ip adds with string inputs!
 */
function generateSingleEntry(item: CodegenEntry): string {
  return match(item)
    .returnType<string[]>()
    .with({ t: 'enum', mode: 'normal', variants: P.array({ t: 'unit' }) }, ({ id, variants }) => {
      const literals = variants.map((x) => `z.literal('${x.tag}')`)
      const zodSchema = literals.length === 1 ? literals.at(0)! : `z.union([${literals.join(', ')}])`
      return [
        `export type ${id} = z.infer<typeof ${id}$schema>`,
        generateParseFn(id),
        `export const ${id}$schema = ${zodSchema}`,
        `export const ${id}$codec: core.Codec<${id}> = ${generateBaseEnumCodec(variants)}.literalUnion()`,
      ]
    })
    .with({ t: 'enum', mode: 'normal' }, ({ variants, id }) => {
      return [
        `export type ${id} = z.infer<typeof ${id}$schema>`,
        generateParseFn(id),
        `export const ${id}$schema  = ${generateZodDiscriminatedUnion(variants)}`,
        `export const ${id}$codec: core.Codec<${id}> = ${generateBaseEnumCodec(variants)}.discriminated()`,
      ]
    })
    .with({ t: 'enum', mode: 'explicit' }, ({ id, variants }) => {
      const type = generateDiscriminatedUnionExplicitTypes(variants)
      return [
        `export type ${id} = ${type.output}`,
        generateParseFn(id),
        `type ${id}$input = ${type.input}`,
        `export const ${id}$schema: z.ZodType<${id}, z.ZodTypeDef, ${id}$input> = ${generateZodDiscriminatedUnion(variants, { removeDefault: true })}`,
        `export const ${id}$codec: core.Codec<${id}> = ${generateBaseEnumCodec(variants)}.discriminated()`,
      ]
    })
    .with({ t: 'struct' }, ({ id, fields }) => {
      const schemaFields = fields.map((x) => `${camelCase(x.name)}: ${generateIdent(x.type).schema}`).join(', ')
      const codecFields = fields.map((x) => `['${camelCase(x.name)}', ${generateIdent(x.type).codec}]`).join(', ')

      return [
        `export type ${id} = z.infer<typeof ${id}$schema>`,
        generateParseFn(id),
        `export const ${id}$schema = z.object({ ${schemaFields} })`,
        `export const ${id}$codec = core.structCodec([${codecFields}])`,
      ]
    })
    .with({ t: 'tuple' }, ({ id, elements }) => {
      const schemaElements = elements.map((x) => generateIdent(x).schema)
      const codecElements = elements.map((x) => generateIdent(x).codec)
      return [
        `export type ${id} = z.infer<typeof ${id}$schema>`,
        generateParseFn(id),
        `export const ${id}$schema = z.tuple([${schemaElements.join(', ')}])`,
        `export const ${id}$codec: core.Codec<${id}> = core.tupleCodec([${codecElements.join(', ')}])`,
      ]
    })
    .with({ t: 'bitmap' }, ({ id, masks, repr }) => {
      invariant(repr === 'U32')

      const literal = (x: string) => `z.literal('${x}')`
      const literalSchema = match(masks)
        .with([], () => {
          throw new Error('bitmask has zero masks')
        })
        .with([P._], ([{ name }]) => literal(name))
        .otherwise((twoOrMore) => `z.union([${twoOrMore.map((x) => literal(x.name)).join(', ')}])`)
      const codecMasks = masks.map(({ name, mask }) => `${name}: ${mask}`)

      return [
        `export type ${id} = z.infer<typeof ${id}$schema>`,
        generateParseFn(id),
        `const ${id}$literalSchema = ${literalSchema}`,
        `export const ${id}$schema = z.set(${id}$literalSchema).or(z.array(${id}$literalSchema).transform(arr => new Set(arr)))`,
        `export const ${id}$codec = core.bitmap<${id} extends Set<infer T> ? T : never>({ ${codecMasks.join(', ')} })`,
      ]
    })
    .with({ t: 'struct-gen' }, ({ id, genericsCount, fields }) => {
      const mapGenerics = <T>(f: (index: number) => T): Array<T> =>
        Array.from({ length: genericsCount }, (_v, i) => f(i))

      const genericsTypes = mapGenerics((i) => `T${i}`).join(', ')
      const typeFields = fields
        .map(({ name, type }) => {
          return (
            `${camelCase(name)}: ` +
            match(type)
              .with({ t: 'gen' }, ({ genericIndex }) => `T${genericIndex}`)
              .otherwise((type) => generateIdent(type).type)
          )
        })
        .join(', ')

      const zodFields = fields
        .map(({ name, type }) => {
          const schema = match(type)
            .with({ t: 'gen' }, ({ genericIndex: i }) => `t${i}`)
            .otherwise((x) => generateIdent(x).schema)
          return `${camelCase(name)}: ${schema}`
        })
        .join(', ')
      const schemaFn = `<${mapGenerics((i) => `T${i} extends z.ZodType`).join(', ')}>(${mapGenerics(
        (i) => `t${i}: T${i}`,
      ).join(', ')}) => z.object({ ${zodFields} })`

      const codecSchemaItems = fields
        .map(({ name, type }) => {
          const codec = match(type)
            .with({ t: 'gen' }, ({ genericIndex: i }) => `t${i}`)
            .otherwise((x) => generateIdent(x).codec)
          return `['${camelCase(name)}', ${codec}]`
        })
        .join(', ')
      const codecFn = `<${mapGenerics((i) => `T${i}`).join(', ')}>(${mapGenerics(
        (i) => `t${i}: core.Codec<T${i}>`,
      ).join(', ')}) => core.structCodec([${codecSchemaItems}])`

      return [
        `export interface ${id}<${genericsTypes}> { ${typeFields} }`,
        `export const ${id}$schema = ${schemaFn}`,
        `export const ${id}$codec = ${codecFn}`,
        // TODO: parse fn?
      ]
    })
    .with({ t: 'alias' }, ({ id, to }) => {
      return [
        `export type ${id} = ${generateIdent(to).type}`,
        generateParseFn(id),
        `export const ${id}$schema = ${generateIdent(to).schema}`,
        `export const ${id}$codec = ${generateIdent(to).codec}`,
      ]
    })
    .with({ t: 'branded-alias' }, ({ id, to }) => {
      return [
        `export type ${id} = z.infer<typeof ${id}$schema>`,
        generateParseFn(id),
        `export const ${id}$schema = ${generateIdent(to).schema}.brand<'${id}'>()`,
        `export const ${id}$codec = ${generateIdent(to).codec} as core.Codec<${id}>`,
      ]
    })
    .exhaustive()
    .join('\n')
}

function upcase<S extends string>(s: S): Uppercase<S> {
  return s.toUpperCase() as Uppercase<S>
}

/**
 * Structured model of an identifier, e.g. `Map<Key, Option<T>>`
 */
interface Ident {
  id: string
  items: Ident[]
}

function parseIdent(src: string): Ident {
  const ROOT = '__root__'
  const stack: Ident[] = [{ id: ROOT, items: [] }]

  for (const [token] of src.matchAll(/(<|>|[\w_]+)/gi)) {
    if (token === '<') {
      const lastItem = stack.at(-1)?.items.at(-1)
      invariant(lastItem, 'should be')
      stack.push(lastItem)
    } else if (token === '>') {
      invariant(stack.pop(), 'should be')
    } else {
      const head = stack.at(-1)
      invariant(head, 'should be')
      head.items.push({ id: token, items: [] })
    }
  }

  return match(stack)
    .with([{ id: ROOT, items: [P.select()] }], (trueRoot) => trueRoot)
    .otherwise((x) => {
      console.error('bad state:', x)
      throw new Error('Bad state')
    })
}
