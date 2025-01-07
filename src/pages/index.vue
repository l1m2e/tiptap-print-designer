<script setup lang="ts">
const content = ref(`<p>This is still the text editor you’re used to, but enriched with node views.   </p>`)
</script>

<template>
  <Editor v-model="content" h-100vh />
</template>
