<script setup lang="tsx" generic="TData, TValue">
import type { ColumnDef, ColumnSizingState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { useTanstackFullTableResize } from '~/composables'

const { columns, data, rowId = 'id' } = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  rowId?: string
}>()

const emits = defineEmits<{ columnSizingChange: [val: ColumnSizingState] }>()

const tableData = ref<any[]>([])

watchImmediate(() => data, (val: TData[]) => val && (tableData.value = [...val]), { deep: true })

const table = useVueTable({
  get data() { return tableData.value },
  get columns() {
    return columns.map(column => ({ ...column, size: column.size || 100 / columns.length })) as ColumnDef<TData, TValue>[]
  },
  getRowId: originalRow => originalRow[rowId],
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    minSize: 5,
  },
})

const tableRef = useTemplateRef('tableEl')
const { updateColumnSizes, getIsResizing, getCanResize } = useTanstackFullTableResize(table, tableRef)

watch(() => table.getState().columnSizing, (val: ColumnSizingState) => {
  emits('columnSizingChange', val)
})

defineExpose({
  table,
})
</script>

<template>
  <div class="tpd-max-w-full tpd-overflow-y-hidden">
    <table ref="tableEl" class="tpd-w-full">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" class="tpd-relative group" :style="{ width: `${header.column.getSize()}%` }">
            <FlexRender
              v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
            <div
              v-if="getCanResize(header.column.id)"
              class="tpd-absolute tpd-h-full tpd-right-0 tpd-w-1 tpd-top-0 tpd-opacity-0 group-hover:tpd-opacity-100 tpd-transition-opacity tpd-cursor-col-resize tpd-select-none touch-none"
              :class="`${getIsResizing(header.column.id) ? 'tpd-bg-green-500 tpd-opacity-100' : 'tpd-bg-violet-500'}` "
              @mousedown="(e) => updateColumnSizes(header.column.id, e)"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="table.getRowModel().rows?.length">
          <tr
            v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" :style="{ width: `${cell.column.getSize()}%` }">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="columns.length">
              <slot name="no-data">
                暂无数据
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
