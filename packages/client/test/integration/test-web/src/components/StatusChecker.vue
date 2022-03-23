<script setup lang="ts">
import { useIntervalFn, useAsyncState } from '@vueuse/core'
import { client } from '../client'

const { state: status, execute: updateStatus } = useAsyncState(() => client.getStatus(), null, {
  resetOnExecute: false,
})

useIntervalFn(() => updateStatus(), 1000)
</script>

<template>
  <div>
    <h3>Status</h3>

    <ul v-if="status">
      <li>Blocks: {{ status.blocks }}</li>
      <li>Uptime (sec): {{ status.uptime.secs }}</li>
    </ul>
  </div>
</template>
