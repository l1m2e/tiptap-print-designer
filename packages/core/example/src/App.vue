<script setup lang="ts">
import type { TemplateData } from 'tiptap-print-designer'
import { Designer } from 'tiptap-print-designer'

function save(val: TemplateData) {
  console.log(val)
}
</script>

<template>
  <Designer @save="save" />
</template>
