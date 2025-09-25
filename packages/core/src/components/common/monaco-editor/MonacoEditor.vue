<script setup lang="ts">
import type { MonacoEditorProps } from './index'

const {
  language = 'json',
  config = {
    theme: 'vs-dark',
    fontSize: 14,
  },
  readOnly = false,
} = defineProps<MonacoEditorProps>()

const emits = defineEmits<{ ready: [] }>()

const editContainer = ref<HTMLElement | null>(null)
const modelValue = defineModel<string>()

let monaco: typeof import('monaco-editor') | null = null
let monacoEditor: import('monaco-editor').editor.IStandaloneCodeEditor | null = null
let pendingValue: string | null = null

onMounted(async () => {
  if (typeof window === 'undefined') return
  await initEditor()
})

async function initEditor() {
  const [monacoMod, shikiMod, shikiMonacoMod, langVueMod, langTsxMod, langJsxMod] = await Promise.all([
    import('monaco-editor'),
    import('shiki'),
    import('@shikijs/monaco'),
    import('shiki/langs/vue.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/jsx.mjs'),
  ])
  monaco = monacoMod
  const { createHighlighter } = shikiMod
  const { shikiToMonaco } = shikiMonacoMod
  const langVue = langVueMod.default
  const langTsx = langTsxMod.default
  const langJsx = langJsxMod.default

  monacoEditor = monaco.editor.create(editContainer.value as HTMLElement, {
    language,
    readOnly,
    ...config,
    tabSize: 2,
    automaticLayout: true,
  })

  if (pendingValue != null) {
    monacoEditor.setValue(pendingValue)
    pendingValue = null
  }

  monacoEditor.onDidChangeModelContent(() => {
    modelValue.value = monacoEditor?.getValue() ?? ''
  })

  const highlighter = await createHighlighter({
    themes: ['dark-plus'],
    langs: [langVue, langTsx, langJsx, 'javascript', 'typescript', 'json'],
  })
  monaco.languages.register({ id: 'vue' })
  monaco.languages.register({ id: 'typescript' })
  monaco.languages.register({ id: 'javascript' })
  shikiToMonaco(highlighter, monaco)
  emits('ready')
}

defineExpose({
  setValue(text: string) {
    if (monacoEditor) monacoEditor.setValue(text)
    else pendingValue = text
  },
})
</script>

<template>
  <div ref="editContainer" />
</template>
