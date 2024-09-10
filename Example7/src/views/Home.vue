<script setup>
import TitleVue from "@/components/Title.vue";
import FancyButton from "@/components/FancyButton.vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
</script>

<template>
  {{ userStore.userGetter }}
  <TitleVue :title="'Homepage'"></TitleVue>
  <FancyButton :route="'user'"></FancyButton>
</template>
