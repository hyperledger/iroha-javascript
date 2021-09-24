import { init as initCryptoWasm, Multihash, KeyPair, PublicKey, PrivateKey } from '@iroha2/crypto';
import { startPeer, setConfiguration, clearConfiguration, StartPeerReturn } from '@iroha2/test-peer';
import { delay } from '../util';
import { client_config, peer_config, peer_genesis, peer_trusted_peers, PIPELINE_MS } from '../config';
import {
    createClient,
    Enum,
    Result,
    iroha_data_model_account_Id_Encodable,
    iroha_data_model_asset_AssetDefinition_Encodable,
    iroha_data_model_asset_DefinitionId_Encodable,
    iroha_data_model_events_EventFilter_Encodable,
    iroha_data_model_events_pipeline_EventFilter_Encodable,
    iroha_data_model_isi_Instruction_Encodable,
    iroha_data_model_isi_RegisterBox_Encodable,
    iroha_data_model_query_Payload_Encodable,
    iroha_data_model_query_QueryBox_Encodable,
    iroha_data_model_transaction_Payload_Encodable,
    iroha_data_model_Value_Encodable,
    iroha_data_model_isi_MintBox_Encodable,
    iroha_data_model_IdBox_Encodable,
    iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable,
    iroha_data_model_asset_DefinitionId_Decoded,
    iroha_data_model_asset_AssetValueType_Encodable,
} from '../../../src/lib';
import JSBI from 'jsbi';
import fs from 'fs/promises';
import { hexToBytes } from 'hada';
import { Seq } from 'immutable';

const client = createClient({
    toriiURL: client_config.toriiURL,
});

let keyPair: KeyPair;

function wrapInstruction(
    item: iroha_data_model_isi_Instruction_Encodable,
): iroha_data_model_transaction_Payload_Encodable {
    return {
        instructions: [item],
        time_to_live_ms: JSBI.BigInt(100_000),
        creation_time: JSBI.BigInt(Date.now()),
        metadata: new Map(),
        account_id: client_config.account,
    };
}

function wrapQuery(query: iroha_data_model_query_QueryBox_Encodable): iroha_data_model_query_Payload_Encodable {
    return {
        query,
        account_id: client_config.account,
        timestamp_ms: JSBI.BigInt(Date.now()),
    };
}

async function addAsset(
    definitionid: iroha_data_model_asset_DefinitionId_Encodable,
    assetType: iroha_data_model_asset_AssetValueType_Encodable = Enum.create('BigQuantity'),
) {
    const definition: iroha_data_model_asset_AssetDefinition_Encodable = {
        id: definitionid,
        value_type: assetType,
        metadata: { map: new Map() },
    };

    const createAsset: iroha_data_model_isi_RegisterBox_Encodable = {
        object: {
            expression: Enum.create('Raw', Enum.create('Identifiable', Enum.create('AssetDefinition', definition))),
        },
    };

    await client.submitTransaction({
        payload: wrapInstruction(Enum.create('Register', createAsset)),
        signing: keyPair!,
    });
}

async function addAccount(accountId: iroha_data_model_account_Id_Encodable) {
    const registerBox: iroha_data_model_isi_RegisterBox_Encodable = {
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

async function submitMint(mintBox: iroha_data_model_isi_MintBox_Encodable) {
    await client.submitTransaction({
        payload: wrapInstruction(Enum.create('Mint', mintBox)),
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

beforeAll(async () => {
    await clearConfiguration();

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

beforeEach(async () => {
    await killStartedPeer();
    startedPeer = await startPeer();
});

afterAll(async () => {
    await killStartedPeer();
    await clearConfiguration();
});

test('Peer is healthy', async () => {
    expect(await client.checkHealth()).toEqual(Enum.create('Ok', null) as Result<null, Error>);
});

test('AddAsset instruction with name length more than limit is not committed', async () => {
    type AssetDefinitionId = iroha_data_model_asset_DefinitionId_Encodable;

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
        payload: wrapQuery(Enum.create('FindAllAssetsDefinitions', null)),
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
    type AccountId = iroha_data_model_account_Id_Encodable;

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
        payload: wrapQuery(Enum.create('FindAllAccounts', null)),
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
        const pipelineFilter: iroha_data_model_events_pipeline_EventFilter_Encodable = {
            entity: Enum.create('Some', Enum.create('Transaction')),
            hash: Enum.create('None'),
        };
        const filter: iroha_data_model_events_EventFilter_Encodable = Enum.create('Pipeline', pipelineFilter);

        // setting up listening
        let transactionCommittedPromise: Promise<void>;
        await new Promise<void>((resolveSubscribed, rejectSubscribed) => {
            transactionCommittedPromise = new Promise((resolveTransaction) => {
                client
                    .listenForEvents({ filter })
                    .then(({ close, ee }) => {
                        ee.on('event', (event) => {
                            event.match({
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
    const ASSET_DEFINITION_ID: iroha_data_model_asset_DefinitionId_Decoded = {
        name: 'xor',
        domain_name: 'wonderland',
    };
    await addAsset(ASSET_DEFINITION_ID, Enum.create('Fixed'));
    await pipelineStepDelay();

    // Adding mint
    const DECIMAL = '512.5881';
    const mintValue: iroha_data_model_Value_Encodable = Enum.create('Fixed', [DECIMAL]);
    const idBox: iroha_data_model_IdBox_Encodable = Enum.create('AssetId', {
        account_id: client_config.account,
        definition_id: ASSET_DEFINITION_ID,
    });
    await submitMint({
        object: { expression: Enum.create('Raw', mintValue) },
        destination_id: { expression: Enum.create('Raw', Enum.create('Id', idBox)) },
    });
    await pipelineStepDelay();

    // Checking added asset via query
    const expressionEvalToAccountId: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable = {
        expression: Enum.create('Raw', Enum.create('Id', Enum.create('AccountId', client_config.account))),
    };
    const result = await client.makeQuery({
        payload: wrapQuery(Enum.create('FindAssetsByAccountId', { account_id: expressionEvalToAccountId })),
        signing: keyPair,
    });

    // Assert
    const asset = Seq(result.as('Ok').as('Vec'))
        .map((x) => x.as('Identifiable').as('Asset'))
        .find((x) => x.id.definition_id.name === ASSET_DEFINITION_ID.name);
    expect(asset).toBeTruthy();
    expect(asset!.value.is('Fixed')).toBe(true);
    expect(asset!.value.as('Fixed')[0]).toBe(DECIMAL);
});
