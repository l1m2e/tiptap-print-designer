<script lang="tsx" setup>
import type { Editor } from '@tiptap/core'
import type { ActionButtonProps } from '~/components/common/action-button'
import { isActive } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/vue-3'
import { BetweenHorizonalEnd, BetweenHorizontalStart, BetweenVerticalEnd, BetweenVerticalStart, Grid2X2, Grid2x2X, TableCellsMerge, TableRowsSplit } from 'lucide-vue-next'
import { sticky } from 'tippy.js'
import DeleteColumn from '~/components/icons/DeleteColumn.vue'
import DeleteRow from '~/components/icons/DeleteRow.vue'
import { EDITOR_CONTEXT } from '../../constants'

const { editor, mode } = inject(EDITOR_CONTEXT)!

const rowList: ActionButtonProps[] = [
  { title: '下方添加一行', icon: BetweenVerticalStart, fn: () => editor.value?.chain().focus().addRowAfter().run() },
  { title: '上方添加一行', icon: BetweenVerticalEnd, fn: () => editor.value?.chain().focus().addRowBefore().run() },
  { title: '删除当前行', icon: DeleteRow, fn: () => editor.value?.chain().focus().deleteRow().run() },
]

const colList: ActionButtonProps[] = [
  { title: '右方添加一列', icon: BetweenHorizontalStart, fn: () => editor.value?.chain().focus().addColumnAfter().run() },
  { title: '左方添加一列', icon: BetweenHorizonalEnd, fn: () => editor.value?.chain().focus().addColumnBefore().run() },
  { title: '删除当前列', icon: DeleteColumn, fn: () => editor.value?.chain().focus().deleteColumn().run() },
]

const actionList: ActionButtonProps[] = [
  { title: '合并单元格', icon: TableCellsMerge, fn: () => editor.value?.chain().focus().mergeCells().run() },
  { title: '拆分单元格', icon: TableRowsSplit, fn: () => editor.value?.chain().focus().splitCell().run() },
  { title: '隐藏表格边框', icon: Grid2x2X, fn: () => editor.value?.chain().focus().setCellAttribute('class', 'no-border').run() },
  { title: '显示表格边框', icon: Grid2X2, fn: () => editor.value?.chain().focus().setCellAttribute('class', '').run() },
]

function shouldShow({ editor }: { editor: Editor }) {
  return isActive(editor.view.state, 'table')
}

function getReferenceClientRect() {
  const {
    view,
    state: {
      selection: { from },
    },
  } = editor.value!

  const node = view.domAtPos(from).node as HTMLElement
  if (!node) {
    return new DOMRect(-1000, -1000, 0, 0)
  }

  const tableWrapper = node?.closest?.('.tableWrapper')
  if (!tableWrapper) {
    return new DOMRect(-1000, -1000, 0, 0)
  }

  const rect = tableWrapper.getBoundingClientRect()

  return rect
}
</script>

<template>
  <BubbleMenu
    v-if="editor && mode === 'designer'" :editor="editor" :should-show :update-delay="0"
    :tippy-options="{
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      maxWidth: 'auto',
      getReferenceClientRect,
      plugins: [sticky],
      sticky: 'popper',
    }"
  >
    <div class="bg-white  rounded border shadow-sm flex  items-center p-1">
      <ActionButton v-for="item in rowList" :key="item.title" v-bind="item" />
      <Separator orientation="vertical" class="mx-2 h-5" />
      <ActionButton v-for="item in colList" :key="item.title" v-bind="item" />
      <Separator orientation="vertical" class="mx-2 h-5" />
      <ActionButton v-for="item in actionList" :key="item.title" v-bind="item" />
    </div>
  </BubbleMenu>
</template>
