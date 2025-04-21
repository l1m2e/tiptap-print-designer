<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)
</script>

<template>
  <NodeViewWrapper as="div">
    <SfcLoader :text="props.node.attrs.text" />
  </NodeViewWrapper>
</template>
