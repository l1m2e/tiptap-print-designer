<script setup lang="ts">
import type { MonacoEditorProps } from './index'
import { defineEmits, defineExpose, defineModel, defineProps, onMounted, ref, watch } from 'vue'

const {
  language = 'json',
  config = {
    theme: 'vs-dark',
    fontSize: 14,
  },
  readOnly = false,
} = defineProps<MonacoEditorProps>()

const emits = defineEmits<{ ready: [] }>()
const modelValue = defineModel<string>()
const editContainer = ref<HTMLElement | null>(null)

let monaco: typeof import('monaco-editor') | null = null
let monacoEditor: import('monaco-editor').editor.IStandaloneCodeEditor | null = null

onMounted(async () => {
  if (typeof window === 'undefined') return
  await initEditor()

  // 外部修改 modelValue -> 回填到 editor
  watch(modelValue, (val) => {
    if (monacoEditor && monacoEditor.getValue() !== val) {
      monacoEditor.setValue(val || '')
    }
  })
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

  monacoEditor = monaco.editor.create(editContainer.value as HTMLElement, {
    language,
    readOnly,
    ...config,
    tabSize: 2,
    automaticLayout: true,
  })

  // 初始化写入 v-model 初始值
  if (modelValue.value != null) {
    monacoEditor.setValue(modelValue.value)
  }

  // 编辑器内容 -> 同步到 v-model
  monacoEditor.onDidChangeModelContent(() => {
    modelValue.value = monacoEditor?.getValue() ?? ''
  })

  // 高亮增强
  const { createHighlighter } = shikiMod
  const { shikiToMonaco } = shikiMonacoMod
  const langVue = langVueMod.default
  const langTsx = langTsxMod.default
  const langJsx = langJsxMod.default

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

// 暴露方法
defineExpose({
  setValue(text: string) {
    if (monacoEditor) monacoEditor.setValue(text)
  },
})
</script>

<template>
  <div ref="editContainer" style="width: 100%; height: 100%;" />
</template>
