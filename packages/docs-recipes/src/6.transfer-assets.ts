import {
  AccountId,
  AssetDefinitionId,
  AssetId,
  DomainId,
  Expression,
  IdBox,
  InstructionBox,
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

const assetIdExpression = (assetId: AssetId): Expression =>
  Expression('Raw', Value('Id', IdBox('AssetId', assetId)))

const transferAssetInstruction = InstructionBox(
  'Transfer',
  TransferBox({
    source_id: assetIdExpression(
      AssetId({
        definition_id: assetDefinitionId,
        account_id: fromAccount,
      }),
    ),
    destination_id: assetIdExpression(
      AssetId({
        definition_id: assetDefinitionId,
        account_id: toAccount,
      }),
    ),
    object: Expression('Raw', amountToTransfer),
  }),
)
