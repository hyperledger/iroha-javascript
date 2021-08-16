import initCryptoWasm, { Multihash, KeyPair, PublicKey, PrivateKey } from '@iroha2/crypto';
import { startPeer, setConfiguration, clearConfiguration, StartPeerReturn } from '@iroha2/test-peer';
import { delay } from '../util';
import { client_config, peer_config, peer_genesis, peer_trusted_peers, PIPELINE_MS } from '../config';
import { createClient, Enum, Result, IrohaDataModel } from '../../../src/lib';
import JSBI from 'jsbi';
import fs from 'fs/promises';
import { hexToBytes } from 'hada';

const client = createClient({
    toriiURL: client_config.toriiURL,
});

let keyPair: KeyPair;

function wrapInstruction(
    item: IrohaDataModel['iroha_data_model::isi::Instruction'],
): IrohaDataModel['iroha_data_model::transaction::Payload'] {
    return {
        instructions: [item],
        timeToLiveMs: JSBI.BigInt(100_000),
        creationTime: JSBI.BigInt(Date.now()),
        metadata: new Map(),
        accountId: client_config.account,
    };
}

function wrapQuery(
    query: IrohaDataModel['iroha_data_model::query::QueryBox'],
): IrohaDataModel['iroha_data_model::query::Payload'] {
    return {
        query,
        accountId: client_config.account,
        timestampMs: JSBI.BigInt(Date.now()),
    };
}

async function addAsset(definitionid: IrohaDataModel['iroha_data_model::asset::DefinitionId']) {
    const definition: IrohaDataModel['iroha_data_model::asset::AssetDefinition'] = {
        id: definitionid,
        valueType: Enum.create('BigQuantity'),
    };

    const createAsset: IrohaDataModel['iroha_data_model::isi::RegisterBox'] = {
        object: {
            expression: Enum.create('Raw', Enum.create('Identifiable', Enum.create('AssetDefinition', definition))),
        },
    };

    await client.submitTransaction({
        payload: wrapInstruction(Enum.create('Register', createAsset)),
        signing: keyPair!,
    });
}

async function addAccount(accountId: IrohaDataModel['iroha_data_model::account::Id']) {
    const registerBox: IrohaDataModel['iroha_data_model::isi::RegisterBox'] = {
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

    await client.submitTransaction({
        payload: wrapInstruction(Enum.create('Register', registerBox)),
        signing: keyPair!,
    });
}

let startedPeer: StartPeerReturn | null = null;

beforeAll(async () => {
    // setup configs for test peer
    await setConfiguration({
        config: peer_config,
        genesis: peer_genesis,
        trusted_peers: peer_trusted_peers,
    });

    // initialise crypto WASM
    const wasmBytes = await fs.readFile(require.resolve('@iroha2/crypto/wasm/iroha_crypto_bg.wasm'));
    await initCryptoWasm(wasmBytes);

    // preparing keys
    const multihash = Multihash.from_bytes(Uint8Array.from(hexToBytes(client_config.publicKey)));
    const publicKey = PublicKey.from_multihash(multihash);
    const privateKey = PrivateKey.from_js_key(client_config.privateKey);
    keyPair = KeyPair.from_pair(publicKey, privateKey);
    [publicKey, privateKey, multihash].forEach((x) => x.free());
});

afterAll(async () => {
    // clear test peer configs
    await clearConfiguration();
});

beforeEach(async () => {
    startedPeer = await startPeer({
        outputPeerLogs: true,
    });
});

afterEach(async () => {
    await startedPeer?.kill({ clearSideEffects: true });
});

test('Peer is healthy', async () => {
    expect(await client.checkHealth()).toEqual(Enum.create('Ok', null) as Result<null, Error>);
});

test('AddAsset instruction with name length more than limit is not committed', async () => {
    type AssetDefinitionId = IrohaDataModel['iroha_data_model::asset::DefinitionId'];

    const normalAssetDefinitionId: AssetDefinitionId = {
        name: 'xor',
        domainName: 'wonderland',
    };
    await addAsset(normalAssetDefinitionId);

    const tooLongAssetName = '0'.repeat(2 ** 14);
    const invalidAssetDefinitionId: AssetDefinitionId = {
        name: tooLongAssetName,
        domainName: 'wonderland',
    };
    await addAsset(invalidAssetDefinitionId);

    await delay(PIPELINE_MS * 2);

    const queryResult = await client.makeQuery({
        payload: wrapQuery(Enum.create('FindAllAssetsDefinitions', {})),
        signing: keyPair,
    });

    const existingDefinitions: AssetDefinitionId[] = queryResult
        .as('Ok')
        .as('Vec')
        .map((val) => val.as('Identifiable').as('AssetDefinition').id);

    expect(existingDefinitions).toContainEqual(normalAssetDefinitionId);
    expect(existingDefinitions).not.toContainEqual(invalidAssetDefinitionId);
});

test('AddAccount instruction with name length more than limit is not committed', async () => {
    type AccountId = IrohaDataModel['iroha_data_model::account::Id'];

    const normal: AccountId = {
        name: 'bob',
        domainName: 'wonderland',
    };
    const incorrect: AccountId = {
        name: '0'.repeat(2 ** 14),
        domainName: 'wonderland',
    };

    await Promise.all([normal, incorrect].map((x) => addAccount(x)));
    await delay(PIPELINE_MS * 2);

    const queryResult = await client.makeQuery({
        payload: wrapQuery(Enum.create('FindAllAccounts', {})),
        signing: keyPair,
    });

    const existingAccounts: AccountId[] = queryResult
        .as('Ok')
        .as('Vec')
        .map((val) => val.as('Identifiable').as('Account').id);

    expect(existingAccounts).toContainEqual(normal);
    expect(existingAccounts).not.toContainEqual(incorrect);
});

test('transaction-committed event is triggered after AddAsset instruction has been committed', async () => {
    let closeEventsConnection: Function | undefined;

    try {
        const pipelineFilter: IrohaDataModel['iroha_data_model::events::pipeline::EventFilter'] = {
            entity: Enum.create('Some', Enum.create('Transaction')),
            hash: Enum.create('None'),
        };
        const filter: IrohaDataModel['iroha_data_model::events::EventFilter'] = Enum.create('Pipeline', pipelineFilter);

        // setting up listening
        let transactionCommittedPromise: Promise<void>;
        await new Promise<void>((resolveSubscribed, rejectSubscribed) => {
            transactionCommittedPromise = new Promise((resolveTransaction) => {
                client
                    .listenForEvents({ filter })
                    .then(({ close, ee }) => {
                        ee.on('event', (event) => {
                            event.match({
                                Pipeline({ entityType, status }) {
                                    if (entityType.is('Transaction') && status.is('Committed')) {
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
            domainName: 'wonderland',
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
