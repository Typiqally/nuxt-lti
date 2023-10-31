<template>
	<div>Loading LTI...</div>
</template>

<script setup lang="ts">
import {useAsyncData, useRequestEvent} from "#app";
import useLti from "../../../src/runtime/composables/use-lti";

const { prepareLaunch, launch } = useLti()

const { data } = await useAsyncData(async () => {
	if (!process.server) {
		return
	}

	const runtimeConfig = useRuntimeConfig()
	const event = useRequestEvent()

	return await prepareLaunch(event, runtimeConfig.redirectUri)
})

if (process.client && data.value != null) {
	launch(data.value)
}
</script>
