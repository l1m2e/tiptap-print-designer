<script lang="ts" setup>
import { Code2Icon, Codepen, Image, List, ListOrdered, Table } from 'lucide-vue-next'
import { inject } from 'vue'
import { DESIGNER_KEY } from '~/designer'
import { EDITOR_CONTEXT } from '../../constants'

const editorContent = inject(EDITOR_CONTEXT)
const { openEditSFCDialog, openSelectFieldDialog, openDateTableDialog } = inject(DESIGNER_KEY)!

function deletePreviousCharacter() {
  const { state } = editorContent?.editor?.value || {}
  if (state) {
    const from = state.selection.from - 1
    const to = state.selection.from
    return editorContent?.editor.value?.chain().focus().deleteRange({ from, to })
  }
}

const commandList = [
  {
    title: '字段',
    icon: Code2Icon,
    command: () => {
      deletePreviousCharacter()?.run()
      openSelectFieldDialog()
    },
  },
  {
    title: '图片',
    icon: Image,
    command: () => {
      deletePreviousCharacter()?.run()
      // 插入一个空的图片节点，用户可以通过UI上传或输入URL
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
    command: () => deletePreviousCharacter()?.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    title: '数据表格',
    icon: Table,
    command: () => {
      deletePreviousCharacter()?.run()
      openDateTableDialog()
    },
  },
  {
    title: '组件',
    icon: Codepen,
    command: () => {
      deletePreviousCharacter()?.run()
      openEditSFCDialog()
    },
  },
  {
    title: '有序列表',
    icon: ListOrdered,
    command: () => deletePreviousCharacter()?.toggleOrderedList().run(),
  },
  {
    title: '无序列表',
    icon: List,
    command: () => deletePreviousCharacter()?.toggleBulletList().run(),
  },
]

onKeyStroke('Escape', () => deletePreviousCharacter()?.run())
</script>

<template>
  <Command class="shadow-sm border">
    <CommandList>
      <CommandGroup>
        <CommandItem
          v-for="(item, index) in commandList" :key="index"
          :value="item"
          @select="() => item.command()"
        >
          <div class="flex items-center">
            <component :is="item.icon" class="mr-2" />
            <span>{{ item.title }}</span>
          </div>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
