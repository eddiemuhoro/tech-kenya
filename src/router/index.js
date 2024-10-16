import JobAdd from "@/components/JobAdd.vue";
import HomeView from "@/views/HomeView.vue";
import JobsVue from "@/views/JobsVue.vue";
import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsVue,
    },
    {
      path: "/jobs/add",
      name: "jobs-add",
      component: JobAdd,
    },
  ],
});

export default router;
