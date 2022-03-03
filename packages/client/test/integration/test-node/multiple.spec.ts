import { crypto } from '@iroha2/crypto-target-node';
import { Client, setCrypto } from '@iroha2/client';
import {
    Instruction,
    AssetValueType,
    DefinitionId,
    MintBox,
    EventFilter,
    Expression,
    Value,
    IdentifiableBox,
    AccountId,
    OptionEntityType,
    EntityType,
    IdBox,
    RegisterBox,
    Enum,
    Result,
    Logger as SCALELogger,
} from '@iroha2/data-model';
import { hexToBytes } from 'hada';
import { Seq } from 'immutable';

import { startPeer, setConfiguration, cleanConfiguration, StartPeerReturn } from '@iroha2/test-peer';
import { delay } from '../util';
import { client_config, peer_config, peer_genesis, PIPELINE_MS } from '../config';

// for debugging convenience
new SCALELogger().mount();

// preparing keys
const multihash = crypto.createMultihashFromBytes(Uint8Array.from(hexToBytes(client_config.publicKey)));
const publicKey = crypto.createPublicKeyFromMultihash(multihash);
const privateKey = crypto.createPrivateKeyFromJsKey(client_config.privateKey);
const keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey);
[publicKey, privateKey, multihash].forEach((x) => x.free());

// preparing client

setCrypto(crypto);
const client = new Client({
    torii: client_config.torii,
    keyPair,
    accountId: client_config.account,
});

async function addAsset(
    definitionId: DefinitionId,
    assetType: AssetValueType = Enum.variant('BigQuantity'),
    opts?: {
        mintable?: boolean;
    },
) {
    const expression = Enum.variant<Expression>(
        'Raw',
        Enum.variant<Value>(
            'Identifiable',
            Enum.variant<IdentifiableBox>('AssetDefinition', {
                id: definitionId,
                value_type: assetType,
                metadata: { map: new Map() },
                mintable: opts?.mintable ?? false,
            }),
        ),
    );

    await client.submit(Enum.variant('Instructions', [Enum.variant('Register', { object: { expression } })]));
}

async function addAccount(accountId: AccountId) {
    const newAccount: IdentifiableBox = Enum.variant('NewAccount', {
        id: accountId,
        signatories: [],
        metadata: { map: new Map() },
    });
    const expression = Enum.variant<Expression>('Raw', Enum.variant<Value>('Identifiable', newAccount));
    const instruction = Enum.variant<Instruction>('Register', { object: { expression } });

    await client.submit(Enum.variant('Instructions', [instruction]));
}

async function submitMint(mint: MintBox) {
    await client.submit(Enum.variant('Instructions', [Enum.variant('Mint', mint)]));
}

async function pipelineStepDelay() {
    await delay(PIPELINE_MS * 2);
}

let startedPeer: StartPeerReturn | null = null;

async function killStartedPeer() {
    await startedPeer?.kill({ cleanSideEffects: true });
}

async function ensureGenesisIsCommitted() {
    while (true) {
        const { blocks } = await client.getStatus();
        if (blocks >= 1) return;
        await delay(250);
    }
}

// and now tests...

beforeEach(async () => {
    await killStartedPeer();
    await cleanConfiguration();

    // setup configs for test peer
    await setConfiguration({
        config: peer_config,
        genesis: peer_genesis,
    });

    startedPeer = await startPeer();

    await ensureGenesisIsCommitted();
});

afterAll(async () => {
    await killStartedPeer();
    await cleanConfiguration();
});

test('Peer is healthy', async () => {
    expect(await client.getHealth()).toEqual(Enum.variant('Ok', null) as Result<null, any>);
});

test('AddAsset instruction with name length more than limit is not committed', async () => {
    const normalAssetDefinitionId: DefinitionId = {
        name: 'xor',
        domain_id: {
            name: 'wonderland',
        },
    };
    await addAsset(normalAssetDefinitionId);

    const tooLongAssetName = '0'.repeat(2 ** 14);
    const invalidAssetDefinitionId: DefinitionId = {
        name: tooLongAssetName,
        domain_id: {
            name: 'wonderland',
        },
    };
    await addAsset(invalidAssetDefinitionId);

    await delay(PIPELINE_MS * 2);

    const queryResult = await client.request(Enum.variant('FindAllAssetsDefinitions', null));

    const existingDefinitions: DefinitionId[] = queryResult
        .as('Ok')
        .as('Vec')
        .map((val) => val.as('Identifiable').as('AssetDefinition').id);

    expect(existingDefinitions).toContainEqual(normalAssetDefinitionId);
    expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId);
});

test('AddAccount instruction with name length more than limit is not committed', async () => {
    const normal: AccountId = {
        name: 'bob',
        domain_id: {
            name: 'wonderland',
        },
    };
    const incorrect: AccountId = {
        name: '0'.repeat(2 ** 14),
        domain_id: {
            name: 'wonderland',
        },
    };

    await Promise.all([normal, incorrect].map((x) => addAccount(x)));
    await delay(PIPELINE_MS * 2);

    const queryResult = await client.request(Enum.variant('FindAllAccounts', null));

    const existingAccounts: AccountId[] = queryResult
        .as('Ok')
        .as('Vec')
        .map((val) => val.as('Identifiable').as('Account').id);

    expect(existingAccounts).toContainEqual(normal);
    expect(existingAccounts).not.toContainEqual(incorrect);
});

test('transaction-committed event is triggered after AddAsset instruction has been committed', async () => {
    const filter: EventFilter = Enum.variant('Pipeline', {
        entity: Enum.variant<OptionEntityType>('Some', Enum.variant<EntityType>('Transaction')),
        hash: Enum.variant('None'),
    });

    // Listening

    const { ee, stop } = await client.listenForEvents({ filter });

    const committedPromise = new Promise<void>((resolve, reject) => {
        ee.on('event', (event) => {
            if (event.is('Pipeline')) {
                const { entity_type, status } = event.as('Pipeline');
                if (entity_type.is('Transaction') && status.is('Committed')) {
                    resolve();
                }
            }
        });

        ee.on('error', () => reject(new Error('Some error')));
        ee.on('close', () => reject(new Error('Closed')));
    });

    // Triggering transaction
    await addAsset({
        name: 'xor',
        domain_id: {
            name: 'wonderland',
        },
    });

    // Waiting for resolving
    await new Promise<void>((resolve, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 1_000);
        committedPromise.then(() => resolve());
    });

    // unnecessary teardown
    stop();
});

test('Ensure properly handling of Fixed type - adding Fixed asset and quering for it later', async () => {
    // Creating asset by definition
    const ASSET_DEFINITION_ID: DefinitionId = {
        name: 'xor',
        domain_id: {
            name: 'wonderland',
        },
    };
    await addAsset(ASSET_DEFINITION_ID, Enum.variant<AssetValueType>('Fixed'), { mintable: true });
    await pipelineStepDelay();

    // Adding mint
    const DECIMAL = '512.5881';
    await submitMint({
        object: {
            expression: Enum.variant<Expression>('Raw', Enum.variant<Value>('Fixed', DECIMAL)),
        },
        destination_id: {
            expression: Enum.variant<Expression>(
                'Raw',
                Enum.variant<Value>(
                    'Id',
                    Enum.variant<IdBox>('AssetId', {
                        account_id: client_config.account,
                        definition_id: ASSET_DEFINITION_ID,
                    }),
                ),
            ),
        },
    });
    await pipelineStepDelay();

    // Checking added asset via query
    const result = await client.request(
        Enum.variant('FindAssetsByAccountId', {
            account_id: {
                expression: Enum.variant<Expression>(
                    'Raw',
                    Enum.variant<Value>('Id', Enum.variant<IdBox>('AccountId', client_config.account)),
                ),
            },
        }),
    );

    // Assert
    const asset = Seq(result.as('Ok').as('Vec'))
        .map((x) => x.as('Identifiable').as('Asset'))
        .find((x) => x.id.definition_id.name === ASSET_DEFINITION_ID.name);

    expect(asset).toBeTruthy();
    expect(asset!.value.is('Fixed')).toBe(true);
    expect(asset!.value.as('Fixed')).toBe(DECIMAL);
});

test('Registering domain', async () => {
    async function registerDomain(domainName: string) {
        const registerBox: RegisterBox = {
            object: {
                expression: Enum.variant<Expression>(
                    'Raw',
                    Enum.variant<Value>(
                        'Identifiable',
                        Enum.variant<IdentifiableBox>('Domain', {
                            id: {
                                name: domainName,
                            },
                            accounts: new Map(),
                            metadata: { map: new Map() },
                            asset_definitions: new Map(),
                            logo: Enum.variant('None'),
                        }),
                    ),
                ),
            },
        };

        const instruction = Enum.variant<Instruction>('Register', registerBox);

        await client.submit(Enum.variant('Instructions', [instruction]));
    }

    async function ensureDomainExistence(domainName: string) {
        const result = await client.request(Enum.variant('FindAllDomains', null));

        const domain = result
            .as('Ok')
            .as('Vec')
            .map((x) => x.as('Identifiable').as('Domain'))
            .find((x) => x.id.name === domainName);

        if (!domain) throw new Error('Not found');
    }

    await registerDomain('test');
    await pipelineStepDelay();
    await ensureDomainExistence('test');
});

test('When setting correct peer configuration, there is no error', async () => {
    await client.setPeerConfig({ LogLevel: 'TRACE' });
});

test('When setting incorrect peer log level, there is an error', async () => {
    await expect(client.setPeerConfig({ LogLevel: 'TR' as any })).rejects.toThrow();
});
