<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script setup>
import {useRequestEvent, useState} from "#app";
import useLti from "../src/runtime/composables/use-lti";

if (process.server) {
  const {readCallback} = useLti()
  const event = useRequestEvent()
  const callback = await readCallback(event)

  const state = useState("id_token")
  state.value = callback.idToken
}
</script>
