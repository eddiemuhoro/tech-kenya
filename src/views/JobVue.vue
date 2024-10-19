<script setup>
import BackButton from "@/components/BackButton.vue";
import { reactive, onMounted } from "vue";
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
    const response = await fetch(`http://localhost:3001/api/jobs/${jobId}`);
    const data = await response.json();
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    state.job = data;
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
            <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i
                class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
              ></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.job.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">NewTek Solutions</h2>

            <p class="my-2">
              NewTek Solutions is a leading technology company specializing in
              web development and digital solutions. We pride ourselves on
              delivering high-quality products and services to our clients while
              fostering a collaborative and innovative work environment.
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              contact@newteksolutions.com
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">555-555-5555</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              v-bind:to="`/job/edit/${jobId}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              @click="handleDelete(jobId)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
