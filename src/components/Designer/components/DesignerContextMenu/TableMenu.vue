<script lang="tsx" setup>
import { EDITOR_CONTEXT } from '~/components/Editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

function toggleTableBorder() {
  editor.value?.chain().focus().setCellAttribute('class', 'bg-red-500').run()
}
</script>

<template>
  <ContextMenuSub>
    <ContextMenuSubTrigger>添加行</ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem @click="editor?.chain().focus().addRowAfter().run()">
        下方添加一行
      </ContextMenuItem>
      <ContextMenuItem @click="editor?.chain().focus().addRowBefore().run()">
        上方添加一行
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>

  <ContextMenuSub>
    <ContextMenuSubTrigger>添加列</ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem @click="editor?.chain().focus().addColumnBefore().run()">
        左方添加一列
      </ContextMenuItem>
      <ContextMenuItem @click="editor?.chain().focus().addColumnAfter().run()">
        右方添加一列
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>

  <ContextMenuItem @click="editor?.chain().focus().mergeCells().run()">
    合并单元格
  </ContextMenuItem>
  <ContextMenuItem @click="editor?.chain().focus().splitCell().run()">
    拆分单元格
  </ContextMenuItem>
  <ContextMenuItem @click="() => toggleTableBorder()">
    隐藏表格边框
  </ContextMenuItem>

  <ContextMenuSub>
    <ContextMenuSubTrigger>删除</ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem @click="editor?.chain().focus().deleteRow().run()">
        删除当前行
      </ContextMenuItem>
      <ContextMenuItem @click="editor?.chain().focus().deleteColumn().run()">
        删除当前列
      </ContextMenuItem>
      <ContextMenuItem @click="editor?.chain().focus().deleteTable().run()">
        删除表格
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>
</template>
