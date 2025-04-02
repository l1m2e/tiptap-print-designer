<script setup lang="tsx" generic="TData, TValue">
import type { ColumnDef, ColumnSizingState } from '@tanstack/vue-table'

import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

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
  get columns() { return columns },
  getRowId: originalRow => originalRow[rowId],
  getCoreRowModel: getCoreRowModel(),
  columnResizeMode: 'onChange',
  defaultColumn: {
    size: 100 / columns.length,
    maxSize: 100,
  },
})

watch(() => table.getState().columnSizing, (val: ColumnSizingState) => {
  emits('columnSizingChange', val)
})

defineExpose({
  table,
})
</script>

<template>
  <div class="max-w-full overflow-y-hidden">
    <table class="w-full">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" class="relative group" :style="{ width: `${header.column.getSize()}%` }">
            <FlexRender
              v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
            <div
              v-if="header.column.getCanResize()"
              class="absolute h-full right-0 w-1 top-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-col-resize select-none touch-none"
              :class=" `${header.column.getIsResizing() ? 'bg-green-500 opacity-100' : 'bg-violet-500'}` "
              @dblclick="() => header.column.resetSize()"
              @mousedown="(e) => header.getResizeHandler()(e)"
              @touchstart="(e) => header.getResizeHandler()(e)"
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
