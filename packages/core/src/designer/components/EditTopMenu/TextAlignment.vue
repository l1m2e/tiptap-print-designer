<script lang="ts" setup>
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-vue-next'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

const btns = [
  {
    title: '左对齐',
    icon: AlignLeft,
    fn: () => editor.value?.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'left' }),
  },
  {
    title: '居中对齐',
    icon: AlignCenter,
    fn: () => editor.value?.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'center' }),
  },
  {
    title: '右对齐',
    icon: AlignRight,
    fn: () => editor.value?.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'right' }),
  },
]
</script>

<template>
  <ActionButton v-for="item in btns" :key="item.title" v-bind="item" :variant="item?.isActive?.() ? 'secondary' : 'ghost'" />
</template>
