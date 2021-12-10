import { Client } from '@iroha2/client';
import {
    EventFilter,
    OptionEntityType,
    OptionHash,
    EntityType,
} from '@iroha2/data-model';

async function listenForEachBlockCommitment({
    client,
    onCommited,
}: {
    client: Client;
    onCommited: (blockHash: Uint8Array) => void;
}): Promise<{ close: () => void }> {
    const filter = EventFilter.wrap(
        EventFilter.variantsUnwrapped.Pipeline({
            entity: OptionEntityType.variantsUnwrapped.Some(
                EntityType.variantsUnwrapped.Block,
            ),
            hash: OptionHash.variantsUnwrapped.None,
        }),
    );

    const { close, ee } = await client.listenForEvents({ filter });

    ee.on('event', (e) => {
        const pipelineEvent = e.unwrap().as('Pipeline');
        if (pipelineEvent.status.is('Committed')) {
            onCommited(pipelineEvent.hash);
        }
    });

    return { close };
}

async function main() {
    // lets listen for 5 block commits
    let commitedCount = 0;

    const { close } = await listenForEachBlockCommitment({
        // for educational purposes
        client: null as any,
        onCommited: (hash) => {
            console.log('Block is commited! Its has: %o', hash);
            commitedCount++;

            if (commitedCount >= 5) close();
        },
    });
}
