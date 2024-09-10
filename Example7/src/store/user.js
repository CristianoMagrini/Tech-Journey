import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user-store", {
  state: () => {
    return {
      user: "",
    };
  },
  actions: {
    async getUser(id) {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) {
        return;
      }
      const parsedJson = await response.json();
      this.user = parsedJson.message;
    },
    async getUserAxios(id) {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      if (response.status !== 200) {
        return;
      }
      this.user = response.data.message;
    },
  },
  getters: {
    userId(state) {
      return state.user?.id;
    },
    userGetter: (state) => state.user,
  },
});
