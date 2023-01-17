import {
  AccountId,
  AssetDefinitionId,
  AssetId,
  DomainId,
  EvaluatesToIdBox,
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
    destination_id: EvaluatesToIdBox({
      expression: Expression(
        'Raw',
        Value(
          'Id',
          IdBox(
            'AssetId',
            AssetId({
              account_id: AccountId({
                name: 'alice',
                domain_id: DomainId({
                  name: 'wonderland',
                }),
              }),
              definition_id: AssetDefinitionId({
                name: 'time',
                domain_id: DomainId({ name: 'looking_glass' }),
              }),
            }),
          ),
        ),
      ),
    }),
  }),
)
