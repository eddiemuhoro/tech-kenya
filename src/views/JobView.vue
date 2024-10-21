<script setup>
import BackButton from "@/components/BackButton.vue";
import { reactive, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useToast } from "vue-toastification";
const state = reactive({
  job: {},
  isLoading: false,
});

const router = useRoute();
const toast = useToast();

const jobId = router.params.id;

onMounted(async () => {
  state.isLoading = true;
  try {
    const response = await fetch(
      `https://api.sansadigital.com/api/jobs/${jobId}`
    );
    const data = await response.json();
    console.log(data);

    state.job = data.currentJob;
    state.isLoading = false;
  } catch (error) {
    console.log(error);
    state.isLoading = false;
  }
});

const handleDelete = async (id) => {
  const response = await fetch(`http://localhost:3001/api/jobs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    toast.success("Deleted");
    router.push("/jobs");
  } else {
    console.log("error");
  }
  console.log(id);
};
const parsedRequirements = computed(() => {
  // Parse the job requirements and responsibilities
  const parser = new DOMParser();
  const doc = parser.parseFromString(state.job.requirements, "text/html");

  // Extract all <p> tags for requirements
  const requirementsArray = Array.from(doc.querySelectorAll("p"))
    .map((p) => p.textContent.trim())
    .filter((text) => text.length > 0);

  // Extract responsibilities if there is an <h2> tag for them
  const responsibilitiesHeading = doc.querySelector("h2");
  const responsibilitiesArray = responsibilitiesHeading
    ? Array.from(
        responsibilitiesHeading.nextElementSibling.querySelectorAll("p")
      )
        .map((p) => p.textContent.trim())
        .filter((text) => text.length > 0)
    : [];

  return { requirementsArray, responsibilitiesArray };
});
</script>
<template>
  <BackButton />
  <section v-if="state.isLoading" class="text-center text-green-500 py-6">
    <PulseLoader />
  </section>
  <section v-else class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="flex justify-between items-center">
              <section class="flex space-x-2">
                <div class="flex space-x-2">
                  <p class="text-gray-500">Posted on:</p>
                  <p class="text-green-700">
                    {{ state.job.created_at?.split("T")[0] }}
                  </p>
                </div>

                <div v-if="state.job.deadline" class="mb-4 flex space-x-2">
                  <p class="text-gray-500">Dedline:</p>
                  <p class="text-green-700">
                    {{ state.job.deadline?.split("T")[0] }}
                  </p>
                </div>
              </section>
              <p class="text-green-500">
                {{ state.job.jobtype }}
              </p>
            </div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center items-center space-x-1 md:justify-start"
            >
              <i class="pi pi-map-marker text-orange-700"></i>

              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <div v-html="state.job.description" class="mb-6"></div>

            <h3 class="text-green-800 text-lg font-bold mb-6">Requirements</h3>
            <!-- Requirements Section -->
            <ul class="list-disc pl-5 mb-4">
              <li
                v-for="(
                  requirement, index
                ) in parsedRequirements.requirementsArray"
                :key="index"
              >
                {{ requirement }}
              </li>
            </ul>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">
              {{ state.job.currency }} {{ state.job.price?.toLocaleString() }}/
              <!-- splice to insert chars from the specified index, charAt to pick the specified chareacter. -->
              {{
                state.job.duration
                  ? state.job.duration.charAt(0).toUpperCase() +
                    state.job.duration.slice(1)
                  : ""
              }}
            </p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.user?.name }}</h2>

            <p class="my-2">
              Leading technology company specializing in web development and
              digital solutions. We pride ourselves on delivering high-quality
              products and services to our clients while fostering a
              collaborative and innovative work environment.
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.user?.email ?? "Not available" }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.user?.phone_number ?? "Not available" }}
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
