<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { DESIGNER_KEY } from '~/designer'

const props = defineProps(nodeViewProps)
const { openEditSFCDialog } = inject(DESIGNER_KEY)!

function edit() {
  openEditSFCDialog(props.node.attrs.text)
}

function ddelete() {
  props.deleteNode()
}
</script>

<template>
  <NodeViewWrapper as="div">
    <ContextMenu class="w-full">
      <ContextMenuTrigger>
        <div class="border border-dashed border-violet-500 rounded p-2 w-full">
          <SfcLoader :text="props.node.attrs.text" />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem @select="edit">
          编辑组件
        </ContextMenuItem>
        <ContextMenuItem @select="ddelete">
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </NodeViewWrapper>
</template>
