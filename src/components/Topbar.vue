<script setup>
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
const toast = useToast();
const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
const showWarning = () => {
  toast.warning("Coming soon");
};
</script>

<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-between md:items-stretch md:justify-between"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img
              class="h-10 w-auto rounded-full"
              src="https://images.unsplash.com/photo-1641236709008-1b30ad669194?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Vue Jobs"
            />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">
              Tech Jobs
            </span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') ? 'bg-green-900 text-white' : 'text-white',
                  'hover:bg-green-900 hover:text-white rounded-md px-3 py-2',
                ]"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs')
                    ? 'bg-green-900 text-white'
                    : 'text-white',
                  'hover:bg-green-900 hover:text-white rounded-md px-3 py-2',
                ]"
              >
                Jobs
              </RouterLink>
              <RouterLink
                to="#"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'bg-green-900 text-white'
                    : 'text-gray-400',
                  'hover:bg-green-900 hover:text-white rounded-md px-3 py-2',
                ]"
                @click="showWarning"
              >
                Add Job
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
