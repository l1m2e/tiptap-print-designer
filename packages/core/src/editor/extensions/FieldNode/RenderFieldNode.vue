<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { get } from 'radash'
import { inject } from 'vue'
import { useFormat } from '../../composables/useFormat'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)
const { data } = inject(EDITOR_CONTEXT)!

const text = computed(() => get(data.value, props.node.attrs.path))
const { FormatNode, isFormat } = useFormat(props)
</script>

<template>
  <NodeViewWrapper as="span" :style="{ fontSize: props.node.attrs.fontSize }">
    <template v-if="!isFormat">
      {{ text }}
    </template>
    <FormatNode v-else :value="text" />
  </NodeViewWrapper>
</template>
