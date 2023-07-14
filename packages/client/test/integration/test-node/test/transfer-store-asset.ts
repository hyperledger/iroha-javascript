import { datamodel, sugar } from '@iroha2/data-model'
import { expect } from 'vitest'
import { clientFactory, pipelineStepDelay } from './test-util'
import { pipe } from 'fp-ts/function'

const { client, pre } = clientFactory()

const DOMAIN_ID = sugar.domainId('wonderland')

// 1. Registering 2 accounts in the domain

const ACCOUNT_MAD_HATTER = sugar.accountId('mad_hatter', DOMAIN_ID)
const ACCOUNT_RABBIT = sugar.accountId('rabbit', DOMAIN_ID)

await client.submitExecutable(
  pre,
  sugar.executable.instructions(
    [ACCOUNT_MAD_HATTER, ACCOUNT_RABBIT].map((accountId) =>
      pipe(sugar.identifiable.newAccount(accountId, []), sugar.instruction.register),
    ),
  ),
)

await pipelineStepDelay()

// 2. Registering `Store` asset

const ASSET_DEFINITION_ID = datamodel.AssetDefinitionId({ name: 'xor', domain_id: DOMAIN_ID })

await client.submitExecutable(
  pre,
  pipe(
    sugar.identifiable.newAssetDefinition(sugar.assetDefinitionId('xor', DOMAIN_ID), datamodel.AssetValueType('Store')),
    sugar.instruction.register,
    sugar.executable.instructions,
  ),
)

await pipelineStepDelay()

// 3. Creating the defined asset

const ASSET_ID = sugar.assetId(ACCOUNT_MAD_HATTER, ASSET_DEFINITION_ID)

const ASSET_METADATA = datamodel.Metadata({
  map: datamodel.SortedMapNameValue(new Map([['roses', sugar.value.numericU32(42)]])),
})

const CREATED_ASSET = sugar.identifiable.asset(ASSET_ID, datamodel.AssetValue('Store', ASSET_METADATA))

await client.submitExecutable(pre, pipe(CREATED_ASSET, sugar.instruction.register, sugar.executable.instructions))

await pipelineStepDelay()

// 4. Transferring asset to Rabbit

await client.submitExecutable(
  pre,

  pipe(
    sugar.instruction.transfer(
      datamodel.IdBox('AccountId', ACCOUNT_MAD_HATTER),
      sugar.value.assetId(ASSET_ID),
      datamodel.IdBox('AccountId', ACCOUNT_RABBIT),
    ),
    sugar.executable.instructions,
  ),
)

await pipelineStepDelay()

// 5. Checking results

const result: datamodel.Asset[] = await client
  .requestWithQueryBox(pre, sugar.find.assetsByAccountId(ACCOUNT_RABBIT))
  .then((x) =>
    x
      .as('Ok')
      .result.enum.as('Vec')
      .map((y) => y.enum.as('Identifiable').enum.as('Asset')),
  )

expect(result).toEqual([CREATED_ASSET])
