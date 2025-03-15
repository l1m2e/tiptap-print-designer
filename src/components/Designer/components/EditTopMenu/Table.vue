<script lang="ts" setup>
// 添加表格操作按钮带图标
import {
  Grid2x2X,
  PanelBottomClose,
  PanelLeftClose,
  PanelRightClose,
  PanelTopClose,
  TableCellsMerge,
  TableCellsSplit,
} from 'lucide-vue-next'

import { EDITOR_CONTEXT } from '~/components/Editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

// 判断光标是否在table内
const isCursorInTable = computed(() => {
  return editor.value?.isActive('table')
})

const FnButtons = [
  {
    label: '删除表格',
    icon: Grid2x2X,
    fn: () => editor.value?.chain().focus().deleteTable().run(),
  },
  {
    label: '当前列之前添加一列',
    icon: PanelLeftClose,
    fn: () => editor.value?.chain().focus().addColumnBefore().run(),
  },
  {
    label: '当前列之后添加一列',
    icon: PanelRightClose,
    fn: () => editor.value?.chain().focus().addColumnAfter().run(),
  },
  {
    label: '当前行上方添加一行',
    icon: PanelTopClose,
    fn: () => editor.value?.chain().focus().addRowBefore().run(),
  },
  {
    label: '当前行下方添加一行',
    icon: PanelBottomClose,
    fn: () => editor.value?.chain().focus().addRowAfter().run(),
  },
  {
    label: '合并单元格',
    icon: TableCellsMerge,
    fn: () => editor.value?.chain().focus().mergeOrSplit().run(),
  },
  {
    label: '拆分单元格',
    icon: TableCellsSplit,
    fn: () => editor.value?.chain().focus().splitCell().run(),
  },
]
</script>

<template>
  <div v-if="isCursorInTable">
    <TooltipProvider v-for="item in FnButtons" :key="item.label">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button size="icon" variant="ghost" @click="item.fn">
            <component :is="item.icon" />
          </Button>
        </TooltipTrigger>
        <TooltipContent> {{ item.label }} </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
