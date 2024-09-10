<script setup>
const props = defineProps({
  route: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button @click="() => $router.push({ name: route })">Cliccami</button>
</template>
