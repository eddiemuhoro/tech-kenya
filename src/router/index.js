import JobAdd from "@/components/JobAdd.vue";
import HomeView from "@/views/HomeView.vue";
import JobEdit from "@/views/JobEdit.vue";
import JobsVue from "@/views/JobsVue.vue";
import JobVue from "@/views/JobVue.vue";
import NotFound from "@/views/NotFound.vue";
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
    {
      path: "/jobs/:id",
      name: "job",
      component: JobVue,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound,
    },
    {
      path: "/job/edit/:id",
      name: "edit-job",
      component: JobEdit,
    },
  ],
});

export default router;
