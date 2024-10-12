<script setup>
import { ref } from "vue";
const name = ref("Horn Key");
const status = ref(true);
const languages = ref(["Vue", "React", "Nodejs", "Angular"]);

const toggleStatus = () => {
  if (status.value === true) {
    status.value = false;
  } else if (status.value === false) {
    status.value = true;
  }
};
</script>

<template>
  <h1>View Job</h1>
  <p v-if="status">{{ name }}</p>
  <p v-else>No user</p>
  <h3>Languages</h3>
  <ul>
    <li v-for="language in languages" :key="language">{{ language }}</li>
  </ul>

  <button @click="toggleStatus">Change Status</button>
</template>

<style>
h1 {
  color: aqua;
}
</style>
