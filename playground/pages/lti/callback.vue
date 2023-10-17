<template>
  <div>
    <h1>Received callback</h1>
    <div>{{ ltiMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import {readLtiMessage} from "../../../src/runtime/composables/read-lti-message";
import {useRequestEvent} from "#app";

const event = useRequestEvent()
const ltiMessage = await readLtiMessage(event)
</script>

<style scoped>

</style>
