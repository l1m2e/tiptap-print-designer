<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import { AlignCenter, AlignLeft, AlignRight, Bold, Braces, Database, Italic, List, ListOrdered, Redo, Settings, Strikethrough, Undo } from 'lucide-vue-next'
import SelectFieldDialog from '../SelectFieldDialog/SelectFieldDialog.vue'
import SettingDialog from '../SettingDialog/SettingDialog.vue'
import FontSize from './FontSize.vue'
import TextAndHeading from './TextAndHeading.vue'

const { editor } = defineProps<{ editor: Editor }>()

const SelectFieldDialogRef = useTemplateRef('SelectFieldDialogEl')
const DataSourcesDialogRef = useTemplateRef('DataSourcesDialogEl')
const SettingDialogRef = useTemplateRef('SettingDialogEl')

const FnButtons = [
  {
    label: '加粗',
    icon: Bold,
    fn: () => editor?.chain().focus().toggleBold().run(),
    isActive: () => editor?.isActive('bold'),
  },
  {
    label: '斜体',
    icon: Italic,
    fn: () => editor?.chain().focus().toggleItalic().run(),
    isActive: () => editor?.isActive('italic'),
  },
  {
    label: '中划线',
    icon: Strikethrough,
    fn: () => editor?.chain().focus().toggleStrike().run(),
    isActive: () => editor?.isActive('strike'),
  },
  {
    label: '无序列表',
    icon: List,
    fn: () => editor?.chain().focus().toggleBulletList().run(),
    isActive: () => editor?.isActive('bulletList'),
  },
  {
    label: '有序列表',
    icon: ListOrdered,
    fn: () => editor?.chain().focus().toggleOrderedList().run(),
    isActive: () => editor?.isActive('orderedList'),
  },
  {
    label: '左对齐',
    icon: AlignLeft,
    fn: () => editor?.chain().focus().setTextAlign('left').run(),
    isActive: () => editor?.isActive({ textAlign: 'left' }),
  },
  {
    label: '居中对齐',
    icon: AlignCenter,
    fn: () => editor?.chain().focus().setTextAlign('center').run(),
    isActive: () => editor?.isActive({ textAlign: 'center' }),
  },
  {
    label: '右对齐',
    icon: AlignRight,
    fn: () => editor?.chain().focus().setTextAlign('right').run(),
    isActive: () => editor?.isActive({ textAlign: 'right' }),
  },
  {
    label: '撤销',
    icon: Undo,
    fn: () => editor?.chain().focus().undo().run(),
    isActive: () => editor?.can().undo(),
  },
  {
    label: '重做',
    icon: Redo,
    fn: () => editor?.chain().focus().redo().run(),
    isActive: () => editor?.can().redo(),
  },
  {
    label: '插入字段',
    icon: Braces,
    fn: () => SelectFieldDialogRef.value?.open(editor),
  },
]

function setDataSources() {
  DataSourcesDialogRef.value?.open()
}
</script>

<template>
  <div v-if="editor" class="flex items-center justify-between flex-justify-between border-b border-neutral-200 p-2 dark:border-neutral-800 h-[54px]">
    <div class="flex items-center">
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

    <div class="flex items-center flex-justify-between">
      <Button variant="outline" size="icon" class="mr-2" @click="setDataSources">
        <Database />
      </Button>
      <Button variant="outline" size="icon" @click="SettingDialogRef?.open">
        <Settings />
      </Button>
    </div>

    <SettingDialog ref="SettingDialogEl" />
    <SelectFieldDialog ref="SelectFieldDialogEl" />
    <DataSourcesDialog ref="DataSourcesDialogEl" />
  </div>
</template>
