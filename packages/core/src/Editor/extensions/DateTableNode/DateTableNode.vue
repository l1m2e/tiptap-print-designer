<script setup lang="tsx">
import type { ColumnDef, ColumnSizingState } from '@tanstack/vue-table'
import type { Format } from '~/Designer/components/FormatDialog/common'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { get } from 'radash'
import SfcLoader from '~/components/common/sfc-loader/SfcLoader.vue'
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

interface Columns { header: string, accessorKey: string, id: string, format: Format | undefined }

const tableList = computed<any[]>(() => get(data.value, props.node.attrs.path) || [])
const columns = computed(() => {
  const parseColumns = JSON.parse(props.node.attrs.columns)
  return parseColumns.map((column: Columns): ColumnDef<any> => ({
    ...column,
    cell: ({ row }) => {
      const props = { value: row.original[column.accessorKey], row: row.original, table: data.value, text: column.format?.template || '' }
      return column.format ? <SfcLoader {...props} /> : row.original[column.accessorKey]
    },
  }))
})

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
