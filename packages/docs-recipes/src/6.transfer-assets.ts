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
  NumericValue,
  TransferBox,
  Value,
} from '@iroha2/data-model'

const domainId = DomainId({
  name: 'wonderland',
})

const assetDefinitionId = AssetDefinitionId({
  name: 'time',
  domain_id: domainId,
})

const amountToTransfer = Value('Numeric', NumericValue('U32', 100))

const fromAccount = AccountId({
  name: 'alice',
  domain_id: domainId,
})

const toAccount = AccountId({
  name: 'mouse',
  domain_id: domainId,
})

const evaluatesToAssetId = (assetId: AssetId): EvaluatesToIdBox =>
  EvaluatesToIdBox({
    expression: Expression('Raw', Value('Id', IdBox('AssetId', assetId))),
  })

const transferAssetInstruction = Instruction(
  'Transfer',
  TransferBox({
    source_id: evaluatesToAssetId(
      AssetId({
        definition_id: assetDefinitionId,
        account_id: fromAccount,
      }),
    ),
    destination_id: evaluatesToAssetId(
      AssetId({
        definition_id: assetDefinitionId,
        account_id: toAccount,
      }),
    ),
    object: EvaluatesToValue({
      expression: Expression('Raw', amountToTransfer),
    }),
  }),
)
