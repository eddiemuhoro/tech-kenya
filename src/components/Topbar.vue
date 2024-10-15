<script setup></script>

<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-between md:items-stretch md:justify-between"
        >
          <!-- Logo -->
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1641236709008-1b30ad669194?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Vue Jobs"
          />
          <span class="hidden md:block text-white text-2xl font-bold ml-2"
            >Vue Jobs</span
          >
          <div class="md:ml-auto">
            <div class="flex space-x-4">
              <button class="text-white font-bold">Home</button>
              <button class="text-white font-bold">Jobs</button>

              <button class="text-white font-bold">Add Job</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
