<script lang="ts" setup>
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Redo, Strikethrough, Undo } from 'lucide-vue-next'
import { EDITOR_CONTEXT } from '~/components/Editor/constants'

import FontSize from './FontSize.vue'
import TextAndHeading from './TextAndHeading.vue'

const { editor } = inject(EDITOR_CONTEXT)!

const FnButtons = [
  {
    label: '加粗',
    icon: Bold,
    fn: () => editor.value?.chain().focus().toggleBold().run(),
    isActive: () => editor.value?.isActive('bold'),
  },
  {
    label: '斜体',
    icon: Italic,
    fn: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor.value?.isActive('italic'),
  },
  {
    label: '中划线',
    icon: Strikethrough,
    fn: () => editor.value?.chain().focus().toggleStrike().run(),
    isActive: () => editor.value?.isActive('strike'),
  },
  {
    label: '左对齐',
    icon: AlignLeft,
    fn: () => editor.value?.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'left' }),
  },
  {
    label: '居中对齐',
    icon: AlignCenter,
    fn: () => editor.value?.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'center' }),
  },
  {
    label: '右对齐',
    icon: AlignRight,
    fn: () => editor.value?.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'right' }),
  },
  {
    label: '撤销',
    icon: Undo,
    fn: () => editor.value?.chain().focus().undo().run(),
    isActive: () => editor.value?.can().undo(),
  },
  {
    label: '重做',
    icon: Redo,
    fn: () => editor.value?.chain().focus().redo().run(),
    isActive: () => editor.value?.can().redo(),
  },
]
</script>

<template>
  <div v-if="editor" class="flex items-center">
    <TextAndHeading :editor="editor" class="mr-sm" />
    <FontSize :editor="editor" />

    <TooltipProvider v-for="item in FnButtons" :key="item.label">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="ml-sm" size="icon" :variant="item?.isActive?.() ? 'secondary' : 'ghost'" @click="item.fn">
            <component :is="item.icon" />
          </Button>
        </TooltipTrigger>
        <TooltipContent> {{ item.label }} </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
