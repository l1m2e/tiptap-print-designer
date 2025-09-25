<script lang="jsx" setup>
import { EDITOR_CONTEXT } from 'TIPTAP_PRINT_DESIGNER/constants'
import { inject } from 'vue'

const { data } = inject(EDITOR_CONTEXT)
</script>

<template>
  {{ data }}
</template>
