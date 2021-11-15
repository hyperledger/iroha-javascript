import { crypto } from '@iroha2/crypto-target-node';
import { KeyPair } from '@iroha2/crypto-core';
import { startPeer, setConfiguration, clearConfiguration, StartPeerReturn } from '@iroha2/test-peer';
import { delay } from '../util';
import { client_config, peer_config, peer_genesis, peer_trusted_peers, PIPELINE_MS } from '../config';
import {
    createClient,
    Enum,
    UnwrapFragment,
    FragmentFromBuilder,
    Instruction,
    TransactionPayload,
    QueryBox,
    QueryPayload,
    FragmentBuilder,
    AssetValueType,
    RegisterBox,
    DefinitionId,
    AccountId,
    MintBox,
    EventFilter,
    PipelineEventFilter,
    EvaluatesToAccountId,
} from '../../../src/lib';
import { hexToBytes } from 'hada';
import { Seq } from 'immutable';

const client = createClient({
    toriiURL: client_config.toriiURL,
    crypto,
});

type UnwrapFragmentOrBuilder<T> = T extends FragmentBuilder<any>
    ? UnwrapFragment<FragmentFromBuilder<T>>
    : UnwrapFragment<T>;

let keyPair: KeyPair;

function instructionToPayload(
    instruction: UnwrapFragmentOrBuilder<typeof Instruction>,
): UnwrapFragmentOrBuilder<typeof TransactionPayload> {
    return {
        instructions: [instruction],
        time_to_live_ms: 100_000n,
        creation_time: BigInt(Date.now()),
        metadata: new Map(),
        account_id: client_config.account,
        nonce: Enum.empty('None'),
    };
}

function queryBoxToPayload(
    query: UnwrapFragmentOrBuilder<typeof QueryBox>,
): UnwrapFragmentOrBuilder<typeof QueryPayload> {
    return {
        query,
        account_id: client_config.account,
        timestamp_ms: BigInt(Date.now()),
    };
}

async function addAsset(
    definitionId: UnwrapFragmentOrBuilder<typeof DefinitionId>,
    assetType: UnwrapFragmentOrBuilder<typeof AssetValueType> = Enum.empty('BigQuantity'),
    opts?: {
        mintable?: boolean;
    },
) {
    const createAsset: UnwrapFragmentOrBuilder<typeof RegisterBox> = {
        object: {
            expression: Enum.valuable(
                'Raw',
                Enum.valuable(
                    'Identifiable',
                    Enum.valuable('AssetDefinition', {
                        id: definitionId,
                        value_type: assetType,
                        metadata: { map: new Map() },
                        mintable: opts?.mintable ?? false,
                    }),
                ),
            ),
        },
    };

    await client.submitTransaction({
        payload: TransactionPayload.wrap(instructionToPayload(Enum.valuable('Register', createAsset))),
        signing: keyPair!,
    });
}

async function addAccount(accountId: UnwrapFragmentOrBuilder<typeof AccountId>) {
    const registerBox: UnwrapFragmentOrBuilder<typeof RegisterBox> = {
        object: {
            expression: Enum.valuable(
                'Raw',
                Enum.valuable(
                    'Identifiable',
                    Enum.valuable('NewAccount', {
                        id: accountId,
                        signatories: [],
                        metadata: {
                            map: new Map(),
                        },
                    }),
                ),
            ),
        },
    };

    await client.submitTransaction({
        payload: TransactionPayload.wrap(instructionToPayload(Enum.valuable('Register', registerBox))),
        signing: keyPair!,
    });
}

async function submitMint(mintBox: UnwrapFragmentOrBuilder<typeof MintBox>) {
    await client.submitTransaction({
        payload: TransactionPayload.wrap(instructionToPayload(Enum.valuable('Mint', mintBox))),
        signing: keyPair!,
    });
}

async function pipelineStepDelay() {
    await delay(PIPELINE_MS * 2);
}

let startedPeer: StartPeerReturn | null = null;

async function killStartedPeer() {
    await startedPeer?.kill({ clearSideEffects: true });
}

// and now tests...

beforeAll(async () => {
    await clearConfiguration();

    // setup configs for test peer
    await setConfiguration({
        config: peer_config,
        genesis: peer_genesis,
        trusted_peers: peer_trusted_peers,
    });

    // preparing keys
    const multihash = crypto.createMultihashFromBytes(Uint8Array.from(hexToBytes(client_config.publicKey)));
    const publicKey = crypto.createPublicKeyFromMultihash(multihash);
    const privateKey = crypto.createPrivateKeyFromJsKey(client_config.privateKey);
    keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey);
    [publicKey, privateKey, multihash].forEach((x) => x.free());
});

beforeEach(async () => {
    await killStartedPeer();
    startedPeer = await startPeer();
});

afterAll(async () => {
    await killStartedPeer();
    await clearConfiguration();
});

test('Peer is healthy', async () => {
    expect(await (await client.checkHealth()).is('Ok')).toBe(true);
});

test('AddAsset instruction with name length more than limit is not committed', async () => {
    type AssetDefinitionId = UnwrapFragmentOrBuilder<typeof DefinitionId>;

    const normalAssetDefinitionId: AssetDefinitionId = {
        name: 'xor',
        domain_name: 'wonderland',
    };
    await addAsset(normalAssetDefinitionId);

    const tooLongAssetName = '0'.repeat(2 ** 14);
    const invalidAssetDefinitionId: AssetDefinitionId = {
        name: tooLongAssetName,
        domain_name: 'wonderland',
    };
    await addAsset(invalidAssetDefinitionId);

    await delay(PIPELINE_MS * 2);

    const queryResult = await client.makeQuery({
        payload: QueryPayload.wrap(queryBoxToPayload(Enum.valuable('FindAllAssetsDefinitions', null))),
        signing: keyPair,
    });

    const existingDefinitions: AssetDefinitionId[] = queryResult
        .as('Ok')
        .unwrap()
        .as('Vec')
        .map((val) => val.as('Identifiable').as('AssetDefinition').id);

    expect(existingDefinitions).toContainEqual(normalAssetDefinitionId);
    expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId);
});

test('AddAccount instruction with name length more than limit is not committed', async () => {
    type AccountId = UnwrapFragmentOrBuilder<typeof AccountId>;

    const normal: AccountId = {
        name: 'bob',
        domain_name: 'wonderland',
    };
    const incorrect: AccountId = {
        name: '0'.repeat(2 ** 14),
        domain_name: 'wonderland',
    };

    await Promise.all([normal, incorrect].map((x) => addAccount(x)));
    await delay(PIPELINE_MS * 2);

    const queryResult = await client.makeQuery({
        payload: QueryPayload.wrap(queryBoxToPayload(Enum.valuable('FindAllAccounts', null))),
        signing: keyPair,
    });

    const existingAccounts: AccountId[] = queryResult
        .as('Ok')
        .unwrap()
        .as('Vec')
        .map((val) => val.as('Identifiable').as('Account').id);

    expect(existingAccounts).toContainEqual(normal);
    expect(existingAccounts).not.toContainEqual(incorrect);
});

test('transaction-committed event is triggered after AddAsset instruction has been committed', async () => {
    let closeEventsConnection: Function | undefined;

    try {
        const pipelineEventFilter = PipelineEventFilter.wrap({
            entity: Enum.valuable('Some', Enum.empty('Transaction')),
            hash: Enum.empty('None'),
        });
        const filter = EventFilter.fromValue(Enum.valuable('Pipeline', pipelineEventFilter));

        // setting up listening
        let transactionCommittedPromise: Promise<void>;
        await new Promise<void>((resolveSubscribed, rejectSubscribed) => {
            transactionCommittedPromise = new Promise((resolveTransaction) => {
                client
                    .listenForEvents({ filter })
                    .then(({ close, ee }) => {
                        ee.on('event', (event) => {
                            event.unwrap().match({
                                Pipeline({ entity_type, status }) {
                                    if (entity_type.is('Transaction') && status.is('Committed')) {
                                        resolveTransaction();
                                    }
                                },
                                Data() {},
                            });
                        });

                        closeEventsConnection = close;
                        resolveSubscribed();
                    })
                    .catch(rejectSubscribed);
            });
        });

        // triggering transaction
        await addAsset({
            name: 'xor',
            domain_name: 'wonderland',
        });

        // awaiting for triggering
        await new Promise<void>((resolve, reject) => {
            transactionCommittedPromise.then(resolve);
            setTimeout(() => reject(new Error('Timed out')), 3_000);
        });
    } finally {
        closeEventsConnection?.();
    }
});

test('Ensure properly handling of Fixed type - adding Fixed asset and quering for it later', async () => {
    // Creating asset by definition
    const ASSET_DEFINITION_ID: UnwrapFragmentOrBuilder<typeof DefinitionId> = {
        name: 'xor',
        domain_name: 'wonderland',
    };
    await addAsset(ASSET_DEFINITION_ID, Enum.empty('Fixed'), { mintable: true });
    await pipelineStepDelay();

    // Adding mint
    const DECIMAL = '512.5881';
    await submitMint({
        object: { expression: Enum.valuable('Raw', Enum.valuable('Fixed', DECIMAL)) },
        destination_id: {
            expression: Enum.valuable(
                'Raw',
                Enum.valuable(
                    'Id',
                    Enum.valuable('AssetId', {
                        account_id: client_config.account,
                        definition_id: ASSET_DEFINITION_ID,
                    }),
                ),
            ),
        },
    });
    await pipelineStepDelay();

    // Checking added asset via query
    const expressionEvalToAccountId: UnwrapFragmentOrBuilder<typeof EvaluatesToAccountId> = {
        expression: Enum.valuable('Raw', Enum.valuable('Id', Enum.valuable('AccountId', client_config.account))),
    };
    const result = await client.makeQuery({
        payload: QueryPayload.wrap(
            queryBoxToPayload(Enum.valuable('FindAssetsByAccountId', { account_id: expressionEvalToAccountId })),
        ),
        signing: keyPair,
    });

    // Assert
    const asset = Seq(result.as('Ok').unwrap().as('Vec'))
        .map((x) => x.as('Identifiable').as('Asset'))
        .find((x) => x.id.definition_id.name === ASSET_DEFINITION_ID.name);
    expect(asset).toBeTruthy();
    expect(asset!.value.is('Fixed')).toBe(true);
    expect(asset!.value.as('Fixed')).toBe(DECIMAL);
});
