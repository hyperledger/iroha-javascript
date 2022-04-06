import {
  Instruction,
  MintBox,
  EvaluatesToValue,
  Expression,
  Value,
  EvaluatesToIdBox,
  IdBox,
  AssetDefinitionId,
  DomainId,
} from '@iroha2/data-model'

const mint = Instruction(
  'Mint',
  MintBox({
    object: EvaluatesToValue({
      expression: Expression('Raw', Value('U32', 42)),
    }),
    destination_id: EvaluatesToIdBox({
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
