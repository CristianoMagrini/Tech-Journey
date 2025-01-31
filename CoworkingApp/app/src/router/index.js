import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import MyBookings from "../views/Home/MyBookings.vue";
import LoginView from "../views/LoginView.vue";
import RoomDetail from "../views/RoomDetail.vue";
import HomeLayout from "../views/HomeLayout.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      children: [
        { path: "", name: "home", component: Home },
        { path: "my-bookings", name: "my-bookings", component: MyBookings },
        { path: "room/:roomId", name: "room-detail", component: RoomDetail },
      ],
      component: HomeLayout,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  if (to.name !== "login" && !authStore.isAuthenticated) {
    return {
      name: "login",
    };
  }
});

export default router;
