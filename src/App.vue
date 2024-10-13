<script setup>
import Topbar from "@/components/Topbar.vue";
import Hero from "@/components/Hero.vue";
import HomeCards from "./components/HomeCards.vue";
import JobListings from "./components/JobListings.vue";

const title = "Become a Web Dev";
</script>
<template>
  <Topbar />
  <Hero />
  <HomeCards />
  <JobListings :limit="4" />
</template>
