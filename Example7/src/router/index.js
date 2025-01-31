import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export { router };
