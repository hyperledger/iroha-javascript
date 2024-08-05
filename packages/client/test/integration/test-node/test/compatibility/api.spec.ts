import { Torii } from '@iroha2/client'
import { datamodel, sugar } from '@iroha2/data-model'
import { beforeEach, describe, test } from 'vitest'
import {clientFactory, setupPeerTestsLifecycle} from '../util'
import { pipe } from 'fp-ts/function'
import * as allure from "allure-vitest";

setupPeerTestsLifecycle()

beforeEach(async (ctx) => {
  await allure.owner(ctx, 'dulger')
  await allure.label(ctx, 'permission', 'no_permission_required')
  await allure.label(ctx, 'sdk', 'Java Script')
})

describe('Blocks Stream API', () => {
  test('When committing 3 blocks sequentially, nothing fails', async () => {
    const { pre, client } = clientFactory()

    const stream = await Torii.listenForBlocksStream(pre, { height: datamodel.NonZeroU64(2n) })
    const closePromise = stream.ee.once('close')

    for (const assetName of ['xor', 'val', 'vat']) {
      // listening for some block
      const blockPromise = stream.ee.once('block')

      // triggering block creation
      await client.submitExecutable(
        pre,
        pipe(
          sugar.assetDefinitionId(assetName, 'wonderland'),
          (x) => sugar.identifiable.newAssetDefinition(x, datamodel.AssetValueType('Quantity')),
          sugar.instruction.register,
          sugar.executable.instructions,
        ),
      )

      // waiting for it
      await new Promise<void>((resolve, reject) => {
        closePromise.then(() => reject(new Error('The connection should not be closed within this loop')))
        blockPromise.then(() => resolve())
      })
    }

    await stream.stop()
  })
})

describe('Events API', () => {
  test('transaction-committed event is triggered after AddAsset instruction has been committed', async () => {
    const { pre, client } = clientFactory()

    const filter = sugar.filter.pipeline({
      entityKind: 'Transaction',
      statusKind: 'Committed',
    })

    // Listening

    const { ee, stop } = await Torii.listenForEvents(pre, { filter })

    const committedPromise = new Promise<void>((resolve, reject) => {
      ee.on('event', (event) => {
        if (event.enum.tag === 'Pipeline') {
          const { entity_kind, status } = event.enum.as('Pipeline')
          if (entity_kind.enum.tag === 'Transaction' && status.enum.tag === 'Committed') {
            resolve()
          }
        }
      })

      ee.on('error', () => reject(new Error('Some error')))
      ee.on('close', () => reject(new Error('Closed')))
    })

    // Triggering transaction
    await client.submitExecutable(
      pre,
      pipe(
        sugar.assetDefinitionId('xor', 'wonderland'),
        (x) => sugar.identifiable.newAssetDefinition(x, datamodel.AssetValueType('BigQuantity')),
        sugar.instruction.register,
        sugar.executable.instructions,
      ),
    )

    // Waiting for resolving
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 1_000)
      committedPromise.then(() => resolve())
    })

    // unnecessary teardown
    await stop()
  })
})
