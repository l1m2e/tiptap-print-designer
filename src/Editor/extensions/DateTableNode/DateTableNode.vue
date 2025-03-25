<script setup lang="ts">
import type { ColumnSizingState } from '@tanstack/vue-table'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { get } from 'radash'
import { DESIGNER_KEY } from '~/Designer'
import { EDITOR_CONTEXT } from '../../constants'
import DataTable from './DataTable.vue'

const props = defineProps(nodeViewProps)
const { mode, data } = inject(EDITOR_CONTEXT)!
const { openDateTableDialog } = inject(DESIGNER_KEY)!

const DataTableRef = useTemplateRef('DataTableEl')
function edit() {
  openDateTableDialog({ path: props.node.attrs.path, columns: props.node.attrs.columns })
}

const tableList = computed<any[]>(() => get(data.value, props.node.attrs.path) || [])
const columns = computed(() => JSON.parse(props.node.attrs.columns))

function ddelete() {
  props.deleteNode()
}

function handleColumnSizingChange(val: ColumnSizingState) {
  props.updateAttributes({ columnSizingState: JSON.stringify(val) })
}

watchImmediate(() => props.node.attrs.columnSizingState, async () => {
  await nextTick()
  DataTableRef.value?.table.setColumnSizing(JSON.parse(props.node.attrs.columnSizingState))
})
</script>

<template>
  <NodeViewWrapper as="div">
    <ContextMenu v-if="mode === 'designer'" class="w-full">
      <ContextMenuTrigger>
        <div class="border border-dashed border-violet-500 rounded p-2 w-full">
          <DataTable ref="DataTableEl" :columns="columns" :data="tableList" @column-sizing-change="handleColumnSizingChange" />
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

    <DataTable v-else ref="DataTableEl" :columns="columns" :data="tableList " />
  </NodeViewWrapper>
</template>
