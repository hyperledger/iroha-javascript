<script setup lang="ts">
import { SetupEventsReturn } from '@iroha2/client'
import {
  FilterBox,
  OptionHash,
  OptionPipelineEntityKind,
  OptionPipelineStatusKind,
  PipelineEntityKind,
  PipelineEventFilter,
  PipelineStatusKind,
} from '@iroha2/data-model'
import { computed, onBeforeUnmount, shallowReactive, shallowRef } from 'vue'
import { bytesToHex } from 'hada'
import { client } from '../client'

interface EventData {
  hash: string
  status: string
}

const events = shallowReactive<EventData[]>([])

const currentListener = shallowRef<null | SetupEventsReturn>(null)

const isListening = computed(() => !!currentListener.value)

async function startListening() {
  currentListener.value = await client.torii.listenForEvents({
    filter: FilterBox(
      'Pipeline',
      PipelineEventFilter({
        entity_kind: OptionPipelineEntityKind('Some', PipelineEntityKind('Transaction')),
        status_kind: OptionPipelineStatusKind('Some', PipelineStatusKind('Committed')),
        hash: OptionHash('None'),
      }),
    ),
  })

  currentListener.value.ee.on('event', (event) => {
    const { hash, status } = event.as('Pipeline')
    events.push({
      hash: bytesToHex([...hash]),
      status: status.match({
        Validating: () => 'validating',
        Committed: () => 'committed',
        Rejected: (_reason) => 'rejected with some reason',
      }),
    })
  })
}

async function stopListening() {
  await currentListener.value?.stop()
  currentListener.value = null
}

onBeforeUnmount(stopListening)
</script>

<template>
  <div>
    <h3>Listening</h3>

    <p>
      <button @click="isListening ? stopListening() : startListening()">
        {{ isListening ? 'Stop' : 'Listen' }}
      </button>
    </p>

    <p>Events:</p>

    <ul class="events-list">
      <li
        v-for="{ hash, status } in events"
        :key="hash"
      >
        Transaction <code>{{ hash }}</code> status:
        {{ status }}
      </li>
    </ul>
  </div>
</template>
