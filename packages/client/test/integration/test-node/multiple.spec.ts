import { crypto } from '@iroha2/crypto-target-node'
import { Client, setCrypto } from '@iroha2/client'
import {
  Instruction,
  AssetValueType,
  AssetDefinitionId,
  MintBox,
  EventFilter,
  Expression,
  Value,
  IdentifiableBox,
  AccountId,
  OptionPipelineEntityType,
  PipelineEntityType,
  IdBox,
  RegisterBox,
  Enum,
  Result,
  Logger as ScaleLogger,
  AssetDefinition,
  Metadata,
  VecTupleNameValue,
  Executable,
  VecInstruction,
  EvaluatesToIdentifiableBox,
  Account,
  VecTupleAssetIdAsset,
  VecPermissionToken,
  EvaluatesToBool,
  VecPublicKey,
  DomainId,
  QueryBox,
  EvaluatesToValue,
  EvaluatesToIdBox,
  AssetId,
  FindAssetsByAccountId,
  EvaluatesToAccountId,
  Domain,
  VecTupleAccountIdAccount,
  VecTupleAssetDefinitionIdAssetDefinitionEntry,
  OptionIpfsPath,
  OptionHash,
  PipelineEventFilter,
  FindAssetById,
  EvaluatesToAssetId,
  VecRoleId,
} from '@iroha2/data-model'
import { hexToBytes } from 'hada'
import { Seq } from 'immutable'

import { startPeer, setConfiguration, cleanConfiguration, StartPeerReturn } from '@iroha2/test-peer'
import { delay } from '../util'
import { client_config, peer_config, peer_genesis, PIPELINE_MS } from '../config'

// for debugging convenience
new ScaleLogger().mount()

// preparing keys
const multihash = crypto.createMultihashFromBytes(Uint8Array.from(hexToBytes(client_config.publicKey)))
const publicKey = crypto.createPublicKeyFromMultihash(multihash)
const privateKey = crypto.createPrivateKeyFromJsKey(client_config.privateKey)
const keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey)
;[publicKey, privateKey, multihash].forEach((x) => x.free())

// preparing client

setCrypto(crypto)
const client = new Client({
  torii: client_config.torii,
  keyPair,
  accountId: client_config.account as AccountId,
})

async function addAsset(
  definitionId: AssetDefinitionId,
  assetType: AssetValueType = Enum.variant('BigQuantity'),
  opts?: {
    mintable?: boolean
  },
) {
  await client.submit(
    Executable(
      'Instructions',
      VecInstruction([
        Instruction(
          'Register',
          RegisterBox({
            object: EvaluatesToIdentifiableBox({
              expression: Expression(
                'Raw',
                Value(
                  'Identifiable',
                  IdentifiableBox(
                    'AssetDefinition',
                    AssetDefinition({
                      id: definitionId,
                      value_type: assetType,
                      metadata: Metadata({ map: VecTupleNameValue([]) }),
                      mintable: opts?.mintable ?? false,
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

async function addAccount(accountId: AccountId) {
  await client.submit(
    Executable(
      'Instructions',
      VecInstruction([
        Instruction(
          'Register',
          RegisterBox({
            object: EvaluatesToIdentifiableBox({
              expression: Expression(
                'Raw',
                Value(
                  'Identifiable',
                  IdentifiableBox(
                    'NewAccount',
                    Account({
                      id: accountId,
                      assets: VecTupleAssetIdAsset([]),
                      permission_tokens: VecPermissionToken([]),
                      signature_check_condition: EvaluatesToBool({
                        expression: Expression('Raw', Value('Bool', false)),
                      }),
                      signatories: VecPublicKey([]),
                      metadata: Metadata({ map: VecTupleNameValue([]) }),
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

async function submitMint(mint: MintBox) {
  await client.submit(Executable('Instructions', VecInstruction([Instruction('Mint', mint)])))
}

async function pipelineStepDelay() {
  await delay(PIPELINE_MS * 2)
}

let startedPeer: StartPeerReturn | null = null

async function killStartedPeer() {
  await startedPeer?.kill({ cleanSideEffects: true })
}

async function waitForGenesisCommitted() {
  while (true) {
    const { blocks } = await client.getStatus()
    if (blocks >= 1) return
    await delay(250)
  }
}

// and now tests...

beforeEach(async () => {
  await killStartedPeer()
  await cleanConfiguration()

  // setup configs for test peer
  await setConfiguration({
    config: peer_config,
    genesis: peer_genesis,
  })

  startedPeer = await startPeer()

  await waitForGenesisCommitted()
})

afterAll(async () => {
  await killStartedPeer()
  await cleanConfiguration()
})

test('Peer is healthy', async () => {
  expect(await client.getHealth()).toEqual(Enum.variant('Ok', null) as Result<null, any>)
})

test('AddAsset instruction with name length more than limit is not committed', async () => {
  const normalAssetDefinitionId = AssetDefinitionId({
    name: 'xor',
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })
  await addAsset(normalAssetDefinitionId)

  const tooLongAssetName = '0'.repeat(2 ** 14)
  const invalidAssetDefinitionId = AssetDefinitionId({
    name: tooLongAssetName,
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })
  await addAsset(invalidAssetDefinitionId)

  await delay(PIPELINE_MS * 2)

  const queryResult = await client.request(QueryBox('FindAllAssetsDefinitions', null))

  const existingDefinitions: AssetDefinitionId[] = queryResult
    .as('Ok')
    .as('Vec')
    .map((val) => val.as('Identifiable').as('AssetDefinition').id)

  expect(existingDefinitions).toContainEqual(normalAssetDefinitionId)
  expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId)
})

test('AddAccount instruction with name length more than limit is not committed', async () => {
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

  await Promise.all([normal, incorrect].map((x) => addAccount(x)))
  await delay(PIPELINE_MS * 2)

  const queryResult = await client.request(QueryBox('FindAllAccounts', null))

  const existingAccounts: AccountId[] = queryResult
    .as('Ok')
    .as('Vec')
    .map((val) => val.as('Identifiable').as('Account').id)

  expect(existingAccounts).toContainEqual(normal)
  expect(existingAccounts).not.toContainEqual(incorrect)
})

test('Ensure properly handling of Fixed type - adding Fixed asset and quering for it later', async () => {
  // Creating asset by definition
  const ASSET_DEFINITION_ID = AssetDefinitionId({
    name: 'xor',
    domain_id: DomainId({
      name: 'wonderland',
    }),
  })
  await addAsset(ASSET_DEFINITION_ID, AssetValueType('Fixed'), { mintable: true })
  await pipelineStepDelay()

  // Adding mint
  const DECIMAL = '512.5881'
  await submitMint(
    MintBox({
      object: EvaluatesToValue({
        expression: Expression('Raw', Value('Fixed', DECIMAL)),
      }),
      destination_id: EvaluatesToIdBox({
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
  )
  await pipelineStepDelay()

  // Checking added asset via query
  const result = await client.request(
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
  const asset = Seq(result.as('Ok').as('Vec'))
    .map((x) => x.as('Identifiable').as('Asset'))
    .find((x) => x.id.definition_id.name === ASSET_DEFINITION_ID.name)

  expect(asset).toBeTruthy()
  expect(asset!.value.is('Fixed')).toBe(true)
  expect(asset!.value.as('Fixed')).toBe(DECIMAL)
})

test('Registering domain', async () => {
  async function registerDomain(domainName: string) {
    const registerBox = RegisterBox({
      object: EvaluatesToIdentifiableBox({
        expression: Expression(
          'Raw',
          Value(
            'Identifiable',
            IdentifiableBox(
              'Domain',
              Domain({
                id: DomainId({
                  name: domainName,
                }),
                accounts: VecTupleAccountIdAccount([]),
                metadata: Metadata({ map: VecTupleNameValue([]) }),
                asset_definitions: VecTupleAssetDefinitionIdAssetDefinitionEntry([]),
                logo: OptionIpfsPath('None'),
              }),
            ),
          ),
        ),
      }),
    })

    await client.submit(Executable('Instructions', VecInstruction([Instruction('Register', registerBox)])))
  }

  async function ensureDomainExistence(domainName: string) {
    const result = await client.request(QueryBox('FindAllDomains', null))

    const domain = result
      .as('Ok')
      .as('Vec')
      .map((x) => x.as('Identifiable').as('Domain'))
      .find((x) => x.id.name === domainName)

    if (!domain) throw new Error('Not found')
  }

  await registerDomain('test')
  await pipelineStepDelay()
  await ensureDomainExistence('test')
})

test('When querying for unexisting domain, returns FindError', async () => {
  const result = await client.request(
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
                    domain_id: DomainId({
                      name: 'wonderland',
                    }),
                  }),
                  definition_id: AccountId({
                    name: 'XOR',
                    domain_id: DomainId({
                      name: 'wonderland',
                    }),
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
    const filter = EventFilter(
      'Pipeline',
      PipelineEventFilter({
        entity: OptionPipelineEntityType('Some', PipelineEntityType('Transaction')),
        hash: OptionHash('None'),
      }),
    )

    // Listening

    const { ee, stop } = await client.listenForEvents({ filter })

    const committedPromise = new Promise<void>((resolve, reject) => {
      ee.on('event', (event) => {
        if (event.is('Pipeline')) {
          const { entity_type, status } = event.as('Pipeline')
          if (entity_type.is('Transaction') && status.is('Committed')) {
            resolve()
          }
        }
      })

      ee.on('error', () => reject(new Error('Some error')))
      ee.on('close', () => reject(new Error('Closed')))
    })

    // Triggering transaction
    await addAsset(
      AssetDefinitionId({
        name: 'xor',
        domain_id: DomainId({
          name: 'wonderland',
        }),
      }),
    )

    // Waiting for resolving
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 1_000)
      committedPromise.then(() => resolve())
    })

    // unnecessary teardown
    stop()
  })
})

describe('Setting configuration', () => {
  test('When setting correct peer configuration, there is no error', async () => {
    await client.setPeerConfig({ LogLevel: 'TRACE' })
  })

  test('When setting incorrect peer log level, there is an error', async () => {
    await expect(client.setPeerConfig({ LogLevel: 'TR' as any })).rejects.toThrow()
  })
})

describe('Blocks Stream API', () => {
  test('When commiting 3 blocks sequentially, nothing fails', async () => {
    const stream = await client.listenForBlocksStream({ height: 0n })

    for (const assetName of ['xor', 'val', 'vat']) {
      // listening for some block
      const blockPromise = stream.ee.once('block')

      // triggering block creation
      await addAsset(
        AssetDefinitionId({
          name: assetName,
          domain_id: DomainId({
            name: 'wonderland',
          }),
        }),
      )

      // waiting for it
      await blockPromise
    }

    stream.stop()
  })
})

describe('Metrics', () => {
  test('When getting metrics, everything is OK', async () => {
    const data = await client.getMetrics()

    // just some line from Prometheus metrics
    expect(data).toMatch('block_height 1')
  })
})

test('status - peer uptime content check, not only type', async () => {
  const status = await client.getStatus()

  expect(status).toEqual(
    expect.objectContaining({
      peers: expect.any(Number),
      blocks: expect.any(Number),
      txs: expect.any(Number),
      uptime: expect.objectContaining({
        secs: expect.any(Number),
        nanos: expect.any(Number),
      }),
    }),
  )
})
