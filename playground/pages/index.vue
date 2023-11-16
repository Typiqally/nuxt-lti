<template>
	<div>
		<h1>Token received</h1>
		<div>{{ token }}</div>
	</div>
</template>

<script setup lang="ts">
import {useState} from "#app";
import useLti from "../../src/runtime/composables/use-lti";

const {handleCallback} = useLti()
const callback = await handleCallback()
const token = useState("id_token", () => callback?.idToken)
</script>

<style scoped>

</style>
