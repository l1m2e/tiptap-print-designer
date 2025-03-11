<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import { SelectTrigger } from 'reka-ui'

const { editor } = defineProps<{ editor: Editor }>()

const fontSize = ref(12)
const fontSizeList = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24]

function onSetFontSize(size: number) {
  editor.chain().focus().setFontSize(`${size}pt`).run()
  fontSize.value = 12
}

const computedFontSize = computed(() => {
  const activeFontSize = fontSizeList.find(item => editor.isActive('textStyle', { fontSize: `${item}pt` }))
  return activeFontSize ? `${activeFontSize}pt` : '12pt'
})
</script>

<template>
  <Select v-model="fontSize">
    <SelectTrigger as-child class="w-12">
      <Button variant="ghost" class="outline-none">
        {{ computedFontSize }}
      </Button>
    </SelectTrigger>

    <SelectContent>
      <SelectItem v-for="item in fontSizeList" :key="item" :value="item" @select="() => onSetFontSize(item)">
        {{ item }}pt
      </SelectItem>
    </SelectContent>
  </Select>
</template>
