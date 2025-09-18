<script lang="ts" setup>
import { BetweenHorizonalEnd, BetweenHorizontalStart, BetweenVerticalEnd, BetweenVerticalStart, ListX, Square, SquareDashedMousePointer, TableCellsMerge, TableCellsSplit } from 'lucide-vue-next'
import DeleteColumn from '~/components/icons/DeleteColumn.vue'
import DeleteRow from '~/components/icons/DeleteRow.vue'
import { EDITOR_CONTEXT } from '~/editor/constants'
import TableCellStylePanel from './TableCellStylePanel.vue'

const { editor } = inject(EDITOR_CONTEXT)!

const btns = [
  { title: '下方添加一行', icon: BetweenVerticalStart, fn: () => editor.value?.chain().focus().addRowAfter().run() },
  { title: '上方添加一行', icon: BetweenVerticalEnd, fn: () => editor.value?.chain().focus().addRowBefore().run() },
  { title: '删除当前行', icon: DeleteRow, fn: () => editor.value?.chain().focus().deleteRow().run() },
  { title: '右方添加一列', icon: BetweenHorizontalStart, fn: () => editor.value?.chain().focus().addColumnAfter().run() },
  { title: '左方添加一列', icon: BetweenHorizonalEnd, fn: () => editor.value?.chain().focus().addColumnBefore().run() },
  { title: '删除当前列', icon: DeleteColumn, fn: () => editor.value?.chain().focus().deleteColumn().run() },
  { title: '合并单元格', icon: TableCellsMerge, fn: () => editor.value?.chain().focus().mergeCells().run() },
  { title: '拆分单元格', icon: TableCellsSplit, fn: () => editor.value?.chain().focus().splitCell().run() },
  // { title: '隐藏单元格边框', icon: SquareDashedMousePointer, fn: () => editor.value?.chain().focus().setCellAttribute('class', 'no-border').run() },
  // { title: '显示单元格边框', icon: Square, fn: () => editor.value?.chain().focus().setCellAttribute('class', '').run() },
  { title: '删除表格', icon: ListX, fn: () => editor.value?.chain().focus().deleteTable().run() },
]

const isShow = ref(false)

function refresh() {
  const ed = editor.value
  if (!ed) return
  isShow.value = ed.isActive('table')
}

onMounted(() => {
  const ed = editor.value
  if (!ed) return
  ed.on('selectionUpdate', refresh)
  ed.on('transaction', refresh)
  ed.on('update', refresh)
  onBeforeUnmount(() => {
    ed.off('selectionUpdate', refresh)
    ed.off('transaction', refresh)
    ed.off('update', refresh)
  })
})

defineExpose({
  isShow,
})
</script>

<template>
  <div v-if="isShow">
    <ActionButton v-for="item in btns" :key="item.title" v-bind="item" />
    <TableCellStylePanel />
  </div>
</template>
