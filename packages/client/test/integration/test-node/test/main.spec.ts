import { Torii, ToriiRequirementsForTelemetry, setCrypto } from '@iroha2/client'
import { FREE_HEAP } from '@iroha2/crypto-core'
import { crypto } from '@iroha2/crypto-target-node'
import { type RustResult, Logger as ScaleLogger, datamodel, sugar, variant } from '@iroha2/data-model'
import { StartPeerReturn, cleanConfiguration, cleanSideEffects, setConfiguration, startPeer } from '@iroha2/test-peer'
import { Seq } from 'immutable'
import { afterAll, afterEach, beforeEach, describe, expect, test } from 'vitest'
import { client_config, peer_config, peer_genesis } from '../../config'
import { delay } from '../../util'
import { clientFactory, keyPair, pipelineStepDelay } from './test-util'
import { pipe } from 'fp-ts/function'

// for debugging convenience
new ScaleLogger().mount()
setCrypto(crypto)

let startedPeer: StartPeerReturn | null = null

async function killStartedPeer() {
  await startedPeer?.kill()
  startedPeer = null
}

async function waitForGenesisCommitted(pre: ToriiRequirementsForTelemetry) {
  while (true) {
    const { blocks } = await Torii.getStatus(pre)
    if (blocks >= 1) return
    await delay(250)
  }
}

// and now tests...

beforeAll(async () => {
  await clearAll()
  await prepareConfiguration()
})

beforeEach(async () => {
  await clearPeerStorage()
  startedPeer = await startPeer()
  await waitForGenesisCommitted(clientFactory().pre)
})

afterEach(async () => {
  await killStartedPeer()
})

afterAll(async () => {
  keyPair.free()
  expect(FREE_HEAP.size).toEqual(0)
})

// Actually it is already tested within `@iroha2/test-peer`
test('Peer is healthy', async () => {
  const { pre } = clientFactory()

  expect(await Torii.getHealth(pre)).toEqual(variant('Ok', null) as RustResult<null, any>)
})

test('AddAsset instruction with name length more than limit is not committed', async () => {
  const { client, pre } = clientFactory()

  const normalAssetDefinitionId = sugar.assetDefinitionId('xor', 'wonderland')

  const tooLongAssetName = '0'.repeat(2 ** 14)
  const invalidAssetDefinitionId = sugar.assetDefinitionId(tooLongAssetName, 'wonderland')

  async function register(id: datamodel.AssetDefinitionId) {
    await client.submitExecutable(
      pre,
      pipe(
        sugar.identifiable.newAssetDefinition(id, datamodel.AssetValueType('BigQuantity')),
        sugar.instruction.register,
        sugar.executable.instructions,
      ),
    )
  }

  await Promise.all([register(normalAssetDefinitionId), register(invalidAssetDefinitionId)])
  await pipelineStepDelay()

  const queryResult = await client.requestWithQueryBox(pre, datamodel.QueryBox('FindAllAssetsDefinitions', null))

  const existingDefinitions: datamodel.AssetDefinitionId[] = queryResult
    .as('Ok')
    .result.enum.as('Vec')
    .map((val) => val.enum.as('Identifiable').enum.as('AssetDefinition').id)

  expect(existingDefinitions).toContainEqual(normalAssetDefinitionId)
  expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId)
})

test('AddAccount instruction with name length more than limit is not committed', async () => {
  const { client, pre } = clientFactory()

  const normal = sugar.accountId('bob', 'wonderland')
  const incorrect = sugar.accountId('0'.repeat(2 ** 14), 'wonderland')

  await client.submitExecutable(
    pre,
    pipe(
      [normal, incorrect].map((id) => pipe(sugar.identifiable.newAccount(id, []), sugar.instruction.register)),
      sugar.executable.instructions,
    ),
  )
  await pipelineStepDelay()

  const queryResult = await client.requestWithQueryBox(pre, sugar.find.allAccounts())

  const existingAccounts: datamodel.AccountId[] = queryResult
    .as('Ok')
    .result.enum.as('Vec')
    .map((val) => val.enum.as('Identifiable').enum.as('Account').id)

  expect(existingAccounts).toContainEqual(normal)
  expect(existingAccounts).not.toContainEqual(incorrect)
})

test('Ensure properly handling of Fixed type - adding Fixed asset and querying for it later', async () => {
  const { client, pre, accountId } = clientFactory()

  // Creating asset by definition
  const ASSET_DEFINITION_ID = sugar.assetDefinitionId('xor', 'wonderland')

  await client.submitExecutable(
    pre,
    pipe(
      sugar.identifiable.newAssetDefinition(ASSET_DEFINITION_ID, datamodel.AssetValueType('Fixed'), {
        mintable: datamodel.Mintable('Infinitely'),
      }),
      sugar.instruction.register,
      sugar.executable.instructions,
    ),
  )
  await pipelineStepDelay()

  // Adding mint
  const DECIMAL = '512.5881'

  await client.submitExecutable(
    pre,
    pipe(
      sugar.instruction.mint(
        sugar.value.numericFixed(datamodel.FixedPointI64(DECIMAL)),
        datamodel.IdBox('AssetId', sugar.assetId(client_config.account as datamodel.AccountId, ASSET_DEFINITION_ID)),
      ),
      sugar.executable.instructions,
    ),
  )
  await pipelineStepDelay()

  // Checking added asset via query
  const result = await client.requestWithQueryBox(
    pre,
    sugar.find.assetsByAccountId(client_config.account as datamodel.AccountId),
  )

  // Assert
  const asset = Seq(result.as('Ok').result.enum.as('Vec'))
    .map((x) => x.enum.as('Identifiable').enum.as('Asset'))
    .find((x) => x.id.definition_id.name === ASSET_DEFINITION_ID.name)

  expect(asset?.value).toEqual(datamodel.AssetValue('Fixed', datamodel.FixedPointI64(DECIMAL)))
})

test('Registering domain', async () => {
  const { client, pre } = clientFactory()

  async function registerDomain(domainName: string) {
    await client.submitExecutable(
      pre,
      pipe(
        //
        sugar.identifiable.newDomain(domainName),
        sugar.instruction.register,
        sugar.executable.instructions,
      ),
    )
  }

  async function ensureDomainExistence(domainName: string) {
    const result = await client.requestWithQueryBox(pre, sugar.find.allDomains())

    const domain = result
      .as('Ok')
      .result.enum.as('Vec')
      .map((x) => x.enum.as('Identifiable').enum.as('Domain'))
      .find((x) => x.id.name === domainName)

    if (!domain) throw new Error('Not found')
  }

  await registerDomain('test')
  await pipelineStepDelay()
  await ensureDomainExistence('test')
})

test('When querying for not existing domain, returns FindError', async () => {
  const { client, pre } = clientFactory()

  const result = await client.requestWithQueryBox(
    pre,
    pipe(
      sugar.assetId(sugar.accountId('alice', 'wonderland'), sugar.assetDefinitionId('XOR', 'wonderland')),
      sugar.find.assetById,
    ),
  )

  expect(result.tag === 'Err').toBe(true)
  expect(result.as('Err').enum.as('Find').enum.as('AssetDefinition').name).toBe('XOR')
})

test('Multisignature', async () => {
  await import('./multisignature')
})

// Transferring Store asset is not supported
// https://github.com/hyperledger/iroha-2-docs/issues/273
// TODO rewrite test to transferring something else
test.skip('Transferring Store asset between accounts', async () => {
  await import('./transfer-store-asset')
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

// FIXME: https://github.com/hyperledger/iroha/issues/3445
//        Iroha doesn't handle this endpoint properly now
describe.skip('Setting configuration', () => {
  test('When setting correct peer configuration, there is no error', async () => {
    const { pre } = clientFactory()

    await Torii.setPeerConfig(pre, { LogLevel: 'TRACE' })
  })

  test('When setting incorrect peer log level, there is an error', async () => {
    const { pre } = clientFactory()

    await expect(Torii.setPeerConfig(pre, { LogLevel: 'TR' as any })).rejects.toThrow()
  })
})

describe('Blocks Stream API', () => {
  // Doesn't work - https://github.com/hyperledger/iroha/issues/3162
  test.skip('When committing 3 blocks sequentially, nothing fails', async () => {
    const { pre, client } = clientFactory()

    const stream = await Torii.listenForBlocksStream(pre, { height: 0n })

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
      await blockPromise
    }

    await stream.stop()
  })
})

describe('Metrics', () => {
  test('When getting metrics, everything is OK', async () => {
    const { pre } = clientFactory()

    const data = await Torii.getMetrics(pre)

    // just some line from Prometheus metrics
    expect(data).toMatch('block_height 1')
  })
})

test('status - peer uptime content check, not only type', async () => {
  const { pre } = clientFactory()

  const status = await Torii.getStatus(pre)

  expect(status).toEqual(
    expect.objectContaining({
      peers: expect.any(Number),
      blocks: expect.any(Number),
      txs_accepted: expect.any(Number),
      txs_rejected: expect.any(Number),
      uptime: expect.objectContaining({
        secs: expect.any(Number),
        nanos: expect.any(Number),
      }),
      view_changes: expect.any(Number),
    }),
  )
})
