import { pascal } from 'case'
import Debug from 'debug'

const dbg = Debug('iroha2-schema-transform:ref')

const CACHE = new Map<string, string>()

export function transform(ref: string): string {
  // Schema contains arrays, but on both

  if (CACHE.has(ref)) return CACHE.get(ref)!

  const output = [transformDefaultRuntimeLibAliases, transformArray, normalizeIdentifier].reduce(
    (acc, fn) => fn(acc),
    ref,
  )

  CACHE.set(ref, output)
  dbg('transform %o to %o', ref, output)

  return output
}

const STD_ALIASES: Record<string, string> = {
  String: 'Str',
}

function transformDefaultRuntimeLibAliases(ref: string): string {
  if (ref in STD_ALIASES) {
    return STD_ALIASES[ref]
  }
  if (ref.endsWith('Vec<u8>')) {
    return 'VecU8'
  }
  if (ref.match(/Compact<u128>/)) {
    return 'Compact'
  }
  return ref
}

function transformArray(ref: string): string {
  // Arrays in form [x; x] are defined as separated types too,
  // so no need to move them into additional types

  const match = ref.match(/^\[\s*(.+)\s*;\s*(\d+)\s*]$/)
  if (match) {
    const [, ty, count] = match

    return `Array_${ty}_l${count}`
  }

  return ref
}

/**
 * - Removes module paths
 * - Handles special collision cases like data::Event / pipeline::Event
 * - Transforms Map to VecTuple and Set to Vec
 * - Makes identifiers valid JS identifiers in PascalCase
 */
function normalizeIdentifier(ref: string): string {
  const randCase = ref
    .replace(/::events::data::events::(\w+)/g, '::events_data_events::Data_$1')
    .replace(/::events::time::ExecutionTime/g, '::events::ExecutionTime')
    .replace(/::time::(\w+)/g, '::time_$1')
    .replace(/::events::pipeline::Pipeline(\w+)?/g, '::events::pipeline::_$1')
    .replace(/::events::pipeline::(\w+)?/g, '::events::pipeline_$1')
    .replace(/::events::(data|pipeline|execute_trigger)::Event(Filter)?/g, '::events::$1_Event$2')
    .replace(/::metadata::Limits/g, '::MetadataLimits')
    .replace(/iroha_data_model::(account|asset|peer|trigger|domain|role)::Id/g, '$1_Id')
    .replace(/iroha_data_model::asset::DefinitionId/g, 'AssetDefinitionId')
    .replace(/iroha_data_model::(query|transaction)::Payload/g, '$1_Payload')
    .replace(/iroha_data_model::expression::If/g, 'IfExpression')
    .replace(/iroha_data_model::isi::If/g, 'IfInstruction')
    .replace(/GenericPredicateBox<.+?Predicate>/g, 'PredicateBox')
    .replace(/iroha_version::error::Error/g, 'VersionError')
    .replace(/query::(\w+)?Error/g, 'Query$1Error')
    .replace('AtomicU32Wrapper', 'U32')
    // removing module paths
    .replace(/(?:\w+::)*(\w+)/g, '$1')
    // replacing all non-word chars with underscore
    .replace(/[^\w]/g, '_')

  return pascal(randCase)
}
