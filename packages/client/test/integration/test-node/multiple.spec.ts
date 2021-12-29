import { crypto } from '@iroha2/crypto-target-node';
import { KeyPair } from '@iroha2/crypto-core';
import { startPeer, setConfiguration, cleanConfiguration, StartPeerReturn } from '@iroha2/test-peer';
import { delay } from '../util';
import { client_config, peer_config, peer_genesis, peer_trusted_peers, PIPELINE_MS } from '../config';
import { Client, setCrypto } from '@iroha2/client';
import {
    UnwrapFragment,
    FragmentFromBuilder,
    Instruction,
    TransactionPayload,
    QueryBox,
    QueryPayload,
    FragmentBuilder,
    AssetValueType,
    DefinitionId,
    MintBox,
    EventFilter,
    EvaluatesToAccountId,
    OptionU32,
    Expression,
    Value,
    IdentifiableBox,
    AccountId,
    OptionEntityType,
    EntityType,
    OptionHash,
    IdBox,
    RegisterBox,
    Enum,
    Result,
} from '@iroha2/data-model';
import { hexToBytes } from 'hada';
import { Seq } from 'immutable';

setCrypto(crypto);
const client = Client.create({
    torii: client_config.torii,
});

type UnwrapFragmentOrBuilder<T> = T extends FragmentBuilder<any>
    ? UnwrapFragment<FragmentFromBuilder<T>>
    : UnwrapFragment<T>;

let keyPair: KeyPair;

function instructionToPayload(instruction: UnwrapFragmentOrBuilder<typeof Instruction>) {
    return TransactionPayload.defineUnwrap({
        instructions: [instruction],
        time_to_live_ms: 100_000n,
        creation_time: BigInt(Date.now()),
        metadata: new Map(),
        account_id: client_config.account,
        nonce: OptionU32.variantsUnwrapped.None,
    });
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
    assetType: UnwrapFragmentOrBuilder<typeof AssetValueType> = AssetValueType.variantsUnwrapped.BigQuantity,
    opts?: {
        mintable?: boolean;
    },
) {
    await client.submitTransaction({
        payload: TransactionPayload.wrap(
            instructionToPayload(
                Instruction.variantsUnwrapped.Register({
                    object: {
                        expression: Expression.variantsUnwrapped.Raw(
                            Value.variantsUnwrapped.Identifiable(
                                IdentifiableBox.variantsUnwrapped.AssetDefinition({
                                    id: definitionId,
                                    value_type: assetType,
                                    metadata: { map: new Map() },
                                    mintable: opts?.mintable ?? false,
                                }),
                            ),
                        ),
                    },
                }),
            ),
        ),
        signing: keyPair!,
    });
}

async function addAccount(accountId: UnwrapFragmentOrBuilder<typeof AccountId>) {
    await client.submitTransaction({
        payload: TransactionPayload.wrap(
            instructionToPayload(
                Instruction.variantsUnwrapped.Register({
                    object: {
                        expression: Expression.variantsUnwrapped.Raw(
                            Value.variantsUnwrapped.Identifiable(
                                IdentifiableBox.variantsUnwrapped.NewAccount({
                                    id: accountId,
                                    signatories: [],
                                    metadata: {
                                        map: new Map(),
                                    },
                                }),
                            ),
                        ),
                    },
                }),
            ),
        ),
        signing: keyPair!,
    });
}

async function submitMint(mintBox: UnwrapFragmentOrBuilder<typeof MintBox>) {
    await client.submitTransaction({
        payload: TransactionPayload.wrap(instructionToPayload(Instruction.variantsUnwrapped.Mint(mintBox))),
        signing: keyPair!,
    });
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
        const { blocks } = await client.checkStatus();
        if (blocks >= 1) return;
        await delay(50);
    }
}

// and now tests...

beforeAll(async () => {
    await cleanConfiguration();

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

    await ensureGenesisIsCommitted();
});

afterAll(async () => {
    await killStartedPeer();
    await cleanConfiguration();
});

test('Peer is healthy', async () => {
    expect(await client.checkHealth()).toEqual(Enum.valuable('Ok', null) as Result<null, any>);
});

test('AddAsset instruction with name length more than limit is not committed', async () => {
    const normalAssetDefinitionId = DefinitionId.defineUnwrap({
        name: 'xor',
        domain_name: 'wonderland',
    });
    await addAsset(normalAssetDefinitionId);

    const tooLongAssetName = '0'.repeat(2 ** 14);
    const invalidAssetDefinitionId = DefinitionId.defineUnwrap({
        name: tooLongAssetName,
        domain_name: 'wonderland',
    });
    await addAsset(invalidAssetDefinitionId);

    await delay(PIPELINE_MS * 2);

    const queryResult = await client.makeQuery({
        payload: QueryPayload.wrap(queryBoxToPayload(QueryBox.variantsUnwrapped.FindAllAssetsDefinitions(null))),
        signing: keyPair,
    });

    const existingDefinitions: ReturnType<typeof DefinitionId['defineUnwrap']>[] = queryResult
        .as('Ok')
        .unwrap()
        .as('Vec')
        .map((val) => val.as('Identifiable').as('AssetDefinition').id);

    expect(existingDefinitions).toContainEqual(normalAssetDefinitionId);
    expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId);
});

test('AddAccount instruction with name length more than limit is not committed', async () => {
    type AccountId = UnwrapFragmentOrBuilder<typeof AccountId>;

    const normal = AccountId.defineUnwrap({
        name: 'bob',
        domain_name: 'wonderland',
    });
    const incorrect = AccountId.defineUnwrap({
        name: '0'.repeat(2 ** 14),
        domain_name: 'wonderland',
    });

    await Promise.all([normal, incorrect].map((x) => addAccount(x)));
    await delay(PIPELINE_MS * 2);

    const queryResult = await client.makeQuery({
        payload: QueryPayload.wrap(queryBoxToPayload(QueryBox.variantsUnwrapped.FindAllAccounts(null))),
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
        const filter = EventFilter.wrap(
            EventFilter.variantsUnwrapped.Pipeline({
                entity: OptionEntityType.variantsUnwrapped.Some(EntityType.variantsUnwrapped.Transaction),
                hash: OptionHash.variantsUnwrapped.None,
            }),
        );

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
    const ASSET_DEFINITION_ID = DefinitionId.defineUnwrap({
        name: 'xor',
        domain_name: 'wonderland',
    });
    await addAsset(ASSET_DEFINITION_ID, AssetValueType.variantsUnwrapped.Fixed, { mintable: true });
    await pipelineStepDelay();

    // Adding mint
    const DECIMAL = '512.5881';
    await submitMint({
        object: { expression: Expression.variantsUnwrapped.Raw(Value.variantsUnwrapped.Fixed(DECIMAL)) },
        destination_id: {
            expression: Expression.variantsUnwrapped.Raw(
                Value.variantsUnwrapped.Id(
                    IdBox.variantsUnwrapped.AssetId({
                        account_id: client_config.account,
                        definition_id: ASSET_DEFINITION_ID,
                    }),
                ),
            ),
        },
    });
    await pipelineStepDelay();

    // Checking added asset via query
    const expressionEvalToAccountId: UnwrapFragmentOrBuilder<typeof EvaluatesToAccountId> =
        EvaluatesToAccountId.defineUnwrap({
            expression: Expression.variantsUnwrapped.Raw(
                Value.variantsUnwrapped.Id(IdBox.variantsUnwrapped.AccountId(client_config.account)),
            ),
        });
    const result = await client.makeQuery({
        payload: QueryPayload.wrap(
            queryBoxToPayload(
                QueryBox.variantsUnwrapped.FindAssetsByAccountId({ account_id: expressionEvalToAccountId }),
            ),
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

test('Registering domain', async () => {
    async function registerDomain(domainName: string) {
        const registerBox = RegisterBox.defineUnwrap({
            object: {
                expression: Expression.variantsUnwrapped.Raw(
                    Value.variantsUnwrapped.Identifiable(
                        IdentifiableBox.variantsUnwrapped.Domain({
                            name: domainName,
                            accounts: new Map(),
                            metadata: { map: new Map() },
                            asset_definitions: new Map(),
                        }),
                    ),
                ),
            },
        });

        const instruction = Instruction.variantsUnwrapped.Register(registerBox);

        const payload = TransactionPayload.defineUnwrap({
            account_id: client_config.account,
            instructions: [instruction],
            time_to_live_ms: 100_000n,
            creation_time: BigInt(Date.now()),
            metadata: new Map(),
            nonce: OptionU32.variantsUnwrapped.None,
        });

        await client.submitTransaction({
            payload: TransactionPayload.wrap(payload),
            signing: keyPair,
        });
    }

    async function ensureDomainExistence(domainName: string) {
        const result = await client.makeQuery({
            payload: QueryPayload.wrap({
                query: QueryBox.variantsUnwrapped.FindAllDomains(null),
                timestamp_ms: BigInt(Date.now()),
                account_id: client_config.account,
            }),
            signing: keyPair,
        });

        const domain = result
            .as('Ok')
            .unwrap()
            .as('Vec')
            .map((x) => x.as('Identifiable').as('Domain'))
            .find((x) => x.name === domainName);

        if (!domain) throw new Error('Not found');
    }

    await registerDomain('test');
    await pipelineStepDelay();
    await ensureDomainExistence('test');
});
