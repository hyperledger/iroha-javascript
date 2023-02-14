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
  NumericValue,
  Value,
} from '@iroha2/data-model'

const mint = Instruction(
  'Mint',
  MintBox({
    object: EvaluatesToValue({
      expression: Expression('Raw', Value('Numeric', NumericValue('U32', 42))),
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
