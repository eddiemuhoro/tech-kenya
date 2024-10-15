<script setup>
defineProps({
  title: {
    type: String,
    //if no prop is passed from the parent
    default: "Become a Vue Dev",
  },
  subTitle: {
    type: String,
    default: "Find the Vue job that fits your skills and needs",
  },
});
</script>
<template>
  <section class="bg-green-700 py-20 mb-4">
    <div
      class="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl md: text-6x1">
          {{ title }}
        </h1>
        <p class="my-4 text-xl text-white">
          {{ subTitle }}
        </p>
      </div>
    </div>
  </section>
</template>
