<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { get } from 'radash'
import { inject } from 'vue'
import { DESIGNER_KEY } from '~/Designer'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)

const { mode, data } = inject(EDITOR_CONTEXT)!
const { openFormatDialog } = inject(DESIGNER_KEY)!

const text = computed(() => mode === 'designer' ? props.node.attrs.label : get(data.value, props.node.attrs.path))
</script>

<template>
  <NodeViewWrapper
    as="span" :class="mode === 'designer' && 'rounded-[5px] bg-purple-500 px-[4px] py-[2px] text-white'"
    :style="{ fontSize: props.node.attrs.fontSize }"
  >
    <ContextMenu v-if="mode === 'designer'" class="w-full">
      <ContextMenuTrigger>
        {{ text }}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem @select="openFormatDialog(props)">
          格式化
        </ContextMenuItem>
        <ContextMenuItem @select="props.deleteNode">
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

    <template v-else>
      <template v-if="!props.node.attrs.format">
        {{ text }}
      </template>
      <SfcLoader v-else :text="props.node.attrs.format" :value="text" />
    </template>
  </NodeViewWrapper>
</template>
