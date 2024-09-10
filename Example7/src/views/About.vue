<script setup>
import TitleVue from "@/components/Title.vue";
import FancyButton from "@/components/FancyButton.vue";
</script>

<template>
  <TitleVue :title="'About'"></TitleVue>
  <FancyButton :route="'user'"></FancyButton>
</template>
