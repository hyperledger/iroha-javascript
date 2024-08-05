import { datamodel, sugar} from '@iroha2/data-model'
import { CLIENT_CONFIG } from '@iroha2/test-configuration'
import { Seq } from 'immutable'
import { expect, test, beforeEach } from 'vitest'
import { clientFactory, setupPeerTestsLifecycle } from '../util'
import { pipe } from 'fp-ts/function'
import * as allure from 'allure-vitest'

setupPeerTestsLifecycle()

beforeEach(async (ctx) =>{
  await allure.owner(ctx, "dulger");
  await allure.label(ctx, "permission", "no_permission_required");
  await allure.label(ctx, "sdk", "Java Script");
})

test('Register asset with too long type', async (ctx) => {
  await allure.allureId(ctx, "3739");
  await allure.label(ctx, "feature", "Assets");
  await allure.label(ctx, "sdk_test_id", "register_asset_with_too_long_type");
  await allure.label(ctx, "story", "Account registers an asset with too long type");

  const { client, pre, getBlocksListener } = clientFactory()
  const blocks = await getBlocksListener()

  const normalAssetDefinitionId = sugar.assetDefinitionId('xor', 'wonderland')

  let tooLongAssetName;
  let invalidAssetDefinitionId;

  await allure.step(ctx, "Creating asset with long asset name", async()=>{
    tooLongAssetName = '0'.repeat(2 ** 14)
    invalidAssetDefinitionId = sugar.assetDefinitionId(tooLongAssetName, 'wonderland')
  })

  await allure.step(ctx, "Register assets in two transactions where asset with long name should be rejected", async()=>{
    await blocks.wait(async () => {
      await Promise.all(
        // we should register these assets as separate transactions, because the invalid
        // one will be rejected
        [normalAssetDefinitionId, invalidAssetDefinitionId!].map(async (id) => {
          await client.submitExecutable(
            pre,

            pipe(
              sugar.identifiable.newAssetDefinition(id, datamodel.AssetValueType('BigQuantity')),
              sugar.instruction.register,
              sugar.executable.instructions,
            ),
          )
        }),
      )
    })
  })
  await allure.step(ctx, "Request all assets defenition and should show if normal defenition asset is registered and another one not", async()=>{
    const queryResult = await client.requestWithQueryBox(pre, sugar.find.allAssetsDefinitions())

    const existingDefinitions: datamodel.AssetDefinitionId[] = queryResult
      .as('Ok')
      .batch.enum.as('Vec')
      .map((val) => val.enum.as('Identifiable').enum.as('AssetDefinition').id)

    expect(existingDefinitions).toContainEqual(normalAssetDefinitionId)
    expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId!)
  })
})

test('Register an account with long account name', async (ctx) => {
  await allure.allureId(ctx, "4077");
  await allure.label(ctx, "feature", "Account");
  await allure.label(ctx, "sdk_test_id", "register_account_with_long_account_name");
  await allure.label(ctx, "story", "Register an account with long name");

  const { client, pre, getBlocksListener } = clientFactory()
  const blocks = await getBlocksListener()

  let normal;
  let incorrect;

  await allure.step(ctx, "Create accounts with normal length name and long length name", async() => {
    normal = sugar.accountId('bob', 'wonderland')
    incorrect = sugar.accountId('0'.repeat(2 ** 14), 'wonderland')
  })  
  await allure.step(ctx, "Register new accounts", async() => {
    await blocks.wait(async () => {
      await client.submitExecutable(
        pre,
        pipe(
          [normal!, incorrect!].map((id) => pipe(sugar.identifiable.newAccount(id, []), sugar.instruction.register)),
          sugar.executable.instructions,
        ),
      )
    })
  })
  await allure.step(ctx, "Request for all accounts and account with normal name must be created, another one not", async()=>{
  const queryResult = await client.requestWithQueryBox(pre, sugar.find.allAccounts())

  const existingAccounts: datamodel.AccountId[] = queryResult
    .as('Ok')
    .batch.enum.as('Vec')
    .map((val) => val.enum.as('Identifiable').enum.as('Account').id)

  
    expect(existingAccounts).toContainEqual(normal!)
    expect(existingAccounts).not.toContainEqual(incorrect!)
  })
})

test('Mint fixed asset', async (ctx) => {
  await allure.label(ctx, "feature", "Asset");
  await allure.label(ctx, "sdk_test_id", "mint_fixed_asset");
  await allure.label(ctx, "story", "Mint a fixed asset");

  const { client, pre, getBlocksListener } = clientFactory()
  const blocks = await getBlocksListener()

  // Creating asset by definition
  const ASSET_DEFINITION_ID = sugar.assetDefinitionId('xor', 'wonderland')

  const registerAsset = pipe(
    sugar.identifiable.newAssetDefinition(ASSET_DEFINITION_ID, datamodel.AssetValueType('Fixed'), {
      mintable: datamodel.Mintable('Infinitely'),
    }),
    sugar.instruction.register,
  )

  const DECIMAL = '512.5881'
  const mintAsset = sugar.instruction.mint(
    sugar.value.numericFixed(datamodel.FixedPointI64(DECIMAL)),
    datamodel.IdBox('AssetId', sugar.assetId(CLIENT_CONFIG.accountId, ASSET_DEFINITION_ID)),
  )

  await blocks.wait(async () => {
    await client.submitExecutable(pre, pipe([registerAsset, mintAsset], sugar.executable.instructions))
  })

  // Checking added asset via query
  const result = await client.requestWithQueryBox(pre, sugar.find.assetsByAccountId(CLIENT_CONFIG.accountId))

  // Assert
  const asset = Seq(result.as('Ok').batch.enum.as('Vec'))
    .map((x) => x.enum.as('Identifiable').enum.as('Asset'))
    .find((x) => x.id.definition_id.name === ASSET_DEFINITION_ID.name)

  expect(asset?.value).toEqual(datamodel.AssetValue('Fixed', datamodel.FixedPointI64(DECIMAL)))
})

test('Query not existing domain', async (ctx) => {
  await allure.allureId(ctx, "4076");
  await allure.label(ctx, "feature", "Domain");
  await allure.label(ctx, "sdk_test_id", "query_not_existing_domain");
  await allure.label(ctx, "story", "Query not existing domain");

  const { client, pre } = clientFactory();
  let result;

  await allure.step(ctx,"Creating query for not existing domain", async() => {
    result = await client.requestWithQueryBox(
      pre,
      pipe(
        sugar.assetId(sugar.accountId('alice', 'wonderland'), sugar.assetDefinitionId('XOR', 'wonderland')),
        sugar.find.assetById,
      )
    )
  })
  await allure.step(ctx, "Result when exist", async() => {
    expect(result!.tag === 'Err').toBe(true)
  })
  await allure.step(ctx, "Result when domain haven't been found", async() => {
    expect(result!.as('Err').enum.as('QueryFailed').enum.as('Find').enum.as('AssetDefinition').name).toBe('XOR')
  })
})
