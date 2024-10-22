<script setup>
import { defineProps, computed, ref } from "vue";
const props = defineProps({
  jobs: Array,
});

const selectedCategories = ref([]);
const selectedJobTypes = ref([]);
const selectedLocations = ref([]);

console.log("selectedCategories", selectedCategories.value);

//compute categories
const categoryCounts = computed(() => {
  const categories = props.jobs.map((job) => job.category);
  return categories.reduce((acc, category) => {
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});
});

//compute jobtypes
const jobTypeCounts = computed(() => {
  const jobTypes = props.jobs.map((job) => job.jobtype);
  return jobTypes.reduce((acc, jobType) => {
    if (acc[jobType]) {
      acc[jobType]++;
    } else {
      acc[jobType] = 1;
    }
    return acc;
  }, {});
});

//location filter
const locationCounts = computed(() => {
  const locations = props.jobs.map((job) => job.location);
  return locations.reduce((acc, location) => {
    if (acc[location]) {
      acc[location]++;
    } else {
      acc[location] = 1;
    }
    return acc;
  }, {});
});

const emit = defineEmits(["apply-filters", "close"]);

const applyFilters = () => {
  // Emit the selected categories back to the parent component
  emit("apply-filters", selectedCategories.value);
};
</script>
<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-6">
    <h2 class="text-green-500 text-base font-bold">Filter Jobs</h2>
    <div class="grid grid-cols-1 gap-4 6">
      <div class="">
        <h3>Categories</h3>
        <section class="mb-4">
          <div v-for="(count, category) in categoryCounts" :key="category">
            <div>
              <input
                type="checkbox"
                :value="category"
                v-model="selectedCategories"
                class="mr-2"
              />
              <label>{{ category }} ({{ count }})</label>
            </div>
          </div>
        </section>
      </div>
      <div class="">
        <h3>Location</h3>
        <section class="mb-4">
          <div v-for="(count, location) in locationCounts" :key="location">
            <div>
              <input
                type="checkbox"
                :value="location"
                v-model="selectedLocations"
                class="mr-2"
              />
              <label>{{ location }} ({{ count }})</label>
            </div>
          </div>
        </section>
      </div>
      <div class="">
        <h3>Job Type</h3>
        <section class="mb-4">
          <div v-for="(count, jobType) in jobTypeCounts" :key="jobType">
            <div>
              <input
                type="checkbox"
                :value="jobType"
                v-model="selectedJobTypes"
                class="mr-2"
              />
              <label>{{ jobType }} ({{ count }})</label>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        @click="applyFilters"
        class="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Apply Filters
      </button>
    </div>
  </div>
</template>
