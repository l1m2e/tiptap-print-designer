<script setup lang="ts">
import type { EditProps } from './index'
import { EditorContent, useEditor } from '@tiptap/vue-3'

import EditTopMenu from './components/EditTopMenu/EditTopMenu.vue'
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
  editable: mode === 'designer',
})

watch(content, (val) => {
  const isSame = editor.value?.getHTML() === val
  if (isSame)
    return
  editor.value?.commands.setContent(val)
})

provide(EDITOR_CONTEXT, {
  mode,
  data: computed(() => data),
})

defineExpose({
  editor,
})
</script>

<template>
  <div class="tiptap-editor" text-black dark:border-neutral-800 dark:bg-black dark:text-white>
    <EditTopMenu v-if="mode === 'designer'" :editor />
    <EditorContent :editor />
  </div>
</template>

<style lang="css">
@import './style/index.css';
</style>
