<script setup lang="ts">
import type { EditProps } from './index'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import EditTopMenu from './components/EditTopMenu/EditTopMenu.vue'
import SelectFieldDialog from './components/SelectFieldDialog/SelectFieldDialog.vue'
import { EDITOR_CONTEXT } from './constants'
import extensions from './extensions'

const {
  mode = 'designer',
  data,
} = defineProps<EditProps>()

const content = defineModel<string>({ default: '' })

const editor = useEditor({
  content: content.value,
  extensions,
  onUpdate: () => content.value = editor.value?.getHTML() || '',
})

watch(content, (val) => {
  const { from, to } = editor.value!.state.selection
  editor.value?.commands.setContent(val, false, { preserveWhitespace: true })
  editor.value?.commands.setTextSelection({ from, to })
})

const SelectFieldDialogRef = useTemplateRef('SelectFieldDialogEl')
function openSelectFieldDialog() {
  SelectFieldDialogRef.value?.open()
}

provide(EDITOR_CONTEXT, {
  mode,
  data: computed(() => data),
  editor,
  openSelectFieldDialog,
})

const editorContentClass = computed(() => mode === 'designer' ? 'p-4' : 'pointer-events-none')
defineExpose({
  editor,
})
</script>

<template>
  <div v-if="editor" class="tiptap-editor" text-black dark:border-neutral-800 dark:bg-black dark:text-white>
    <EditTopMenu v-if="mode === 'designer'" :editor />
    <EditorContent :editor :class="editorContentClass" />
    <SelectFieldDialog ref="SelectFieldDialogEl" />
  </div>
</template>

<style lang="css">
@import './style/index.css';
</style>
