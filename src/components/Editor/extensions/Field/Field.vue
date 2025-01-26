<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { inject } from 'vue'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)

const editorContext = inject(EDITOR_CONTEXT)
</script>

<template>
  <NodeViewWrapper as="span" class="rounded-5px bg-purple px-4px py-2px text-white">
    {{ props.node.attrs.label }}
  </NodeViewWrapper>
</template>
