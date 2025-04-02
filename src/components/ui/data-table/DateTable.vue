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

const { columns, data, rowId = 'id' } = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  rowId?: string
  maxHeight?: string | number
}>()

const tableData = ref<any[]>([])

watchImmediate(() => data, (val: TData[]) => tableData.value = [...val], { deep: true })

const table = useVueTable({
  get data() { return tableData.value },
  get columns() { return columns },
  getRowId: originalRow => originalRow[rowId],
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    size: 100 / columns.length,
  },
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id" :style="{ width: `${header.column.getSize()}%` }">
            <FlexRender
              v-if="!header.isPlaceholder"
              :style="{ width: `${header.column.getSize()}%` }" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>

    <div :style="{ maxHeight: isNumber(maxHeight) ? `${maxHeight}px` : maxHeight }" class="overflow-y-auto">
      <Table>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" :style="{ width: `${cell.column.getSize()}%` }">
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
