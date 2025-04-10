<script lang="jsx" setup>
import { inject } from 'vue'
import { EDITOR_CONTEXT } from '~/constants'

const { value } = defineProps(['table','row','value'])
</script>

<template>
  {{ value }}
</template>
