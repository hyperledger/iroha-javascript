import { Client } from '@iroha2/client';
import { KeyPair } from '@iroha2/crypto-core';
import {
    AccountId,
    AssetDefinition,
    Expression,
    FragmentOrBuilderUnwrapped,
    Instruction,
    TransactionPayload,
    Enum,
} from '@iroha2/data-model';

async function registerAssetDefinition({
    client,
    keyPair,
    accountId,
    assetDefinition,
}: {
    client: Client;
    keyPair: KeyPair;
    accountId: FragmentOrBuilderUnwrapped<typeof AccountId>;
    assetDefinition: FragmentOrBuilderUnwrapped<typeof AssetDefinition>;
}): Promise<void> {
    const expression: FragmentOrBuilderUnwrapped<typeof Expression> = Enum.valuable(
        'Raw',
        Enum.valuable('Identifiable', Enum.valuable('AssetDefinition', assetDefinition)),
    );

    const instruction: FragmentOrBuilderUnwrapped<typeof Instruction> = Enum.valuable('Register', {
        object: { expression },
    });

    // wrap it all into a payload
    const payload = TransactionPayload.wrap({
        account_id: accountId,
        instructions: [instruction],
        time_to_live_ms: 100_000n,
        creation_time: BigInt(Date.now()),
        metadata: new Map(),
        nonce: Enum.empty('None'),
    });

    const result = await client.submitTransaction({ signing: keyPair, payload });

    if (!result.is('Ok')) {
        throw result.as('Err');
    }
}

registerAssetDefinition({
    accountId: {
        name: 'Alice',
        domain_name: 'Wonderland',
    },
    assetDefinition: {
        id: {
            name: 'xor',
            domain_name: 'Wonderland',
        },
        value_type: Enum.empty('Quantity'),
        mintable: false,
        metadata: { map: new Map() },
    },

    // for educational purposes
    client: null as any,
    keyPair: null as any,
});
