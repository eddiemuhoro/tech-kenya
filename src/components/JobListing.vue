<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  job: {
    type: Object,
  },
});

const showFullDescription = ref(false);

// Function to strip HTML tags for truncation
function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// Computed property to handle full and truncated descriptions
const truncatedDescription = computed(() => {
  let description = props.job.description;

  if (!showFullDescription.value) {
    const plainTextDescription = stripHtml(description); // Strip HTML tags
    if (plainTextDescription.length > 130) {
      return plainTextDescription.substring(0, 130) + "...";
    }
    return plainTextDescription; // If less than 130 characters, no need to truncate
  }

  return description; // Show full description with HTML
});

// Toggle function to show/hide full description
const toggleShowFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>

      <div class="mb-5">
        <div v-html="truncatedDescription"></div>
        <!-- Display HTML content -->
        <button
          @click="toggleShowFullDescription"
          class="text-green-500 text-sm"
        >
          {{ !showFullDescription ? "More" : "Less" }}
        </button>
      </div>

      <div class="flex justify-between items-center">
        <div class="text-gray-500 mb-2">
          <i class="pi pi-calendar text-green-500"></i>
          {{ job.created_at.split("T")[0] }}
        </div>
      </div>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-orange-700"></i>
          {{ job.location }}
        </div>
        <RouterLink
          :to="`/jobs/${job.id}`"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
