<script setup lang="ts">
import {
  BTreeMapAccountIdAccount,
  BTreeMapAssetDefinitionIdAssetDefinitionEntry,
  BTreeMapNameValue,
  Domain,
  EvaluatesToIdentifiableBox,
  Executable,
  Expression,
  DomainId,
  IdentifiableBox,
  Instruction,
  Metadata,
  OptionIpfsPath,
  RegisterBox,
  Value,
  VecInstruction,
} from '@iroha2/data-model'
import { ref } from 'vue'
import { client } from '../client'

const domainName = ref('')
const isPending = ref(false)

async function register() {
  try {
    isPending.value = true

    await client.submit(
      Executable(
        'Instructions',
        VecInstruction([
          Instruction(
            'Register',
            RegisterBox({
              object: EvaluatesToIdentifiableBox({
                expression: Expression(
                  'Raw',
                  Value(
                    'Identifiable',
                    IdentifiableBox(
                      'Domain',
                      Domain({
                        id: DomainId({
                          name: domainName.value,
                        }),
                        accounts: BTreeMapAccountIdAccount(new Map()),
                        metadata: Metadata({ map: BTreeMapNameValue(new Map()) }),
                        asset_definitions: BTreeMapAssetDefinitionIdAssetDefinitionEntry(new Map()),
                        logo: OptionIpfsPath('None'),
                      }),
                    ),
                  ),
                ),
              }),
            }),
          ),
        ]),
      ),
    )
  } finally {
    isPending.value = false
  }
}
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
      <button @click="register">
        Register domain{{ isPending ? '...' : '' }}
      </button>
    </p>
  </div>
</template>
