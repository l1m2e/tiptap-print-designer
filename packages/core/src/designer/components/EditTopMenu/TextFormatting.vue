<script lang="ts" setup>
import { Bold, Italic, Strikethrough } from 'lucide-vue-next'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

const btns = [
  {
    title: '加粗',
    icon: Bold,
    fn: () => editor.value?.chain().focus().toggleBold().run(),
    isActive: () => editor.value?.isActive('bold'),
  },
  {
    title: '斜体',
    icon: Italic,
    fn: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor.value?.isActive('italic'),
  },
  {
    title: '中划线',
    icon: Strikethrough,
    fn: () => editor.value?.chain().focus().toggleStrike().run(),
    isActive: () => editor.value?.isActive('strike'),
  },
]
</script>

<template>
  <ActionButton v-for="item in btns" :key="item.title" v-bind="item" :variant="item?.isActive?.() ? 'secondary' : 'ghost'" />
</template>
