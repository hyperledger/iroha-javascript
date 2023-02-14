import { transform } from './ref'
import { describe, expect, test } from 'vitest'

describe('Refs transformation', () => {
  test.each([
    ['iroha_crypto::Hash', 'Hash'],
    ['iroha_data_model::Vec<u8>', 'VecU8'],
    ['iroha_data_model::domain::Id', 'DomainId'],
    ['iroha_data_model::account::Id', 'AccountId'],
    ['iroha_data_model::peer::Id', 'PeerId'],
    ['iroha_data_model::role::Id', 'RoleId'],
    ['iroha_data_model::asset::Id', 'AssetId'],
    ['iroha_data_model::asset::DefinitionId', 'AssetDefinitionId'],
    ['iroha_data_model::asset::AssetDefinition', 'AssetDefinition'],
    ['iroha_data_model::trigger::Id', 'TriggerId'],
    ['iroha_data_model::events::execute_trigger::Event', 'ExecuteTriggerEvent'],
    ['iroha_data_model::events::execute_trigger::EventFilter', 'ExecuteTriggerEventFilter'],

    ['iroha_data_model::metadata::Limits', 'MetadataLimits'],

    ['iroha_data_model::expression::If', 'IfExpression'],
    ['iroha_data_model::isi::If', 'IfInstruction'],

    ['iroha_data_model::events::time::Event', 'TimeEvent'],
    ['iroha_data_model::events::time::EventFilter', 'TimeEventFilter'],
    ['iroha_data_model::events::time::Interval', 'TimeInterval'],
    ['iroha_data_model::events::time::Schedule', 'TimeSchedule'],
    ['iroha_data_model::events::time::ExecutionTime', 'ExecutionTime'],

    ['iroha_data_model::events::data::events::Event', 'DataEvent'],
    ['iroha_data_model::events::data::EventFilter', 'DataEventFilter'],
    ['iroha_data_model::query::Payload', 'QueryPayload'],
    ['iroha_data_model::transaction::Payload', 'TransactionPayload'],
    ['iroha_data_model::events::EventFilter', 'EventFilter'],
    ['iroha_data_model::events::pipeline::EntityType', 'PipelineEntityType'],
    ['iroha_data_model::events::pipeline::Event', 'PipelineEvent'],
    ['iroha_data_model::events::pipeline::EventFilter', 'PipelineEventFilter'],
    ['iroha_data_model::events::pipeline::PipelineRejectionReason', 'PipelineRejectionReason'],
    ['iroha_data_model::events::pipeline::Status', 'PipelineStatus'],

    ['pipeline::Event<pipeline::Map<A, B>, C>', 'EventMapABC'],
    ['Vec<u8>', 'VecU8'],
    ['[u32; 5]', 'ArrayU32L5'],
    ['String', 'Str'],
    ['Vec<u32>', 'VecU32'],
    ['Map<iroha_data_model::account::Id, iroha_data_model::account::AssetId>', 'MapAccountIdAssetId'],
    ['Map<String, iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>>', 'MapStringEvaluatesToValue'],
    [
      'Set<iroha_crypto::signature::SignatureOf<iroha_data_model::transaction::Payload>>',
      'SetSignatureOfTransactionPayload',
    ],
    ['Fixed<i64>', 'FixedI64'],
    ['iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>', 'EvaluatesToAccountId'],
    ['iroha_version::error::Error', 'VersionError'],
    ['iroha_core::smartcontracts::isi::query::UnsupportedVersionError', 'QueryUnsupportedVersionError'],
    ['iroha_core::smartcontracts::isi::query::Error', 'QueryError'],

    // New in RC4
    ['AtomicU32Wrapper', 'U32'],

    ['iroha_data_model::predicate::GenericPredicateBox<iroha_data_model::predicate::value::Predicate>', 'PredicateBox'],
  ])('%s transformed into %s', (input, output) => {
    expect(transform(input)).toEqual(output)
  })
})
