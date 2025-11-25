<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'
import { useFloating } from '../../composables/useFloating'

const props = defineProps(nodeViewProps)

const isInline = computed(() => props.node.type.name === 'sfc-inline')

// 使用浮动定位组合式函数
const { wrapperStyle } = useFloating(props)
</script>

<template>
  <NodeViewWrapper :as="isInline ? 'span' : 'div'" :style="wrapperStyle">
    <SfcLoader :text="props.node.attrs.text" />
  </NodeViewWrapper>
</template>
