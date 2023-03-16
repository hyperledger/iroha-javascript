import * as model from '@iroha2/data-model'
import { expect } from 'vitest'
import { clientFactory, pipelineStepDelay } from './test-util'

const { client, pre } = clientFactory()

const instructionToExecutable = (isi: model.Instruction) =>
  model.Executable('Instructions', model.VecInstruction([isi]))

const DOMAIN_ID = model.DomainId({ name: 'wonderland' })

// 1. Registering 2 accounts in the domain

const registerAccountInstruction = (accountId: model.AccountId) =>
  model.Instruction(
    'Register',
    model.RegisterBox({
      object: model.EvaluatesToRegistrableBox({
        expression: model.Expression(
          'Raw',
          model.Value(
            'Identifiable',
            model.IdentifiableBox(
              'NewAccount',
              model.NewAccount({
                id: accountId,
                signatories: model.VecPublicKey([]),
                metadata: model.Metadata({ map: model.MapNameValue(new Map()) }),
              }),
            ),
          ),
        ),
      }),
    }),
  )

const ACCOUNT_MAD_HATTER = model.AccountId({ name: 'mad_hatter', domain_id: DOMAIN_ID })
const ACCOUNT_RABBIT = model.AccountId({ name: 'rabbit', domain_id: DOMAIN_ID })

await Promise.all(
  [ACCOUNT_MAD_HATTER, ACCOUNT_RABBIT].map((accountId) =>
    client.submitExecutable(pre, instructionToExecutable(registerAccountInstruction(accountId))),
  ),
)

await pipelineStepDelay()

// 2. Registering `Store` asset

const registerStoreAssetInstruction = (definitionId: model.AssetDefinitionId) =>
  model.Instruction(
    'Register',
    model.RegisterBox({
      object: model.EvaluatesToRegistrableBox({
        expression: model.Expression(
          'Raw',
          model.Value(
            'Identifiable',
            model.IdentifiableBox(
              'NewAssetDefinition',
              model.NewAssetDefinition({
                id: definitionId,
                value_type: model.AssetValueType('Store'),
                metadata: model.Metadata({ map: model.MapNameValue(new Map()) }),
                mintable: model.Mintable('Not'),
              }),
            ),
          ),
        ),
      }),
    }),
  )

const ASSET_DEFINITION_ID = model.AssetDefinitionId({ name: 'xor', domain_id: DOMAIN_ID })

await client.submitExecutable(pre, instructionToExecutable(registerStoreAssetInstruction(ASSET_DEFINITION_ID)))
await pipelineStepDelay()

// 3. Creating the defined asset

const createStoreAssetInstruction = (assetId: model.AssetId, metadata: model.MapNameValue) =>
  model.Instruction(
    'Register',
    model.RegisterBox({
      object: model.EvaluatesToRegistrableBox({
        expression: model.Expression(
          'Raw',
          model.Value(
            'Identifiable',
            model.IdentifiableBox(
              'Asset',
              model.Asset({
                id: assetId,
                value: model.AssetValue('Store', model.Metadata({ map: metadata })),
              }),
            ),
          ),
        ),
      }),
    }),
  )

const ASSET_ID = model.AssetId({ definition_id: ASSET_DEFINITION_ID, account_id: ACCOUNT_MAD_HATTER })

const ASSET_METADATA = model.MapNameValue(new Map([['roses', model.Value('Numeric', model.NumericValue('U32', 42))]]))

await client.submitExecutable(pre, instructionToExecutable(createStoreAssetInstruction(ASSET_ID, ASSET_METADATA)))
await pipelineStepDelay()

// 4. Transferring asset to Rabbit

const transferStoreAssetInstruction = (
  sourceId: model.AccountId,
  destinationId: model.AccountId,
  assetId: model.AssetId,
) => {
  const evaluatesToAccountId = (id: model.AccountId) =>
    model.EvaluatesToIdBox({
      expression: model.Expression('Raw', model.Value('Id', model.IdBox('AccountId', id))),
    })

  return model.Instruction(
    'Transfer',
    model.TransferBox({
      source_id: evaluatesToAccountId(sourceId),
      destination_id: evaluatesToAccountId(destinationId),
      object: model.EvaluatesToValue({
        expression: model.Expression('Raw', model.Value('Id', model.IdBox('AssetId', assetId))),
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

const findAccountAssetsQueryBox = (accountId: model.AccountId) =>
  model.QueryBox(
    'FindAssetsByAccountId',
    model.FindAssetsByAccountId({
      account_id: model.EvaluatesToAccountId({
        expression: model.Expression('Raw', model.Value('Id', model.IdBox('AccountId', accountId))),
      }),
    }),
  )

const result: model.Asset[] = await client
  .requestWithQueryBox(pre, findAccountAssetsQueryBox(ACCOUNT_RABBIT))
  .then((x) =>
    x
      .as('Ok')
      .result.enum.as('Vec')
      .map((y) => y.enum.as('Identifiable').enum.as('Asset')),
  )

expect(result).toEqual([
  model.Asset({
    id: model.AssetId({ definition_id: ASSET_DEFINITION_ID, account_id: ACCOUNT_RABBIT }),
    value: model.AssetValue('Store', model.Metadata({ map: ASSET_METADATA })),
  }),
])
