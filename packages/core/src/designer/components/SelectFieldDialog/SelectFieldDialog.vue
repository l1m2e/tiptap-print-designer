<script lang="ts" setup>
import type { Schema, SchemaTree } from '~/db/types'
import type { SelectFieldDialogOptions } from '~/designer'
import { getApiTree } from '~/db/services/printDesigner'
import { EDITOR_CONTEXT } from '~/editor/constants'
import Tree from '../SchemaTree/SchemaTree.vue'

const show = ref(false)
const node = ref<Schema>()
const tree = ref<SchemaTree>([])
const editorContent = inject(EDITOR_CONTEXT)
const mode = ref<'insert' | 'update'>('insert')
const onConfirmCallback = ref<((data: { label: string, path: string }) => void | Promise<void>) | undefined>()

function insertField() {
  const label = node.value?.description || node.value?.field || ''
  const path = node.value?.path || ''

  if (mode.value === 'insert') {
    editorContent?.editor?.value?.chain().focus().insertContent({ type: 'field-node', attrs: { label, path } }).run()
  }
  else {
    onConfirmCallback.value?.({ label, path })
  }

  show.value = false
}

async function open(options?: SelectFieldDialogOptions) {
  mode.value = options?.mode || 'insert'
  onConfirmCallback.value = options?.onConfirm
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
    <DialogContent class="tpd-max-w-screen-xl">
      <DialogHeader>
        <DialogTitle>{{ mode === 'insert' ? '插入字段' : '更换字段' }}</DialogTitle>
      </DialogHeader>
      <Tree :tree @select="select" />

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button @click="insertField">
          {{ mode === 'insert' ? '插入' : '更换' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
