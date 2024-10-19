<script setup>
import jobData from "@/jobs.json";
import { ref, onMounted, reactive } from "vue";
import JobListing from "./JobListing.vue";
import { RouterLink } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
const showAll = ref(true);
defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});
const jobs = ref([]);
const state = reactive({
  jobs: [],
  isLoading: false,
});
console.log("State jobs", state.jobs);

onMounted(async () => {
  state.isLoading = true;
  try {
    const response = await fetch("http://localhost:3001/api/jobs");
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    state.jobs = data;
    state.isLoading = false;
  } catch (err) {
    console.log("Error", err);
    state.isLoading = false;
  }
});
</script>
<template>
  <section class="bg-gray-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-green-500 text-3xl font-bold mb-6 text-center">
        Browse Jobs
      </h2>
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>
      <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
