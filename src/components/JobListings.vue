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
  return state?.jobs.filter((job) => {
    const matchesCategory = selectedCategories.value.length
      ? selectedCategories.value.includes(job.category)
      : true;

    const matchesJobType = selectedJobTypes.value.length
      ? selectedJobTypes.value.includes(job.jobtype)
      : true;

    const matchesLocation = selectedLocations.value.length
      ? selectedLocations.value.includes(job.location)
      : true;

    return matchesCategory && matchesJobType && matchesLocation;
  });
});

// Apply selected filters
const applyFilters = ({ categories, jobTypes, locations }) => {
  selectedCategories.value = categories;
  selectedJobTypes.value = jobTypes;
  selectedLocations.value = locations;
};
</script>
<template>
  <section class="bg-gray-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-green-500 text-3xl font-bold mb-6 text-center">
        Browse Jobs
      </h2>

      <section>
        <div class="flex flex-col-reverse md:flex-row gap-2">
          <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
            <PulseLoader />
          </div>
          <div
            v-else
            :class="`grid grid-cols-1 gap-4 md:grid-cols-3  lg:${
              showButton ? 'grid-cols-4' : 'grid-cols-3'
            }`"
          >
            <JobListing
              v-for="job in filteredJobs?.slice(0, limit || state.jobs.length)"
              :key="job.id"
              :job="job"
            />
          </div>
          <div v-if="!showButton" class="md:w-3/4">
            <FilterJobs :jobs="state.jobs" @apply-filters="applyFilters" />
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
