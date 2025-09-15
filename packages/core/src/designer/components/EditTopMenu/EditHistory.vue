<script lang="ts" setup>
import { Redo, Undo } from 'lucide-vue-next'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

const btns = [
  {
    title: '撤销',
    icon: Undo,
    fn: () => editor.value?.chain().focus().undo().run(),
    isActive: () => editor.value?.can().undo(),
  },
  {
    title: '重做',
    icon: Redo,
    fn: () => editor.value?.chain().focus().redo().run(),
    isActive: () => editor.value?.can().redo(),
  },
]
</script>

<template>
  <ActionButton v-for="item in btns" :key="item.title" v-bind="item" :variant="item?.isActive?.() ? 'secondary' : 'ghost'" />
</template>
