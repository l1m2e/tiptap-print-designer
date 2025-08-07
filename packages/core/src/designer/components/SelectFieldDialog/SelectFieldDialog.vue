<script lang="ts" setup>
import type { Schema, SchemaTree } from '~/db/types'
import { getApiTree } from '~/db/services/printDesigner'
import { EDITOR_CONTEXT } from '~/editor/constants'
import Tree from '../SchemaTree/SchemaTree.vue'

const show = ref(false)
const node = ref<Schema>()
const tree = ref<SchemaTree>([])
const editorContent = inject(EDITOR_CONTEXT)

function insertField() {
  editorContent?.editor?.value?.chain().focus().insertContent({ type: 'field-node', attrs: { label: node.value?.description || node.value?.field, path: node.value?.path } }).run()
  show.value = false
}

async function open() {
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
    <DialogContent class="!tpd-max-w-[1200px]">
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
