<script lang="ts" setup>
import { Code2Icon, List, ListOrdered } from 'lucide-vue-next'
import { inject } from 'vue'
import { EDITOR_CONTEXT } from '../../constants'

const editorContent = inject(EDITOR_CONTEXT)

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
    title: '插入字段',
    icon: Code2Icon,
    command: () => {
      deletePreviousCharacter()?.run()
      editorContent?.openSelectFieldDialog()
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
