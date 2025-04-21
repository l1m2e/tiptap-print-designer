<script setup lang="tsx">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Format } from '~/designer/components/FormatDialog/common'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { get } from 'radash'
import SfcLoader from '~/components/common/sfc-loader/SfcLoader.vue'
import { EDITOR_CONTEXT } from '../../constants'
import DataTable from './DataTable.vue'

const props = defineProps(nodeViewProps)
const { data } = inject(EDITOR_CONTEXT)!

const DataTableRef = useTemplateRef('DataTableEl')

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

watchImmediate(() => props.node.attrs.columnSizingState, async () => {
  await nextTick()
  DataTableRef.value?.table.setColumnSizing(JSON.parse(props.node.attrs.columnSizingState))
})
</script>

<template>
  <NodeViewWrapper as="div">
    <DataTable ref="DataTableEl" :columns="columns" :data="tableList" />
  </NodeViewWrapper>
</template>
