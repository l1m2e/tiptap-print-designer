<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { get } from 'radash'
import { inject } from 'vue'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)

const editorContext = inject(EDITOR_CONTEXT)

const text = computed(() => editorContext?.mode === 'designer' ? props.node.attrs.label : get(editorContext?.data.value, props.node.attrs.path))
</script>

<template>
  <NodeViewWrapper
    as="span"
    :class="editorContext?.mode === 'designer' && 'rounded-[5px] bg-purple-500 px-[4px] py-[2px] text-white'"
    :style="{ fontSize: props.node.attrs.fontSize }"
  >
    {{ text }}
  </NodeViewWrapper>
</template>
