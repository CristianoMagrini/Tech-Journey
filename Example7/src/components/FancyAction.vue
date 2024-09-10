<script setup>
const emit = defineEmits(["onPressed"]);
</script>

<template>
  <button @click="() => emit('onPressed')">Premimi</button>
</template>
