<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { useTask } from '@vue-kakuyaku/core'
import { client } from '../client'

const { state, run } = useTask(() => client.torii.getStatus(), { immediate: true })
useIntervalFn(run, 1000)
</script>

<template>
  <div>
    <h3>Status</h3>

    <ul v-if="state.fulfilled">
      <li>Blocks: {{ state.fulfilled.value.blocks }}</li>
      <li>Uptime (sec): {{ state.fulfilled.value.uptime.secs }}</li>
    </ul>
  </div>
</template>
