<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)

const isInline = computed(() => props.node.type.name === 'sfc-inline')
const wrapperStyle = computed(() => {
  if (props.node.attrs.isFloating) {
    return {
      position: 'absolute',
      left: `${props.node.attrs.x || 0}px`,
      top: `${props.node.attrs.y || 0}px`,
      zIndex: props.node.attrs.zIndex || 1,
    } as Record<string, string | number>
  }
  return {
    display: isInline.value ? 'inline-block' : 'block',
  }
})
</script>

<template>
  <NodeViewWrapper :as="isInline ? 'span' : 'div'" :style="wrapperStyle">
    <SfcLoader :text="props.node.attrs.text" />
  </NodeViewWrapper>
</template>
