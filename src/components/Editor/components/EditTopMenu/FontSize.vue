<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import { SelectTrigger } from 'reka-ui'

const { editor } = defineProps<{ editor: Editor }>()

const fontSize = ref(12)
const fontSizeList = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24]

watch(fontSize, (newSize) => {
  if (editor) {
    editor.chain().focus().setMark('textStyle', { fontSize: `${newSize}pt` }).run()
  }
})
</script>

<template>
  <Select v-model="fontSize">
    <SelectTrigger as-child class="w-12">
      <Button variant="ghost" class="outline-none">
        {{ fontSize }} pt
      </Button>
    </SelectTrigger>

    <SelectContent>
      <SelectItem v-for="item in fontSizeList" :key="item" :value="item">
        {{ item }}pt
      </SelectItem>
    </SelectContent>
  </Select>
</template>
