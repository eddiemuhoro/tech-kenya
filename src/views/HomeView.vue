<script setup>
import Hero from "@/components/Hero.vue";
import HomeCards from "@/components/HomeCards.vue";
import JobListings from "@/components/JobListings.vue";
</script>
<template>
  <Hero
    :title="'Get hired by companies who are looking for your skills'"
    :subTitle="'Get hired by companies who are looking for your skills'"
  />
  <HomeCards />
  <JobListings :limit="4" :showButton="true" />
</template>
