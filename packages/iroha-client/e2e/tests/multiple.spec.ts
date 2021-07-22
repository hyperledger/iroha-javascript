import { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/cjs';
import { startPeer, setConfiguration, clearConfiguration, StartPeerReturn } from '@iroha/test-peer';
import { delay } from '../util';
import { client_config, peer_config, peer_genesis, peer_trusted_peers, PIPELINE_MS } from '../config';
import { IrohaClient, Enum, Result, IrohaTypes } from '../../src/lib';

async function addAsset(client: IrohaClient, definitionid: IrohaTypes['iroha_data_model::asset::DefinitionId']) {
    const definition: IrohaTypes['iroha_data_model::asset::AssetDefinition'] = {
        id: definitionid,
        valueType: Enum.create('BigQuantity'),
    };
    const createAsset: IrohaTypes['iroha_data_model::isi::RegisterBox'] = {
        object: {
            expression: Enum.create('Raw', Enum.create('Identifiable', Enum.create('AssetDefinition', definition))),
        },
    };
    await client.submitInstruction(Enum.create('Register', createAsset));
}

async function addAccount(client: IrohaClient, accountId: IrohaTypes['iroha_data_model::account::Id']) {
    const registerBox: IrohaTypes['iroha_data_model::isi::RegisterBox'] = {
        object: {
            expression: Enum.create(
                'Raw',
                Enum.create(
                    'Identifiable',
                    Enum.create('NewAccount', {
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

    await client.submitInstruction(Enum.create('Register', registerBox));
}

describe('e2e tests', () => {
    const testClient = new IrohaClient({
        ...client_config,
        hasher: create_blake2b_32_hash,
        signer: sign_with_ed25519_sha512,
    });

    let startedPeer: StartPeerReturn | null = null;

    beforeAll(async () => {
        await setConfiguration({
            config: peer_config,
            genesis: peer_genesis,
            trusted_peers: peer_trusted_peers,
        });
    });

    afterAll(async () => {
        await clearConfiguration();
    });

    beforeEach(async () => {
        startedPeer = await startPeer({
            // outputPeerLogs: true,
        });
    });

    afterEach(async () => {
        await startedPeer?.kill({ clearSideEffects: true });
    });

    test('health check', async () => {
        expect(await testClient.health()).toEqual(Enum.create('Ok', null) as Result<null, Error>);
    });

    test('client add asset with name length more than limit should not commit transaction', async () => {
        type AssetDefinitionId = IrohaTypes['iroha_data_model::asset::DefinitionId'];

        const normalAssetDefinitionId: AssetDefinitionId = {
            name: 'xor',
            domainName: 'wonderland',
        };
        await addAsset(testClient, normalAssetDefinitionId);

        const tooLongAssetName = '0'.repeat(2 ** 14);
        const invalidAssetDefinitionId: AssetDefinitionId = {
            name: tooLongAssetName,
            domainName: 'wonderland',
        };
        await addAsset(testClient, invalidAssetDefinitionId);

        await delay(PIPELINE_MS * 2);

        const queryResult = await testClient.query(Enum.create('FindAllAssetsDefinitions', {}));

        const existingDefinitions: AssetDefinitionId[] = queryResult
            .as('Ok')
            .as('Vec')
            .map((val) => val.as('Identifiable').as('AssetDefinition').id);

        expect(existingDefinitions).toContainEqual(normalAssetDefinitionId);
        expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId);
    });

    test('client add account with name length more than limit should not commit transaction', async () => {
        type AccoutId = IrohaTypes['iroha_data_model::account::Id'];

        const normal: AccoutId = {
            name: 'bob',
            domainName: 'wonderland',
        };
        const incorrect: AccoutId = {
            name: '0'.repeat(2 ** 14),
            domainName: 'wonderland',
        };

        await Promise.all([normal, incorrect].map((x) => addAccount(testClient, x)));
        await delay(PIPELINE_MS * 2);
        const queryResult = await testClient.query(Enum.create('FindAllAccounts', {}));

        const existingAccounts: AccoutId[] = queryResult
            .as('Ok')
            .as('Vec')
            .map((val) => val.as('Identifiable').as('Account').id);

        expect(existingAccounts).toContainEqual(normal);
        expect(existingAccounts).not.toContainEqual(incorrect);
    });

    describe('events', () => {
        let closeEventsConnection: (() => Promise<void>) | null;

        test('add AssetDefinition and wait for transaction commitment', async () => {
            const pipelineFilter: IrohaTypes['iroha_data_model::events::pipeline::EventFilter'] = {
                entity: Enum.create('Some', Enum.create('Transaction')),
                hash: Enum.create('None'),
            };

            let transactionCommittedPromise: Promise<void>;
            await new Promise<void>((resolveBeforeAll, rejectBeforeAll) => {
                transactionCommittedPromise = new Promise((resolveTransaction) => {
                    testClient
                        .listenToEvents({
                            eventFilter: Enum.create('Pipeline', pipelineFilter),
                            on: {
                                event: (event) => {
                                    event.match({
                                        Pipeline({ entityType, status }) {
                                            if (entityType.is('Transaction') && status.is('Committed')) {
                                                resolveTransaction();
                                            }
                                        },
                                        Data() {},
                                    });
                                },
                            },
                        })
                        .then(({ close }) => {
                            closeEventsConnection = close;
                            resolveBeforeAll();
                        })
                        .catch(rejectBeforeAll);
                });
            });

            // triggering transaction
            await addAsset(testClient, {
                name: 'xor',
                domainName: 'wonderland',
            });

            // awaiting for triggering
            await new Promise<void>((resolve, reject) => {
                transactionCommittedPromise.then(resolve);
                setTimeout(() => reject(new Error('Timed out')), 3_000);
            });
        });

        afterEach(async () => {
            await closeEventsConnection?.();
        });
    });
});
