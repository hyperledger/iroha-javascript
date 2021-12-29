<script setup lang="ts">
import { SetupEventsReturn } from '@iroha2/client';
import { EntityType, EventFilter, OptionEntityType, OptionHash } from '@iroha2/data-model';
import { shallowReactive, shallowRef, computed } from 'vue';
import { bytesToHex } from 'hada';
import { client } from '../client';

const events = shallowReactive<
    {
        hash: string;
        status: string;
    }[]
>([]);

const currentListener = shallowRef<null | SetupEventsReturn>(null);
const isListening = computed(() => !!currentListener.value);

async function startListening() {
    console.log('Listening...');

    currentListener.value = await client.listenForEvents({
        filter: EventFilter.wrap(
            EventFilter.variantsUnwrapped.Pipeline({
                entity: OptionEntityType.variantsUnwrapped.Some(EntityType.variantsUnwrapped.Transaction),
                hash: OptionHash.variantsUnwrapped.None,
            }),
        ),
    });

    currentListener.value.ee.on('event', (event) => {
        const { hash, status } = event.unwrap().as('Pipeline');
        events.push({
            hash: bytesToHex([...hash]),
            status: status.match({
                Validating: () => 'validating',
                Committed: () => 'committed',
                Rejected: (_reason) => 'rejected with some reason',
            }),
        });
    });
}

function stopListening() {
    currentListener.value?.close();
    currentListener.value = null;
}
</script>

<template>
    <div>
        <p>
            <button v-if="isListening" @click="stopListening">Stop listening</button>
            <button v-else @click="startListening">Listen</button>
        </p>

        <p>Events:</p>

        <ul>
            <li v-for="{ hash, status } in events">
                Transaction <code>{{ hash }}</code> status:
                {{ status }}
            </li>
        </ul>
    </div>
</template>
