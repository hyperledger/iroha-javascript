import {
  AssetDefinition,
  AssetValueType,
  AssetDefinitionId,
  DomainId,
  Metadata,
  VecTupleNameValue,
  RegisterBox,
  EvaluatesToIdentifiableBox,
  Expression,
  Value,
  IdentifiableBox,
  Instruction,
} from '@iroha2/data-model'

const time = AssetDefinition({
  value_type: AssetValueType('Quantity'),
  id: AssetDefinitionId({
    name: 'time',
    domain_id: DomainId({ name: 'looking_glass' }),
  }),
  metadata: Metadata({ map: VecTupleNameValue([]) }),
  mintable: false, // If only we could mint more time.
})

const register = Instruction(
  'Register',
  RegisterBox({
    object: EvaluatesToIdentifiableBox({
      expression: Expression(
        'Raw',
        Value('Identifiable', IdentifiableBox('AssetDefinition', time)),
      ),
    }),
  }),
)
