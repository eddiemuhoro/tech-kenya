<script>
export default {
  data() {
    return {
      name: "Horn Key",
      status: true,
      languages: ["Vue", "React", "Nodejs"],
    };
  },
  methods: {
    toggleStatus() {
      if (this.status === true) {
        this.status = false;
      } else if (this.status === false) {
        this.status = true;
      }
    },
  },
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
