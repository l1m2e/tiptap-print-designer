<script lang="ts" setup>
import { Code2Icon, Codepen, Image, List, ListOrdered, Table } from 'lucide-vue-next'
import { inject } from 'vue'
import { DESIGNER_KEY } from '~/designer'
import { EDITOR_CONTEXT } from '~/editor/constants'

const editorContent = inject(EDITOR_CONTEXT)
const { openEditSFCDialog, openSelectFieldDialog, openDateTableDialog } = inject(DESIGNER_KEY) || {}

const commandList = [
  {
    title: '字段',
    icon: Code2Icon,
    command: () => openSelectFieldDialog?.(),
  },
  {
    title: '图片',
    icon: Image,
    command: () => {
      editorContent?.editor.value?.chain().focus().insertContent({
        type: 'resizable-image',
        attrs: {
          src: '',
          alt: '',
          title: '',
          width: 'auto',
          height: 'auto',
          display: 'block',
        },
      }).run()
    },
  },
  {
    title: '表格',
    icon: Table,
    command: () => editorContent?.editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    title: '数据表格',
    icon: Table,
    command: () => openDateTableDialog?.(),
  },
  {
    title: '组件',
    icon: Codepen,
    command: () => openEditSFCDialog?.(),
  },
  {
    title: '有序列表',
    icon: ListOrdered,
    command: () => editorContent?.editor.value?.chain().focus().toggleOrderedList().run(),
  },
  {
    title: '无序列表',
    icon: List,
    command: () => editorContent?.editor.value?.chain().focus().toggleBulletList().run(),
  },
]
</script>

<template>
  <ContextMenu class="tpd-w-full">
    <ContextMenuTrigger>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem
        v-for="(item, index) in commandList"
        :key="index"
        @select="item.command"
      >
        <div class="tpd-flex tpd-items-center">
          <component :is="item.icon" class="tpd-mr-2 tpd-h-4 tpd-w-4" />
          <span>{{ item.title }}</span>
        </div>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
