<script lang="jsx" setup>
import { formatDate } from '@vueuse/core'
const {value} = defineProps(['value'])
</script>

<template>
  {{ formatDate(new Date(value), '$format') }}
</template>
