import { datamodel } from '@iroha2/data-model'
import { expect } from 'vitest'
import { clientFactory, pipelineStepDelay } from './test-util'

const { client, pre } = clientFactory()

const instructionToExecutable = (isi: datamodel.Instruction) =>
  datamodel.Executable('Instructions', datamodel.VecInstruction([isi]))

const DOMAIN_ID = datamodel.DomainId({ name: 'wonderland' })

// 1. Registering 2 accounts in the domain

const registerAccountInstruction = (accountId: datamodel.AccountId) =>
  datamodel.Instruction(
    'Register',
    datamodel.RegisterBox({
      object: datamodel.EvaluatesToRegistrableBox({
        expression: datamodel.Expression(
          'Raw',
          datamodel.Value(
            'Identifiable',
            datamodel.IdentifiableBox(
              'NewAccount',
              datamodel.NewAccount({
                id: accountId,
                signatories: datamodel.VecPublicKey([]),
                metadata: datamodel.Metadata({ map: datamodel.MapNameValue(new Map()) }),
              }),
            ),
          ),
        ),
      }),
    }),
  )

const ACCOUNT_MAD_HATTER = datamodel.AccountId({ name: 'mad_hatter', domain_id: DOMAIN_ID })
const ACCOUNT_RABBIT = datamodel.AccountId({ name: 'rabbit', domain_id: DOMAIN_ID })

await Promise.all(
  [ACCOUNT_MAD_HATTER, ACCOUNT_RABBIT].map((accountId) =>
    client.submitExecutable(pre, instructionToExecutable(registerAccountInstruction(accountId))),
  ),
)

await pipelineStepDelay()

// 2. Registering `Store` asset

const registerStoreAssetInstruction = (definitionId: datamodel.AssetDefinitionId) =>
  datamodel.Instruction(
    'Register',
    datamodel.RegisterBox({
      object: datamodel.EvaluatesToRegistrableBox({
        expression: datamodel.Expression(
          'Raw',
          datamodel.Value(
            'Identifiable',
            datamodel.IdentifiableBox(
              'NewAssetDefinition',
              datamodel.NewAssetDefinition({
                id: definitionId,
                value_type: datamodel.AssetValueType('Store'),
                metadata: datamodel.Metadata({ map: datamodel.MapNameValue(new Map()) }),
                mintable: datamodel.Mintable('Not'),
              }),
            ),
          ),
        ),
      }),
    }),
  )

const ASSET_DEFINITION_ID = datamodel.AssetDefinitionId({ name: 'xor', domain_id: DOMAIN_ID })

await client.submitExecutable(pre, instructionToExecutable(registerStoreAssetInstruction(ASSET_DEFINITION_ID)))
await pipelineStepDelay()

// 3. Creating the defined asset

const createStoreAssetInstruction = (assetId: datamodel.AssetId, metadata: datamodel.MapNameValue) =>
  datamodel.Instruction(
    'Register',
    datamodel.RegisterBox({
      object: datamodel.EvaluatesToRegistrableBox({
        expression: datamodel.Expression(
          'Raw',
          datamodel.Value(
            'Identifiable',
            datamodel.IdentifiableBox(
              'Asset',
              datamodel.Asset({
                id: assetId,
                value: datamodel.AssetValue('Store', datamodel.Metadata({ map: metadata })),
              }),
            ),
          ),
        ),
      }),
    }),
  )

const ASSET_ID = datamodel.AssetId({ definition_id: ASSET_DEFINITION_ID, account_id: ACCOUNT_MAD_HATTER })

const ASSET_METADATA = datamodel.MapNameValue(
  new Map([['roses', datamodel.Value('Numeric', datamodel.NumericValue('U32', 42))]]),
)

await client.submitExecutable(pre, instructionToExecutable(createStoreAssetInstruction(ASSET_ID, ASSET_METADATA)))
await pipelineStepDelay()

// 4. Transferring asset to Rabbit

const transferStoreAssetInstruction = (
  sourceId: datamodel.AccountId,
  destinationId: datamodel.AccountId,
  assetId: datamodel.AssetId,
) => {
  const evaluatesToAccountId = (id: datamodel.AccountId) =>
    datamodel.EvaluatesToIdBox({
      expression: datamodel.Expression('Raw', datamodel.Value('Id', datamodel.IdBox('AccountId', id))),
    })

  return datamodel.Instruction(
    'Transfer',
    datamodel.TransferBox({
      source_id: evaluatesToAccountId(sourceId),
      destination_id: evaluatesToAccountId(destinationId),
      object: datamodel.EvaluatesToValue({
        expression: datamodel.Expression('Raw', datamodel.Value('Id', datamodel.IdBox('AssetId', assetId))),
      }),
    }),
  )
}

await client.submitExecutable(
  pre,
  instructionToExecutable(transferStoreAssetInstruction(ACCOUNT_MAD_HATTER, ACCOUNT_RABBIT, ASSET_ID)),
)
await pipelineStepDelay()

// 5. Checking results

const findAccountAssetsQueryBox = (accountId: datamodel.AccountId) =>
  datamodel.QueryBox(
    'FindAssetsByAccountId',
    datamodel.FindAssetsByAccountId({
      account_id: datamodel.EvaluatesToAccountId({
        expression: datamodel.Expression('Raw', datamodel.Value('Id', datamodel.IdBox('AccountId', accountId))),
      }),
    }),
  )

const result: datamodel.Asset[] = await client
  .requestWithQueryBox(pre, findAccountAssetsQueryBox(ACCOUNT_RABBIT))
  .then((x) =>
    x
      .as('Ok')
      .result.enum.as('Vec')
      .map((y) => y.enum.as('Identifiable').enum.as('Asset')),
  )

expect(result).toEqual([
  datamodel.Asset({
    id: datamodel.AssetId({ definition_id: ASSET_DEFINITION_ID, account_id: ACCOUNT_RABBIT }),
    value: datamodel.AssetValue('Store', datamodel.Metadata({ map: ASSET_METADATA })),
  }),
])
