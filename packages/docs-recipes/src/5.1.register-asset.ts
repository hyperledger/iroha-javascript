import {
  AssetDefinition,
  AssetDefinitionId,
  AssetValueType,
  DomainId,
  Expression,
  IdentifiableBox,
  InstructionBox,
  Metadata,
  Mintable,
  OptionIpfsPath,
  RegisterBox,
  SortedMapNameValue,
  Value,
} from '@iroha2/data-model'

const time = AssetDefinition({
  value_type: AssetValueType('Quantity'),
  id: AssetDefinitionId({
    name: 'time',
    domain_id: DomainId({ name: 'looking_glass' }),
  }),
  metadata: Metadata({ map: SortedMapNameValue(new Map()) }),
  mintable: Mintable('Infinitely'), // If only we could mint more time.
  logo: OptionIpfsPath('None'),
})

const register = InstructionBox(
  'Register',
  RegisterBox({
    object: Expression(
      'Raw',
      Value('Identifiable', IdentifiableBox('AssetDefinition', time)), // [!code hl]
    ),
  }),
)
