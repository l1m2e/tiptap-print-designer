<script lang="ts" setup>
import { SelectTrigger } from 'reka-ui'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

const lineHeightList = ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '3']

function onSetLineHeight(height: string) {
  editor.value?.chain().focus().updateAttributes('paragraph', { lineHeight: height }).run()
}

const computedLineHeight = computed(() => {
  const active = lineHeightList.find(item => editor.value?.isActive('paragraph', { lineHeight: item }))
  return active || '1.5'
})
</script>

<template>
  <Select>
    <SelectTrigger as-child class="tpd-w-12">
      <Button variant="ghost" class="tpd-outline-none">
        {{ computedLineHeight }}
      </Button>
    </SelectTrigger>

    <SelectContent>
      <SelectItem
        v-for="item in lineHeightList"
        :key="item"
        :value="item"
        @select="() => onSetLineHeight(item)"
      >
        {{ item }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
