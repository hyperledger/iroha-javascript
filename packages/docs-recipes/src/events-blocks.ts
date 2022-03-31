import { Client } from '@iroha2/client'
import {
  EventFilter,
  OptionPipelineEntityType,
  OptionHash,
  PipelineEntityType,
  PipelineEventFilter,
} from '@iroha2/data-model'

async function listenForEachBlockCommitment({
  client,
  onCommited,
}: {
  client: Client
  onCommited: (blockHash: Uint8Array) => void
}): Promise<{ stop: () => Promise<void> }> {
  const filter = EventFilter(
    'Pipeline',
    PipelineEventFilter({
      entity: OptionPipelineEntityType('Some', PipelineEntityType('Block')),
      hash: OptionHash('None'),
    }),
  )

  const { stop, ee } = await client.listenForEvents({ filter })

  ee.on('event', (e) => {
    const pipelineEvent = e.as('Pipeline')
    if (pipelineEvent.status.is('Committed')) {
      onCommited(pipelineEvent.hash)
    }
  })

  return { stop }
}

async function main() {
  // lets listen for 5 block commits
  let commitedCount = 0

  const { stop } = await listenForEachBlockCommitment({
    // for educational purposes
    client: null as any,
    onCommited: (hash) => {
      console.log('Block is commited! Its has: %o', hash)
      commitedCount++

      if (commitedCount >= 5) stop()
    },
  })
}
