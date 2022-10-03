import { afterAll, afterEach, beforeEach, describe, expect, test } from 'vitest'
import { crypto } from '@iroha2/crypto-target-node'
import {
  Client,
  Signer,
  Torii,
  ToriiRequirementsForApiHttp,
  ToriiRequirementsForTelemetry,
  setCrypto,
} from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/node'
import nodeFetch from 'node-fetch'
import {
  Account,
  AccountId,
  AssetDefinitionId,
  AssetId,
  AssetValueType,
  DomainId,
  Enum,
  EvaluatesToAccountId,
  EvaluatesToAssetId,
  EvaluatesToBool,
  EvaluatesToRegistrableBox,
  EvaluatesToValue,
  Executable,
  Expression,
  FilterBox,
  FindAssetById,
  FindAssetsByAccountId,
  IdBox,
  IdentifiableBox,
  Instruction,
  MapAssetIdAsset,
  MapNameValue,
  Metadata,
  MintBox,
  Mintable,
  NewAssetDefinition,
  NewDomain,
  OptionHash,
  OptionIpfsPath,
  OptionPipelineEntityKind,
  OptionPipelineStatusKind,
  PipelineEntityKind,
  PipelineEventFilter,
  PipelineStatusKind,
  QueryBox,
  RegisterBox,
  Result,
  Logger as ScaleLogger,
  Value,
  VecInstruction,
  VecPublicKey,
  VecRoleId,
} from '@iroha2/data-model'
import { hexToBytes } from 'hada'
import { Seq } from 'immutable'
import { StartPeerReturn, cleanConfiguration, cleanSideEffects, setConfiguration, startPeer } from '@iroha2/test-peer'
import { delay } from '../util'
import { PIPELINE_MS, client_config, peer_config, peer_genesis } from '../config'

// for debugging convenience
new ScaleLogger().mount()

// #region Keys

const multihash = crypto.createMultihashFromBytes(Uint8Array.from(hexToBytes(client_config.publicKey)))
const publicKey = crypto.createPublicKeyFromMultihash(multihash)
const privateKey = crypto.createPrivateKeyFromJsKey(client_config.privateKey)
const keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey)
;[publicKey, privateKey, multihash].forEach((x) => x.free())

// #endregion

// #region Client

setCrypto(crypto)

function clientFactory() {
  const signer = new Signer(client_config.account as AccountId, keyPair)

  const pre = { ...client_config.torii, ws: WS, fetch: nodeFetch as typeof fetch }

  const client = new Client({ signer })

  return { signer, pre, client }
}

// #endregion

async function addAsset({
  client,
  definitionId,
  opts,
  assetType,
  pre,
}: {
  client: Client
  pre: ToriiRequirementsForApiHttp
  definitionId: AssetDefinitionId
  assetType?: AssetValueType
  opts?: {
    mintable?: Mintable
  }
}) {
  await client.submitExecutable(
    pre,
    Executable(
      'Instructions',
      VecInstruction([
        Instruction(
          'Register',
          RegisterBox({
            object: EvaluatesToRegistrableBox({
              expression: Expression(
                'Raw',
                Value(
                  'Identifiable',
                  IdentifiableBox(
                    'NewAssetDefinition',
                    NewAssetDefinition({
                      id: definitionId,
                      value_type: assetType ?? Enum.variant('BigQuantity'),
                      metadata: Metadata({ map: MapNameValue(new Map()) }),
                      mintable: opts?.mintable ?? Mintable('Not'),
                    }),
                  ),
                ),
              ),
            }),
          }),
        ),
      ]),
    ),
  )
}

async function addAccount({
  client,
  accountId,
  pre,
}: {
  client: Client
  accountId: AccountId
  pre: ToriiRequirementsForApiHttp
}) {
  await client.submitExecutable(
    pre,
    Executable(
      'Instructions',
      VecInstruction([
        Instruction(
          'Register',
          RegisterBox({
            object: EvaluatesToRegistrableBox({
              expression: Expression(
                'Raw',
                Value(
                  'Identifiable',
                  IdentifiableBox(
                    'NewAccount',
                    Account({
                      id: accountId,
                      assets: MapAssetIdAsset(new Map()),
                      signature_check_condition: EvaluatesToBool({
                        expression: Expression('Raw', Value('Bool', false)),
                      }),
                      signatories: VecPublicKey([]),
                      metadata: Metadata({ map: MapNameValue(new Map()) }),
                      roles: VecRoleId([]),
                    }),
                  ),
                ),
              ),
            }),
          }),
        ),
      ]),
    ),
  )
}

function mintIntoExecutable(mint: MintBox) {
  return Executable('Instructions', VecInstruction([Instruction('Mint', mint)]))
}

async function pipelineStepDelay() {
  await delay(PIPELINE_MS * 2)
}

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

beforeEach(async () => {
  await cleanConfiguration()
  await cleanSideEffects(peer_config.KURA.BLOCK_STORE_PATH)

  // setup configs for test peer
  await setConfiguration({
    config: peer_config,
    genesis: peer_genesis,
  })

  startedPeer = await startPeer({ toriiApiURL: client_config.torii.apiURL })

  await waitForGenesisCommitted(clientFactory().pre)
})

afterEach(async () => {
  await killStartedPeer()
})

afterAll(async () => {
  await cleanConfiguration()
})

// Actually it is already tested within `@iroha2/test-peer`
test('Peer is healthy', async () => {
  const { pre } = clientFactory()

  expect(await Torii.getHealth(pre)).toEqual(Enum.variant('Ok', null) as Result<null, any>)
})

test('AddAsset instruction with name length more than limit is not committed', async () => {
  const { client, pre } = clientFactory()

  const normalAssetDefinitionId = AssetDefinitionId({
    name: 'xor',
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })
  await addAsset({ client, pre, definitionId: normalAssetDefinitionId })

  const tooLongAssetName = '0'.repeat(2 ** 14)
  const invalidAssetDefinitionId = AssetDefinitionId({
    name: tooLongAssetName,
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })
  await addAsset({ client, pre, definitionId: invalidAssetDefinitionId })

  await delay(PIPELINE_MS * 2)

  const queryResult = await client.requestWithQueryBox(pre, QueryBox('FindAllAssetsDefinitions', null))

  const existingDefinitions: AssetDefinitionId[] = queryResult
    .as('Ok')
    .result.as('Vec')
    .map((val) => val.as('Identifiable').as('AssetDefinition').id)

  expect(existingDefinitions).toContainEqual(normalAssetDefinitionId)
  expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId)
})

test('AddAccount instruction with name length more than limit is not committed', async () => {
  const { client, pre } = clientFactory()

  const normal = AccountId({
    name: 'bob',
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })
  const incorrect = AccountId({
    name: '0'.repeat(2 ** 14),
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })

  await Promise.all([normal, incorrect].map((x) => addAccount({ client, pre, accountId: x })))
  await delay(PIPELINE_MS * 2)

  const queryResult = await client.requestWithQueryBox(pre, QueryBox('FindAllAccounts', null))

  const existingAccounts: AccountId[] = queryResult
    .as('Ok')
    .result.as('Vec')
    .map((val) => val.as('Identifiable').as('Account').id)

  expect(existingAccounts).toContainEqual(normal)
  expect(existingAccounts).not.toContainEqual(incorrect)
})

test('Ensure properly handling of Fixed type - adding Fixed asset and querying for it later', async () => {
  const { client, pre } = clientFactory()

  // Creating asset by definition
  const ASSET_DEFINITION_ID = AssetDefinitionId({
    name: 'xor',
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })
  await addAsset({
    client,
    pre,
    definitionId: ASSET_DEFINITION_ID,
    assetType: AssetValueType('Fixed'),
    opts: { mintable: Mintable('Infinitely') },
  })
  await pipelineStepDelay()

  // Adding mint
  const DECIMAL = '512.5881'
  await client.submitExecutable(
    pre,
    mintIntoExecutable(
      MintBox({
        object: EvaluatesToValue({
          expression: Expression('Raw', Value('Fixed', DECIMAL)),
        }),
        destination_id: EvaluatesToRegistrableBox({
          expression: Expression(
            'Raw',
            Value(
              'Id',
              IdBox(
                'AssetId',
                AssetId({
                  account_id: client_config.account as AccountId,
                  definition_id: ASSET_DEFINITION_ID,
                }),
              ),
            ),
          ),
        }),
      }),
    ),
  )
  await pipelineStepDelay()

  // Checking added asset via query
  const result = await client.requestWithQueryBox(
    pre,
    QueryBox(
      'FindAssetsByAccountId',
      FindAssetsByAccountId({
        account_id: EvaluatesToAccountId({
          expression: Expression('Raw', Value('Id', IdBox('AccountId', client_config.account as AccountId))),
        }),
      }),
    ),
  )

  // Assert
  const asset = Seq(result.as('Ok').result.as('Vec'))
    .map((x) => x.as('Identifiable').as('Asset'))
    .find((x) => x.id.definition_id.name === ASSET_DEFINITION_ID.name)

  expect(asset).toBeTruthy()
  expect(asset!.value.is('Fixed')).toBe(true)
  expect(asset!.value.as('Fixed')).toBe(DECIMAL)
})

test('Registering domain', async () => {
  const { client, pre } = clientFactory()

  async function registerDomain(domainName: string) {
    const registerBox = RegisterBox({
      object: EvaluatesToRegistrableBox({
        expression: Expression(
          'Raw',
          Value(
            'Identifiable',
            IdentifiableBox(
              'NewDomain',
              NewDomain({
                id: DomainId({
                  name: domainName,
                }),
                metadata: Metadata({ map: MapNameValue(new Map()) }),
                logo: OptionIpfsPath('None'),
              }),
            ),
          ),
        ),
      }),
    })

    await client.submitExecutable(
      pre,
      Executable('Instructions', VecInstruction([Instruction('Register', registerBox)])),
    )
  }

  async function ensureDomainExistence(domainName: string) {
    const result = await client.requestWithQueryBox(pre, QueryBox('FindAllDomains', null))

    const domain = result
      .as('Ok')
      .result.as('Vec')
      .map((x) => x.as('Identifiable').as('Domain'))
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
    QueryBox(
      'FindAssetById',
      FindAssetById({
        id: EvaluatesToAssetId({
          expression: Expression(
            'Raw',
            Value(
              'Id',
              IdBox(
                'AssetId',
                AssetId({
                  account_id: AccountId({
                    name: 'alice',
                    domain_id: DomainId({ name: 'wonderland' }),
                  }),
                  definition_id: AccountId({
                    name: 'XOR',
                    domain_id: DomainId({ name: 'wonderland' }),
                  }),
                }),
              ),
            ),
          ),
        }),
      }),
    ),
  )

  expect(result.is('Err')).toBe(true)
  expect(result.as('Err').as('Find').as('AssetDefinition').name).toBe('XOR')
})

describe('Events API', () => {
  test('transaction-committed event is triggered after AddAsset instruction has been committed', async () => {
    const { pre, client } = clientFactory()

    const filter = FilterBox(
      'Pipeline',
      PipelineEventFilter({
        entity_kind: OptionPipelineEntityKind('Some', PipelineEntityKind('Transaction')),
        status_kind: OptionPipelineStatusKind('Some', PipelineStatusKind('Committed')),
        hash: OptionHash('None'),
      }),
    )

    // Listening

    const { ee, stop } = await Torii.listenForEvents(pre, { filter })

    const committedPromise = new Promise<void>((resolve, reject) => {
      ee.on('event', (event) => {
        if (event.is('Pipeline')) {
          const { entity_kind, status } = event.as('Pipeline')
          if (entity_kind.is('Transaction') && status.is('Committed')) {
            resolve()
          }
        }
      })

      ee.on('error', () => reject(new Error('Some error')))
      ee.on('close', () => reject(new Error('Closed')))
    })

    // Triggering transaction
    await addAsset({
      client,
      pre,
      definitionId: AssetDefinitionId({
        name: 'xor',
        domain_id: DomainId({
          name: 'wonderland',
        }),
      }),
    })

    // Waiting for resolving
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 1_000)
      committedPromise.then(() => resolve())
    })

    // unnecessary teardown
    await stop()
  })
})

describe('Setting configuration', () => {
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
  // FIXME: currently Iroha has a bug related to blocks stream, so this test fails
  // TODO: link issue here
  test.skip('When committing 3 blocks sequentially, nothing fails', async () => {
    const { pre, client } = clientFactory()

    const stream = await Torii.listenForBlocksStream(pre, { height: 0n })

    for (const assetName of ['xor', 'val', 'vat']) {
      // listening for some block
      const blockPromise = stream.ee.once('block')

      // triggering block creation
      await addAsset({
        client,
        pre,
        definitionId: AssetDefinitionId({
          name: assetName,
          domain_id: DomainId({
            name: 'wonderland',
          }),
        }),
      })

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
