import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { AxiosRequestConfig, AxiosError } from "axios";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    init() {
      this.token = localStorage.getItem("coworking-token");
    },
    async login(form) {
      if (!form["username"] || !form["password"]) {
        return false;
      }
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "auth/login",
        data: {
          username: form["username"],
          password: form["password"],
        },
        method: "POST",
      } as AxiosRequestConfig);
      if (response instanceof AxiosError) {
        return false;
      }
      this.token = response.token;
      localStorage.setItem("coworking-token", this.token);
      return true;
    },
    async register(form) {
      if (!form["username"] || !form["password"] || !form["email"]) {
        return false;
      }
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "auth/signup",
        data: {
          username: form["username"],
          password: form["password"],
          email: form["email"],
        },
        method: "POST",
      });
      if (response instanceof AxiosError) {
        return false;
      }
      this.login(form);
      return true;
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});
