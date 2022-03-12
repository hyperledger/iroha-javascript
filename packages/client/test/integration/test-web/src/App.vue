<script setup lang="ts">
import CreateDomain from './components/CreateDomain.vue';
import Listener from './components/Listener.vue';
import StatusChecker from './components/StatusChecker.vue';
</script>

<template>
    <StatusChecker />
    <hr>
    <CreateDomain />
    <hr>
    <Listener />
</template>

<style lang="scss">
#app {
    padding: 16px;
    font-family: sans-serif;
}
</style>
