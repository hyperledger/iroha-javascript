import { Client } from '@iroha2/client';
import { KeyPair } from '@iroha2/crypto-core';
import {
    AccountId,
    Asset,
    FragmentOrBuilderUnwrapped,
    QueryBox,
    QueryPayload,
} from '@iroha2/data-model';

async function findAllAssets(
    client: Client,
    accountId: FragmentOrBuilderUnwrapped<typeof AccountId>,
    keyPair: KeyPair,
): Promise<FragmentOrBuilderUnwrapped<typeof Asset>[]> {
    const result = await client.makeQuery({
        payload: QueryPayload.wrap({
            query: QueryBox.variantsUnwrapped.FindAllAssets(null),
            timestamp_ms: BigInt(Date.now()),
            account_id: accountId,
        }),
        signing: keyPair,
    });

    return result
        .as('Ok')
        .unwrap()
        .as('Vec')
        .map((x) => x.as('Identifiable').as('Asset'));
}
