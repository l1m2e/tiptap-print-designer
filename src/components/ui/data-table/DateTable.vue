<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { isNumber } from 'radash'
import { useDraggable } from 'vue-draggable-plus'

const { columns, data, rowId = 'id' } = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  rowId?: string
  maxHeight?: string | number
}>()

const emits = defineEmits(['update:data'])

const tableData = ref<any[]>([])
const tableBodyEl = ref()

useDraggable(tableBodyEl, tableData, { animation: 150, handle: '.handle', onUpdate: () => {
  emits('update:data', tableData.value)
} })

watchImmediate(() => data, (val: TData[]) => tableData.value = [...val], { deep: true })

const table = useVueTable({
  get data() { return tableData.value },
  get columns() {
    return columns
  },
  getRowId: originalRow => originalRow[rowId],
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    size: 0,
    minSize: 0,
  },
})
</script>

<template>
  <div class="border rounded-md overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="flex">
          <TableHead
            v-for="header in headerGroup.headers" :key="header.id"
            class="flex items-center truncate"
            :class="header.column.getSize() === 0 ? 'flex-1' : 'flex-none'"
            :style="header.column.getSize() > 0 ? { width: `${header.column.getSize()}px` } : undefined"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>

    <div :style="{ maxHeight: isNumber(maxHeight) ? `${maxHeight}px` : maxHeight }" class="overflow-y-auto">
      <Table>
        <TableBody ref="tableBodyEl">
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="flex"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()" :key="cell.id"
                class="flex items-center truncate"
                :class="cell.column.getSize() === 0 ? 'flex-1' : 'flex-none'"
                :style="cell.column.getSize() > 0 ? { width: `${cell.column.getSize()}px` } : undefined"
              >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                <slot name="no-data">
                  暂无数据
                </slot>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
