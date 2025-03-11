<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3'

const { editor } = defineProps<{ editor: Editor }>()

const fontSize = ref(12)
const fontSizeList = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
</script>

<template>
  <BubbleMenu
    :tippy-options="{ interactive: true, onShow }"
    :editor="editor"
    class="bg-[#ffffff] p-2 rounded shadow-md border"
  >
    <Select>
      <SelectTrigger v-model="fontSize" class="w-[100px] border-none shadow-none p-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="item in fontSizeList" :key="item" :value="item">
          {{ item }}pt
        </SelectItem>
      </SelectContent>
    </Select>
  </BubbleMenu>
</template>
