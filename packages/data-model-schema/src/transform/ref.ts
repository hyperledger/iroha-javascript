import camelcase from 'camelcase'
import { pipe } from 'fp-ts/function'
import { Set } from 'immutable'
import invariant from 'tiny-invariant'
import { P, match } from 'ts-pattern'
import Debug from '../debug'

const debug = Debug.extend('transform-ref')

const CACHE = new Map<string, string>()

function transform(ref: string): string {
  return pipe(ref, rawSchemaIdentifierToTree, transformTree, treeToFinalIdentifier)
}

function transformWithCache(ref: string): string {
  if (CACHE.has(ref)) return CACHE.get(ref)!
  const transformed = transform(ref)
  CACHE.set(ref, transformed)
  debug('transform %o to %o', ref, transformed)
  return transformed
}

export { transformWithCache as transform }

const IGNORE_TYPES = Set<string>([
  // any ints
  ...[3, 4, 5, 6, 7]
    .map((power) => 2 ** power)
    .map((bits) => [`i${bits}`, `u${bits}`])
    .flat(),
  'String',
  'Bool',
  'Vec<u8>',
])

export function filter(ref: string): boolean {
  if (IGNORE_TYPES.has(ref)) return false

  return match(rawSchemaIdentifierToTree(ref))
    .with({ id: 'HashOf', items: [P.any] }, () => false)
    .with({ id: 'EvaluatesTo', items: [P.any] }, () => false)
    .with({ id: 'bool' }, () => false)
    .otherwise(() => true)
}

interface Tree {
  id: string
  items: Tree[]
}

function rawSchemaIdentifierToTree(src: string): Tree {
  const ROOT = '__root__'
  const stack: Tree[] = [{ id: ROOT, items: [] }]

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

function transformTree(tree: Tree): Tree {
  return (
    match<Tree, Tree>(tree)
      .with({ id: 'EvaluatesTo' }, () => ({ id: 'Expression', items: [] }))
      .with({ id: 'Array', items: [P.select('inner'), { id: P.select('len'), items: [] }] }, ({ inner, len }) => {
        if (Number.isNaN(Number(len))) throw new Error(`Invalid array len: ${len}`)
        return { id: 'Array', items: [transformTree(inner), { id: `L_${len}`, items: [] }] }
      })
      // .with({ id: 'Fixed', items: [{ id: 'i64', items: [] }] }, () => ({ id: 'FixedI64', items: [] }))
      .with({ id: 'String', items: [] }, () => ({ id: 'Str', items: [] }))
      .with({ id: 'GenericPredicateBox', items: [{ id: 'ValuePredicate', items: [] }] }, () => ({
        id: 'PredicateBox',
        items: [],
      }))
      .with({ id: 'SignatureOf', items: [P.any] }, () => ({ id: 'Signature', items: [] }))
      .with({ id: 'SortedVec', items: [{ id: 'SignaturesOf', items: [P.any] }] }, () => ({
        id: 'SortedSignatures',
        items: [],
      }))
      .with({ id: 'SignaturesOf', items: [P.any] }, () => ({ id: 'SortedSignatures', items: [] }))
      .with({ id: 'HashOf', items: [P.any] }, () => ({ id: 'Hash', items: [] }))
      .with({ id: 'Compact', items: [{ id: 'u128' }] }, () => ({ id: 'Compact', items: [] }))
      .otherwise((x) => ({ id: x.id, items: x.items.map(transformTree) }))
  )
}

function treeToFinalIdentifier(root: Tree): string {
  const parts: string[] = []

  const recursion = (tree: Tree): void => {
    parts.push(tree.id)
    for (const node of tree.items ?? []) {
      recursion(node)
    }
  }

  recursion(root)

  return camelcase(parts.join('_'), { pascalCase: true })
}
