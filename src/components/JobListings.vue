<script setup>
import jobData from "@/jobs.json";
import { ref, onMounted, reactive } from "vue";
import JobListing from "./JobListing.vue";
import { RouterLink } from "vue-router";
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
  try {
    const response = await fetch("http://localhost:5000/jobs");
    const data = await response.json();
    state.jobs = data;
    console.log("daya.", state.jobs);
  } catch (err) {
    console.log("Error", err);
  }
});
</script>
<template>
  <section class="bg-gray-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-green-500 text-3xl font-bold mb-6 text-center">
        Browse Jobs
      </h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
