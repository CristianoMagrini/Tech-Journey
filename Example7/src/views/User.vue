<script setup>
import FancyAction from "@/components/FancyAction.vue";
import FancyButton from "@/components/FancyButton.vue";
import { useUserStore } from "@/store/user";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();

function getUser() {
  userStore.getUserAxios(route.params.id);
}
</script>

<template>
  <div v-if="!route.params.id">Nessun utente</div>
  <div v-else>
    <img
      v-if="userStore.userGetter"
      :src="userStore.userGetter"
      alt="immagine cane"
    />
  </div>
  <FancyAction v-if="route.params.id" @on-pressed="getUser"></FancyAction>
  <FancyButton v-if="route.params.id" :route="'home'"></FancyButton>
</template>
