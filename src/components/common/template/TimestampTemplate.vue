<script lang="jsx" setup>
import { formatDate } from '@vueuse/core'
const props = defineProps(['value'])
</script>

<template>
  {{ formatDate(new Date(props.value), '$format') }}
</template>
