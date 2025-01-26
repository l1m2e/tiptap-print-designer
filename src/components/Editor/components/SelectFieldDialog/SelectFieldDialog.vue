<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import type { Schema } from '../SchemaTree'
import { EDITOR_CONTEXT } from '../../constants'
import SchemaTree from '../SchemaTree/SchemaTree.vue'

let editor: Editor | undefined
const show = ref(false)
const editorContext = inject(EDITOR_CONTEXT)
const node = ref<Schema>()

function insertField() {
  editor?.chain().focus().insertContent({ type: 'field', attrs: { label: node.value?.description || node.value?.field, path: node.value?.path } }).run()
  show.value = false
}

function open(openEditor: Editor | undefined) {
  editor = openEditor
  show.value = true
}

function select(val: Schema) {
  node.value = val
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="max-w-1200px!">
      <DialogHeader>
        <DialogTitle>插入字段</DialogTitle>
      </DialogHeader>
      <SchemaTree :tree="editorContext?.schemaTree.value" @select="select" />

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button @click="insertField">
          选择
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
