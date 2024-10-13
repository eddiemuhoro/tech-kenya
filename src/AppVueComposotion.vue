<script setup>
import { ref, onMounted } from "vue";
const name = ref("Horn Key");
const status = ref(true);
const newLang = ref("Test");
const languages = ref(["Vue", "React", "Nodejs", "Angular"]);
//TODO: continue from 0:46:00
const toggleStatus = () => {
  if (status.value === true) {
    status.value = false;
  } else if (status.value === false) {
    status.value = true;
  }
};
const addLang = () => {
  if (newLang.value !== "") {
    languages.value.push(newLang.value);
  }
};

const removeLang = (index) => {
  languages.value.splice(index, 1);
};

onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data);
    languages.value = data.map((t) => t.title);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <h1>View Job</h1>
  <p v-if="status">{{ name }}</p>
  <p v-else>No user</p>
  <form @submit.prevent="addLang">
    <input type="text" name="lang" placeholder="Language" v-model="newLang" />
    <button type="submit">Submit</button>
  </form>
  <h3>Languages</h3>
  <ul>
    <li v-for="(language, index) in languages" :key="language">
      <span> {{ language }} </span><button @click="removeLang(index)">X</button>
    </li>
  </ul>

  <button @click="toggleStatus">Change Status</button>
</template>

<style>
h1 {
  color: aqua;
}
</style>
