<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)

// 计算图片样式
const imageStyle = computed(() => ({
  width: props.node.attrs.width === 'auto' ? 'auto' : props.node.attrs.width,
  height: props.node.attrs.height === 'auto' ? 'auto' : props.node.attrs.height,
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  maxWidth: '100%',
}))

// 容器样式
const containerStyle = computed(() => ({
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  maxWidth: props.node.attrs.display === 'inline' ? 'none' : '100%',
}))
</script>

<template>
  <NodeViewWrapper :style="containerStyle">
    <img
      v-if="props.node.attrs.src"
      :src="props.node.attrs.src"
      :alt="props.node.attrs.alt || ''"
      :title="props.node.attrs.title || ''"
      :style="imageStyle"
      class="max-w-full tpd-h-auto"
    >
  </NodeViewWrapper>
</template>
