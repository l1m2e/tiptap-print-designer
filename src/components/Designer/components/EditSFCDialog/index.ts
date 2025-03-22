export const defaultTemplate = `<script lang="jsx" setup>
import { inject } from 'vue'
import { EDITOR_CONTEXT } from 'constants'
const { data } = inject(EDITOR_CONTEXT)
</script>

<template>
  <div>{{ data }}</div>
</template>
`
