import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import HomeLayout from "@/views/layouts/HomeLayout.vue";
import User from "@/views/User.vue";

const routes = [
  {
    name: "root",
    path: "/",
    children: [
      {
        name: "home",
        path: "",
        component: Home,
      },
      {
        name: "about",
        path: "about",
        component: About,
      },
    ],
    component: HomeLayout,
  },
  {
    name: "user",
    path: "/user",
    component: User,
  },
  {
    name: "userDetail",
    path: "/user/:id",
    component: User,
  },
];

export { routes };
