<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'

let editor: Editor | undefined

const show = ref(false)

function insertField() {
  editor?.chain().focus().insertContent({ type: 'field' }).run()
  show.value = false
}

function open(openEditor: Editor | undefined) {
  editor = openEditor
  show.value = true
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
    </DialogContent>
  </Dialog>
</template>
