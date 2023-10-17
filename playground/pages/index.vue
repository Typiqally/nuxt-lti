<template>
  <div>
    <h1>Token received</h1>
    <div>{{ token }}</div>
  </div>
</template>

<script setup lang="ts">
import {useState} from "#app";

const token = useState("id_token")
</script>

<style scoped>

</style>
