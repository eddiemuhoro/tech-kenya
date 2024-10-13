<script setup>
defineProps({
  bgColor: {
    type: String,
    default: "bg-gray-100",
  },
});
</script>

<template>
  <div :class="`${bgColor} p-6 rounded-lg shadow-md`">
    <slot></slot>
  </div>
</template>
