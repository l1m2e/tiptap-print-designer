<script setup lang="ts">
import type { EditProps } from './index'
import SwaggerParser from '@apidevtools/swagger-parser'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import EditTopMenu from './components/EditTopMenu.vue'
import { EDITOR_CONTEXT } from './constants'
import extensions from './extensions'

const {
  onlyRead,
} = defineProps<EditProps>()

const content = defineModel<string>({ default: '' })

const editable = computed(() => !(onlyRead))
const editor = useEditor({
  content: content.value,
  extensions,
  onUpdate: () => content.value = editor.value?.getHTML() || '',
  editable: editable.value,
})

watch(editable, value => editor.value?.setOptions({ editable: value }))

watch(content, (val) => {
  const isSame = editor.value?.getHTML() === val
  if (isSame)
    return
  editor.value?.commands.setContent(val)
})

function focus() {
  editor.value?.commands.focus()
}

const DOCURl = ref('http://127.0.0.1:4523/export/openapi/2?version=3.0')
const MOCKURL = ref('http://127.0.0.1:4523/m1/4895776-4551570-default')
const swaggerParser = new SwaggerParser()

const { state: doc } = useAsyncState(async () => {
  const doc: any = await swaggerParser.dereference(DOCURl.value)
  return doc
}, null)

const schema = ref<any>()
const data = ref<any>()

provide(EDITOR_CONTEXT, {
  openapiDoc: doc,
  schema,
  data,
})

defineExpose({
  editor,
})
</script>

<template>
  <div class="tiptap-editor" text-black dark:border-neutral-800 dark:bg-black dark:text-white>
    <EditTopMenu v-if="editable" :editor p-sm />
    <EditorContent :editor p-sm />
  </div>
</template>

<style lang="scss">
@use './style/index.scss';
</style>
