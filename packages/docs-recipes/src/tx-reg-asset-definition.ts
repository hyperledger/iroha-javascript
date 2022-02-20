import { Client } from '@iroha2/client';
import { KeyPair } from '@iroha2/crypto-core';
import {
    AccountId,
    AssetDefinition,
    Expression,
    FragmentOrBuilderUnwrapped,
    Instruction,
    TransactionPayload,
    Value,
    IdentifiableBox,
    OptionU32,
    AssetValueType,
    Executable,
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
    const instruction = Instruction.variantsUnwrapped.Register({
        object: {
            expression: Expression.variantsUnwrapped.Raw(
                Value.variantsUnwrapped.Identifiable(
                    IdentifiableBox.variantsUnwrapped.AssetDefinition(assetDefinition),
                ),
            ),
        },
    });

    // wrap it all into a payload
    const payload = TransactionPayload.wrap({
        account_id: accountId,
        instructions: Executable.variantsUnwrapped.Instructions([instruction]),
        time_to_live_ms: 100_000n,
        creation_time: BigInt(Date.now()),
        metadata: new Map(),
        nonce: OptionU32.variantsUnwrapped.None,
    });

    await client.submitTransaction({
        signing: keyPair,
        payload,
    });
}

registerAssetDefinition({
    accountId: {
        name: 'Alice',
        domain_id: {
            name: 'Wonderland',
        },
    },
    assetDefinition: {
        id: {
            name: 'xor',
            domain_id: {
                name: 'Wonderland',
            },
        },
        value_type: AssetValueType.variantsUnwrapped.Quantity,
        mintable: false,
        metadata: {
            map: new Map(),
        },
    },

    // for educational purposes
    client: null as any,
    keyPair: null as any,
});
