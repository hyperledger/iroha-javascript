/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { NamespaceDefinition } from '@scale-codec/definition-compiler'
import debugRoot from 'debug'
import { pascal } from 'case'

const debug = debugRoot('@iroha2/data-model:rust-refs-converter')

const STD_ALIASES: Record<string, string> = {
  String: 'Str',
}

export default class {
  #addTypes: NamespaceDefinition = {}

  public handle(ref: string): string {
    this.#parse(ref)
    return this.#convert(ref)
  }

  public get collectedTypes(): NamespaceDefinition {
    return this.#addTypes
  }

  #convert(ref: string): string {
    return [
      replaceStdAlias,
      parseArray,
      normalizeIdentifier,

      (v: string) => {
        ref !== v && debug(`ref %o converted to %o`, ref, v)
        return v
      },
    ].reduce<string>((acc, fn) => fn(acc), ref)
  }

  #parse(ref: string): void {
    for (const fn of [tryCollectBTreeSet]) {
      fn(this.#addTypes, ref)
    }
  }
}

function tryCollectBTreeSet(acc: NamespaceDefinition, ref: string): void {
  const match = ref.match(/^BTreeSet<(.+)>$/)
  if (match) {
    debug('collecting BTreeSet: %o', ref)
    acc[normalizeIdentifier(ref)] = {
      t: 'set',
      entry: normalizeIdentifier(match[1]),
    }
  }
}

function replaceStdAlias(ref: string): string {
  if (ref in STD_ALIASES) {
    return STD_ALIASES[ref]
  }
  if (ref.endsWith('Vec<u8>')) {
    return 'VecU8'
  }
  if (ref.match(/Compact\<u128\>/)) {
    return 'Compact'
  }
  return ref
}

function parseArray(ref: string): string {
  const match = ref.match(/^\[\s*(.+)\s*;\s*(\d+)\s*\]$/)
  if (match) {
    const [, ty, count] = match
    return `Array_${ty}_l${count}`
  }

  return ref
}

/**
 * - Removes module path
 * - Handles special collision cases like data::Event / pipeline::Event
 * - Makes identifiers valid JS identifiers in PascalCase
 */
function normalizeIdentifier(ref: string): string {
  const randCase = ref
    .replace(/::events::data::events::(\w+)/g, '::events_data_events::Data_$1')
    .replace(/::time::(\w+)/g, '::time_$1')
    .replace(/::events::pipeline::Pipeline(\w+)?/g, '::events::pipeline::_$1')
    .replace(/::events::pipeline::(\w+)?/g, '::events::pipeline_$1')
    .replace(/::events::(data|pipeline|execute_trigger)::Event(Filter)?/g, '::events::$1_Event$2')
    .replace(/::metadata::Limits/g, '::MetadataLimits')
    .replace(/iroha_data_model::(account|asset|peer|trigger|domain)::Id/g, '$1_Id')
    .replace(/iroha_data_model::asset::DefinitionId/g, 'AssetDefinitionId')
    .replace(/iroha_data_model::(query|transaction)::Payload/g, '$1_Payload')
    .replace(/iroha_data_model::expression::If/g, 'IfExpression')
    .replace(/iroha_data_model::isi::If/g, 'IfInstruction')
    .replace(/iroha_version::error::Error/g, 'VersionError')
    .replace(/query::(\w+)?Error/g, 'Query$1Error')
    .replace(/(?:\w+::)*(\w+)/g, '$1')
    .replace(/[^\w]/g, '_')

  return pascal(randCase)
}
