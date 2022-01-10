<script setup lang="ts">
import {
    Expression,
    FragmentFromBuilder,
    IdentifiableBox,
    Instruction,
    OptionU32,
    RegisterBox,
    TransactionPayload,
    Value,
} from '@iroha2/data-model';
import { ref } from 'vue';
import { client, ACCOUNT_ID, KEY_PAIR } from '../client';
import { crypto } from '@iroha2/crypto-target-web';

const domainName = ref('');
const isPending = ref(false);
const lastTxHash = ref<null | string>(null);

function memorizePayloadHash(payload: FragmentFromBuilder<typeof TransactionPayload>) {
    const bytes = payload.bytes;
    const hash = crypto.createHash(bytes);
    const hashBytes = hash.bytes();
    lastTxHash.value = Array.from(hashBytes)
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('');
    hash.free();
}

async function register() {
    try {
        isPending.value = true;

        const registerBox = RegisterBox.defineUnwrap({
            object: {
                expression: Expression.variantsUnwrapped.Raw(
                    Value.variantsUnwrapped.Identifiable(
                        IdentifiableBox.variantsUnwrapped.Domain({
                            name: domainName.value,
                            accounts: new Map(),
                            metadata: { map: new Map() },
                            asset_definitions: new Map(),
                        }),
                    ),
                ),
            },
        });

        const instruction = Instruction.variantsUnwrapped.Register(registerBox);

        const payload = TransactionPayload.wrap({
            account_id: ACCOUNT_ID,
            instructions: [instruction],
            time_to_live_ms: 100_000n,
            creation_time: BigInt(Date.now()),
            metadata: new Map(),
            nonce: OptionU32.variantsUnwrapped.None,
        });

        memorizePayloadHash(payload);

        await client.submitTransaction({
            payload,
            signing: KEY_PAIR,
        });
    } finally {
        isPending.value = false;
    }
}
</script>

<template>
    <div>
        <p><label for="domain">New domain name:</label> <input id="domain" v-model="domainName" /></p>
        <p>
            <button @click="register">Register domain{{ isPending ? '...' : '' }}</button>
        </p>
        <p v-if="lastTxHash">
            Transaction payload hash: <code>{{ lastTxHash }}</code>
        </p>
    </div>
</template>
