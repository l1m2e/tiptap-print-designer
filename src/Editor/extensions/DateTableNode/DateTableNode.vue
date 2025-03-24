<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { get } from 'radash'
import { DESIGNER_KEY } from '~/Designer'
import { EDITOR_CONTEXT } from '../../constants'
import DateTable from './DateTable.vue'

const props = defineProps(nodeViewProps)
const { mode, data } = inject(EDITOR_CONTEXT)!
const { openEditSFCDialog } = inject(DESIGNER_KEY)!

function edit() {
  openEditSFCDialog(props.node.attrs.text)
}

const tableList = computed(() => get(data.value, props.node.attrs.path))
const columns = computed(() => JSON.parse(props.node.attrs.columns))

function ddelete() {
  props.deleteNode()
}

console.log(columns.value, tableList.value)
</script>

<template>
  <NodeViewWrapper as="div">
    <ContextMenu v-if="mode === 'designer'" class="w-full">
      <ContextMenuTrigger>
        <div class="border border-dashed border-violet-500 rounded p-2 w-full">
          <DateTable :columns="columns" :data="tableList" />
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

    <!-- <DateTable v-else :columns="columns" :data="tableList" /> -->
  </NodeViewWrapper>
</template>
