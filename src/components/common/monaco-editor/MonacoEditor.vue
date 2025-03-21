<script setup lang="ts">
import type { MonacoEditorProps } from './index'
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor'
import { createHighlighter } from 'shiki'

const {
  language = 'json',
  config = {
    theme: 'vs-dark',
    fontSize: 14,
  },
  readOnly = false,
} = defineProps<MonacoEditorProps>()

const editContainer = ref<HTMLElement | null>(null)

const modelValue = defineModel<string>()

let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  monacoEditor = monaco.editor.create(editContainer.value as HTMLElement, {
    language,
    readOnly,
    ...config,
    tabSize: 2,
    automaticLayout: true,
  })

  monacoEditor.onDidChangeModelContent(() => {
    modelValue.value = monacoEditor?.getValue() ?? ''
  })

  initHighlighter()
})

async function initHighlighter() {
  const highlighter = await createHighlighter({
    themes: [
      'dark-plus',
    ],
    langs: [
      'javascript',
      'typescript',
      'vue',
      'json',
    ],
  })
  monaco.languages.register({ id: 'vue' })
  monaco.languages.register({ id: 'typescript' })
  monaco.languages.register({ id: 'javascript' })
  shikiToMonaco(highlighter, monaco)
}

defineExpose({
  setValue(text: string) {
    monacoEditor?.setValue(text)
  },
})
</script>

<template>
  <div ref="editContainer" />
</template>
