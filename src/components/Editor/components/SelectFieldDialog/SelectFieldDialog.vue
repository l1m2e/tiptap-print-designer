<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import type { Schema, SchemaTree } from '../SchemaTree'
import Tree from '../SchemaTree/SchemaTree.vue'
import { getApiTree } from '~/db/services/printDesigner'

let editor: Editor | undefined
const show = ref(false)
const node = ref<Schema>()
const tree = ref<SchemaTree>([])

function insertField() {
  editor?.chain().focus().insertContent({ type: 'field', attrs: { label: node.value?.description || node.value?.field, path: node.value?.path } }).run()
  show.value = false
}

async function open(openEditor: Editor | undefined) {
  editor = openEditor
  tree.value = await getApiTree()
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
    <DialogContent class="max-w-[1200px]">
      <DialogHeader>
        <DialogTitle>插入字段</DialogTitle>
      </DialogHeader>
      <Tree :tree @select="select" />

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
