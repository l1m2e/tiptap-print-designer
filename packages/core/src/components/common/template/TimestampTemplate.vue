<script lang="jsx" setup>
import { formatDate } from 'TIPTAP_PRINT_DESIGNER/utils'

const { value } = defineProps(['value'])
</script>

<template>
  {{ formatDate(new Date(value), '$format') }}
</template>
