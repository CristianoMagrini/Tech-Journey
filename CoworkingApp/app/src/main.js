import "./assets/main.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";
import router from "./router";

const app = createApp(App);
app.use(createPinia());
app.use(router);
const authStore = useAuthStore();
authStore.init();
app.mount("#app");
