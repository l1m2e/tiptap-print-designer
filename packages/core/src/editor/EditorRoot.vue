<script lang="tsx" setup>
import { useEditor } from '@tiptap/vue-3'
import { EDITOR_CONTEXT } from './constants'
import { loadEditorExtensions } from './extensions'

type EditProps = {
  /** 模式 */
  mode?: 'designer' | 'viewer'
  /** 数据 */
  data?: any
}

const {
  mode = 'designer',
  data,
} = defineProps<EditProps>()

const content = defineModel<string>({ default: '' })

const editor = useEditor({
  content: content.value,
  parseOptions: { preserveWhitespace: true },
  extensions: loadEditorExtensions(mode),
  onUpdate: () => content.value = editor.value?.getHTML() || '',
})

watch(content, (val) => {
  const { from, to } = editor.value!.state.selection
  editor.value?.commands.setContent(val, { parseOptions: { preserveWhitespace: true }, emitUpdate: false })
  editor.value?.commands.setTextSelection({ from, to })
})

provide(EDITOR_CONTEXT, {
  mode,
  data: computed(() => data),
  editor,
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
