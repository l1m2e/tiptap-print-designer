<script lang="ts" setup>
import MonacoEditor from '~/components/common/monaco-editor/MonacoEditor.vue'
import SFCLoader from '~/components/common/sfc-loader/SfcLoader.vue'
import { EDITOR_CONTEXT } from '~/components/Editor/constants'
import { ResizablePanel } from '~/components/ui/resizable'
import { defaultTemplate } from './index'

const show = ref(false)
const template = ref('')
const type = ref<'add' | 'edit'>('add')
const editorContent = inject(EDITOR_CONTEXT)
const editor = useTemplateRef('editorEl')

function confirm() {
  editorContent?.editor?.value?.chain().focus().insertContent({ type: 'sfc-node', attrs: { text: template.value } }).run()
  show.value = false
}

function update() {
  editorContent?.editor?.value?.chain().focus().updateAttributes('sfc-node', { text: template.value }).run()
  show.value = false
}

async function open(text?: string) {
  show.value = true
  await nextTick()

  if (text) {
    type.value = 'edit'
    template.value = text
    editor.value?.setValue(text)
  }
  else {
    type.value = 'add'

    template.value = defaultTemplate
    editor.value?.setValue(defaultTemplate)
  }
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="max-w-[1200px]">
      <DialogHeader>
        <DialogTitle>{{ type === 'add' ? '添加组件' : '编辑组件' }}</DialogTitle>
      </DialogHeader>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <MonacoEditor ref="editorEl" v-model="template" language="vue" class="h-[700px]" />
        </ResizablePanel>

        <ResizableHandle class="mx-2" />

        <ResizablePanel class="h-[700px]">
          <SFCLoader :text="template" />
        </ResizablePanel>
      </ResizablePanelGroup>

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button v-if="type === 'add'" @click="confirm">
          确定
        </Button>
        <Button v-else @click="update">
          更新
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
