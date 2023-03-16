<script setup lang="ts">
import { build } from '@iroha2/client'
import { pipe } from 'fp-ts/function'
import { ref } from 'vue'
import { client, toriiPre } from '../client'
import { useTask } from '@vue-kakuyaku/core'

const domainName = ref('')

const { state, run: registerDomain } = useTask(async () => {
  // we can `await` pipe because the last function returns a `Promise`
  await pipe(
    build.identifiable.newDomain(domainName.value),
    build.instruction.register,
    build.executable.instruction,
    (exec) => client.submitExecutable(toriiPre, exec),
  )
})
</script>

<template>
  <div>
    <h3>Create Domain</h3>
    <p>
      <label for="domain">New domain name:</label> <input
        id="domain"
        v-model="domainName"
      >
    </p>
    <p>
      <button @click="registerDomain()">
        Register domain{{ state.pending ? '...' : '' }}
      </button>
    </p>
  </div>
</template>
