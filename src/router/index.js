import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/jobs",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
