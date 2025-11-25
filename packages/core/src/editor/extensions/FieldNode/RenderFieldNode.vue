<script lang="tsx" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { inject } from 'vue'
import { get } from '~/utils'
import { useFormat } from '../../composables/useFormat'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)
const { data } = inject(EDITOR_CONTEXT)!

const text = computed(() => get(data.value, props.node.attrs.path))
const { FormatNode, isFormat } = useFormat(props)

const markClasses = computed(() => {
  const marks = props.node.content.firstChild?.marks || []
  const classes = []
  if (marks.some(m => m.type.name === 'bold')) classes.push('tpd-font-bold')
  if (marks.some(m => m.type.name === 'italic')) classes.push('tpd-italic')
  if (marks.some(m => m.type.name === 'underline')) classes.push('tpd-underline')
  if (marks.some(m => m.type.name === 'strike')) classes.push('tpd-line-through')
  return classes.join(' ')
})
</script>

<template>
  <NodeViewWrapper as="span" :style="{ fontSize: props.node.attrs.fontSize }">
    <NodeViewContent as="span" class="tpd-absolute tpd-w-0 tpd-h-0 tpd-text-[0px]" />
    <span :class="markClasses">
      <template v-if="!isFormat">
        {{ text }}
      </template>
      <FormatNode v-else :value="text" />
    </span>
  </NodeViewWrapper>
</template>
