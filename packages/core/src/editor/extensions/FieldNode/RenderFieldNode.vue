<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { inject } from 'vue'
import { get } from '~/utils'
import { useFloating } from '../../composables/useFloating'
import { useFormat } from '../../composables/useFormat'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)
const { data } = inject(EDITOR_CONTEXT)!

const text = computed(() => get(data.value, props.node.attrs.path))
const { FormatNode, isFormat } = useFormat(props)

// 使用浮动定位组合式函数
const { wrapperStyle } = useFloating(props, ['inline', 'inline-block'])
</script>

<template>
  <NodeViewWrapper as="span" :style="wrapperStyle" class="tpd-break-all tpd-whitespace-normal [text-decoration:inherit]">
    <template v-if="!isFormat">
      {{ text }}
    </template>
    <FormatNode v-else :value="text" />
  </NodeViewWrapper>
</template>
