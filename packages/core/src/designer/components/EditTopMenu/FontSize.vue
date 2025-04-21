<script lang="ts" setup>
import { SelectTrigger } from 'reka-ui'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

const fontSizeList = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt']

function onSetFontSize(size: string) {
  editor.value?.chain().focus().setFontSize(size).run()
}

const computedFontSize = computed(() => {
  const activeFontSize = fontSizeList.find(item => editor.value?.isActive('textStyle', { fontSize: item }))
  return activeFontSize || '12pt'
})
</script>

<template>
  <Select>
    <SelectTrigger as-child class="w-12">
      <Button variant="ghost" class="outline-none">
        {{ computedFontSize }}
      </Button>
    </SelectTrigger>

    <SelectContent>
      <SelectItem v-for="item in fontSizeList" :key="item" :value="item" @select="() => onSetFontSize(item)">
        {{ item }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
