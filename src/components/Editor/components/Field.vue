<script lang="tsx" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { inject } from 'vue'

const focus = inject('focus')

console.log(focus)
</script>

<template>
  <NodeViewWrapper as="span" class="rounded-5px bg-purple px-4px py-2px text-white">
    Field
  </NodeViewWrapper>
</template>
