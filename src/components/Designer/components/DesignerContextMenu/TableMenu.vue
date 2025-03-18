<script lang="tsx" setup>
import { EDITOR_CONTEXT } from '~/components/Editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

function deleteTable() {
  editor.value?.chain().focus().deleteTable().run()
}

function addRowAfter() {
  editor.value?.chain().focus().addRowAfter().run()
}

function addRowBefore() {
  editor.value?.chain().focus().addRowBefore().run()
}

function addColumnBefore() {
  editor.value?.chain().focus().addColumnBefore().run()
}

function addColumnAfter() {
  editor.value?.chain().focus().addColumnAfter().run()
}

function mergeOrSplit() {
  editor.value?.chain().focus().mergeOrSplit().run()
}

function deleteRow() {
  editor.value?.chain().focus().deleteRow().run()
}

function deleteColumn() {
  editor.value?.chain().focus().deleteColumn().run()
}
</script>

<template>
  <ContextMenuSub>
    <ContextMenuSubTrigger>添加行</ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem @click="addRowAfter">
        下方添加一行
      </ContextMenuItem>
      <ContextMenuItem @click="addRowBefore">
        上方添加一行
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>

  <ContextMenuSub>
    <ContextMenuSubTrigger>添加列</ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem @click="addColumnBefore">
        左方添加一列
      </ContextMenuItem>
      <ContextMenuItem @click="addColumnAfter">
        右方添加一列
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>

  <ContextMenuItem @click="mergeOrSplit">
    合并单元格
  </ContextMenuItem>
  <ContextMenuItem @click="mergeOrSplit">
    拆分单元格
  </ContextMenuItem>

  <ContextMenuSub>
    <ContextMenuSubTrigger>删除</ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem @click="deleteRow">
        删除当前行
      </ContextMenuItem>
      <ContextMenuItem @click="deleteColumn">
        删除当前列
      </ContextMenuItem>
      <ContextMenuItem @click="deleteTable">
        删除表格
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>
</template>
