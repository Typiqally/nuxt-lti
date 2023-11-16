<template>
	<div>Loading LTI...</div>
</template>

<script setup lang="ts">
import {useRuntimeConfig} from "#app";
import useLti from "../../../src/runtime/composables/use-lti";

const {launch} = useLti()

const runtimeConfig = useRuntimeConfig()
launch(runtimeConfig.redirectUri)
</script>
