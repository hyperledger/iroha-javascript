/**
 * This file is for Compatibility Matrix tests, which assigns specific
 * Allure context tags.
 */

import * as allure from 'allure-vitest'
import { pipe } from 'fp-ts/function'
import { describe, expect, test } from 'vitest'
import { clientFactory, setupPeerTestsLifecycle } from '../util'
import { annotateAllure } from "./util";
import { datamodel, sugar } from '@iroha2/data-model'
import { CLIENT_CONFIG } from '@iroha2/test-configuration'
import { Seq } from 'immutable'

setupPeerTestsLifecycle()

// Read Allure API: https://allurereport.org/docs/vitest-reference/
describe('Compatibility Matrix tests', () => {
  // Based on https://github.com/AlexStroke/iroha-java/blob/007a9ac55991cd8a2b519e62a10144156d9f8301/modules/client/src/test/kotlin/jp/co/soramitsu/iroha2/InstructionsTest.kt#L134
  test('Register domain', async (ctx) => {
    await annotateAllure(ctx, {
      id: 4075,
      feature: 'Domain',
      story: 'Account registers a domain',
      sdkTestId: 'register_domain',
    })

    const DOMAIN_NAME = 'new_domain_name'
    let result
    let final

    const { pre, client, getBlocksListener } = clientFactory()
    const blocks = await getBlocksListener()
    await allure.step(ctx, "Submit transaction to register a new domain", async () => {
      await blocks.wait(async () => {
        await client.submitExecutable(
          pre,
          pipe(sugar.identifiable.newDomain(DOMAIN_NAME), sugar.instruction.register, sugar.executable.instructions),
        )
      })
    })
    await allure.step(ctx, "Query domain by `FindDomainById`", async () => {
      result = await client.requestWithQueryBox(
        pre,
        datamodel.QueryBox(
          'FindDomainById',
          datamodel.FindDomainById({
            id: datamodel.Expression(
              'Raw',
              datamodel.Value('Id', datamodel.IdBox('DomainId', sugar.domainId(DOMAIN_NAME))),
            ),
          }),
        ),
      )
    })

    await allure.step(ctx, 'Ensure domain is regis', async () => {
      result!.as('Ok').batch.enum.as('Identifiable').enum.as('Domain')

      final = result!.__c[0].batch.enum.__c[0].enum.__c[0].id.name
      expect(final).toEqual(DOMAIN_NAME)
    })
  })
})

test('Register asset with a too long name', async (ctx) => {
  await annotateAllure(ctx, {
    id: 3739,
    feature: 'Assets',
    story: 'Account registers an asset with too long type',
    sdkTestId: 'register_asset_with_too_long_type',
  })

  const { client, pre, getBlocksListener } = clientFactory()
  const blocks = await getBlocksListener()

  let normalAssetDefinitionId
  let tooLongAssetName
  let invalidAssetDefinitionId

  normalAssetDefinitionId = sugar.assetDefinitionId('xor', 'wonderland')

  tooLongAssetName = '0'.repeat(2 ** 14)
  invalidAssetDefinitionId = sugar.assetDefinitionId(tooLongAssetName, 'wonderland')

  await allure.step(ctx, 'Submit a transaction registering 2 assets (valid and invalid)', async () => {
    await blocks.wait(async () => {
      await Promise.all(
        // we should register these assets as separate transactions, because the invalid
        // one will be rejected
        [normalAssetDefinitionId!, invalidAssetDefinitionId!].map(async (id) => {
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
  await allure.step(ctx, 'Ensure that only the valid one is registered', async () => {
    const queryResult = await client.requestWithQueryBox(pre, sugar.find.allAssetsDefinitions())

    const existingDefinitions: datamodel.AssetDefinitionId[] = queryResult
      .as('Ok')
      .batch.enum.as('Vec')
      .map((val) => val.enum.as('Identifiable').enum.as('AssetDefinition').id)

    expect(existingDefinitions).toContainEqual(normalAssetDefinitionId!)
    expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId!)
  })
})

test('Register an account with long account name', async (ctx) => {
  await annotateAllure(ctx, {
    id: 4077,
    feature: 'Account',
    story: 'Register an account with long name',
    sdkTestId: 'register_account_with_long_account_name',
  })

  const { client, pre, getBlocksListener } = clientFactory()
  const blocks = await getBlocksListener()

  let normal
  let incorrect

  normal = sugar.accountId('bob', 'wonderland')
  incorrect = sugar.accountId('0'.repeat(2 ** 14), 'wonderland')

  await allure.step(ctx, 'Submit a transaction registering 2 accounts (valid and invalid)', async () => {
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
  await allure.step(ctx, 'Ensure that only the valid one is registered', async () => {
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
  await annotateAllure(ctx, {
    id: 4683,
    feature: 'Asset',
    story: 'Mint a fixed asset',
    sdkTestId: 'mint_fixed_asset',
  })

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
  await annotateAllure(ctx, {
    id: 4076,
    feature: 'Domain',
    story: 'Query not existing domain',
    sdkTestId: 'query_not_existing_domain',
  })

  const { client, pre } = clientFactory()
  let result

  await allure.step(ctx, 'Submit transaction to find domain', async () => {
    result = await client.requestWithQueryBox(
      pre,
      pipe(
        sugar.assetId(sugar.accountId('alice', 'wonderland'), sugar.assetDefinitionId('XOR', 'wonderland')),
        sugar.find.assetById,
      ),
    )
  })

  await allure.step(ctx, "Ensure domain is not found", async () => {
    expect(result!.tag === 'Err').toBe(true)
    expect(result!.as('Err').enum.as('QueryFailed').enum.as('Find').enum.as('AssetDefinition').name).toBe('XOR')
  })
})
