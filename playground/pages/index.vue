<template>
  <div>
    <h1>Token received</h1>
    <div>{{ token }}</div>
  </div>
</template>

<script setup lang="ts">
import {useAsyncData, useRequestEvent, useState} from "#app";
import useLti from "../../src/runtime/composables/use-lti";

const { readCallback, validateCallback } = useLti()

const { data } = await useAsyncData(async () => {
	if (!process.server) {
		return
	}

	const event = useRequestEvent()
	return await readCallback(event)
})

if (process.client && data.value?.idToken) {
	const callback = data.value
	const validation = validateCallback(callback)

	if (validation) {
		useState("id_token", () => callback?.idToken)
	}
}

const token = useState("id_token")
</script>

<style scoped>

</style>
