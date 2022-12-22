import {
  AssetDefinition,
  AssetDefinitionId,
  AssetValueType,
  DomainId,
  EvaluatesToRegistrableBox,
  Expression,
  IdentifiableBox,
  Instruction,
  MapNameValue,
  Metadata,
  Mintable,
  RegisterBox,
  Value,
} from '@iroha2/data-model'

const time = AssetDefinition({
  value_type: AssetValueType('Quantity'),
  id: AssetDefinitionId({
    name: 'time',
    domain_id: DomainId({ name: 'looking_glass' }),
  }),
  metadata: Metadata({ map: MapNameValue(new Map()) }),
  mintable: Mintable('Infinitely'), // If only we could mint more time.
})

const register = Instruction(
  'Register',
  RegisterBox({
    object: EvaluatesToRegistrableBox({
      expression: Expression(
        'Raw',
        Value('Identifiable', IdentifiableBox('AssetDefinition', time)), // [!code hl]
      ),
    }),
  }),
)
