<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'
import { useFloating } from '../../composables/useFloating'

const props = defineProps(nodeViewProps)
const { wrapperStyle, layout } = useFloating(props)

// 计算图片样式
const imageStyle = computed(() => ({
  width: layout.value.width === 'auto' ? 'auto' : layout.value.width,
  height: layout.value.height === 'auto' ? 'auto' : layout.value.height,
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  maxWidth: layout.value.isFloating ? 'none' : '100%',
}))

// 容器样式
const containerStyle = computed(() => ({
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  maxWidth: props.node.attrs.display === 'inline' ? 'none' : '100%',
  ...(layout.value.isFloating ? { ...wrapperStyle.value, width: layout.value.width, margin: 0, lineHeight: 0 } : {}),
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
