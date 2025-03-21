<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)
const { mode } = inject(EDITOR_CONTEXT)!
</script>

<template>
  <NodeViewWrapper as="div" :class="mode === 'designer' && 'hover:border border-dashed'">
    <SfcLoader :text="props.node.attrs.text" />
  </NodeViewWrapper>
</template>
