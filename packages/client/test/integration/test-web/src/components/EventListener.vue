<script setup lang="ts">
import { SetupEventsReturn, Torii } from '@iroha2/client'
import {
  FilterBox,
  OptionHash,
  OptionPipelineEntityKind,
  OptionPipelineStatusKind,
  PipelineEntityKind,
  PipelineEventFilter,
  PipelineStatus,
  PipelineStatusKind,
} from '@iroha2/data-model'
import { computed, onBeforeUnmount, shallowReactive, shallowRef } from 'vue'
import { toriiPre } from '../client'

function bytesToHex(bytes: number[]): string {
  return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

interface EventData {
  hash: string
  status: string
}

const events = shallowReactive<EventData[]>([])

const currentListener = shallowRef<null | SetupEventsReturn>(null)

const isListening = computed(() => !!currentListener.value)

function displayStatus(status: PipelineStatus): string {
  switch (status.enum.tag) {
    case 'Validating':
      return 'validating'
    case 'Committed':
      return 'committed'
    case 'Rejected':
      return 'rejected with some reason'
  }
}

async function startListening() {
  currentListener.value = await Torii.listenForEvents(toriiPre, {
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
    const { hash, status } = event.enum.as('Pipeline')
    events.push({
      hash: bytesToHex([...hash.more_significant_bits, hash.least_significant_byte]),
      status: displayStatus(status),
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
