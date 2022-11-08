import {
  AssetDefinitionId,
  DomainId,
  EvaluatesToRegistrableBox,
  EvaluatesToValue,
  Expression,
  IdBox,
  Instruction,
  MintBox,
  Value,
} from '@iroha2/data-model'

const mint = Instruction(
  'Mint',
  MintBox({
    object: EvaluatesToValue({
      expression: Expression('Raw', Value('U32', 42)),
    }),
    destination_id: EvaluatesToRegistrableBox({
      expression: Expression(
        'Raw',
        Value(
          'Id',
          IdBox(
            'AssetDefinitionId',
            AssetDefinitionId({
              name: 'roses',
              domain_id: DomainId({ name: 'wonderland' }),
            }),
          ),
        ),
      ),
    }),
  }),
)
