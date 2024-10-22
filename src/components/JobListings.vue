<script setup>
import jobData from "@/jobs.json";
import { ref, onMounted, reactive, computed } from "vue";
import JobListing from "./JobListing.vue";
import { RouterLink } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { apiUrl } from "@/api/baseUrl";
import FilterJobs from "./FilterJobs.vue";
const showAll = ref(true);
const showFilters = ref(false);
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

const selectedCategories = ref([]);
const selectedJobTypes = ref([]);
const selectedLocations = ref([]);

console.log("selectedCategories", selectedCategories.value);

onMounted(async () => {
  state.isLoading = true;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    state.jobs = data.data;
    state.isLoading = false;
  } catch (err) {
    console.log("Error", err);
    state.isLoading = false;
  }
});

console.log(selectedCategories.value.length);

const filteredJobs = computed(() => {
  if (selectedCategories.value.length === 0) {
    return state?.jobs; // No filters applied, show all jobs
  }
  return state?.jobs.filter((job) =>
    selectedCategories.value.includes(job.category)
  );
});

// Apply selected filters
const applyFilters = (categories) => {
  selectedCategories.value = categories;
};
</script>
<template>
  <section class="bg-gray-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-green-500 text-3xl font-bold mb-6 text-center">
          Browse Jobs
        </h2>
        <button class="text-green-500">Filter Jobs</button>
      </div>

      <section>
        <div class="flex md:flex-row space-x-2">
          <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
            <PulseLoader />
          </div>
          <div
            v-else
            class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            <JobListing
              v-for="job in filteredJobs?.slice(0, limit || state.jobs.length)"
              :key="job.id"
              :job="job"
            />
          </div>
          <div class="w-3/4">
            <FilterJobs
              :jobs="state.jobs"
              @apply-filters="applyFilters"
              @close="showFilters = false"
            />
          </div>
        </div>
      </section>
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
