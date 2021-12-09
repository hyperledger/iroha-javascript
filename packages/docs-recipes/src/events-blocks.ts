import { Client } from '@iroha2/client';
import { EventFilter, OptionEntityType, OptionHash, Enum, FragmentOrBuilderUnwrapped } from '@iroha2/data-model';

async function listenForEachBlockCommitment({
    client,
    onCommited,
}: {
    client: Client;
    onCommited: (blockHash: Uint8Array) => void;
}): Promise<{ close: () => void }> {
    const hash: FragmentOrBuilderUnwrapped<typeof OptionHash> = Enum.empty('None');
    const entity: FragmentOrBuilderUnwrapped<typeof OptionEntityType> = Enum.valuable('Some', Enum.empty('Block'));
    const filter: FragmentOrBuilderUnwrapped<typeof EventFilter> = Enum.valuable('Pipeline', { entity, hash });

    const { close, ee } = await client.listenForEvents({
        filter: EventFilter.wrap(filter),
    });

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
