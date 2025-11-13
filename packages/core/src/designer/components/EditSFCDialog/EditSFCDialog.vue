<script lang="ts" setup>
import type { EditSFCDialogOptions } from '~/designer'
import MonacoEditor from '~/components/common/monaco-editor/MonacoEditor.vue'
import SFCLoader from '~/components/common/sfc-loader/SfcLoader.vue'
import defaultTemplate from '~/components/common/template/defaultTemplate.vue?raw'
import { ResizablePanel } from '~/components/ui/resizable'
import { EDITOR_CONTEXT } from '~/editor/constants'

// #region state
const show = ref(false)
const template = ref('')
const mode = ref<'add' | 'edit'>('add')
const submitHandler = ref<((text: string) => void | Promise<void>) | null>(null)
const editorContent = inject(EDITOR_CONTEXT)
const editor = useTemplateRef('editorEl')
// #endregion

// #region helpers
function defaultAddHandler(text: string) {
  editorContent?.editor?.value?.chain().focus().insertContent({ type: 'sfc-node', attrs: { text } }).run()
}

function defaultEditHandler(text: string) {
  const ed = editorContent?.editor?.value
  if (!ed) return

  const { state } = ed
  const { selection } = state
  const node = state.doc.nodeAt(selection.from) ?? (selection.from > 0 ? state.doc.nodeAt(selection.from - 1) : null)
  const nodeTypeName = node?.type.name ?? 'sfc-node'

  ed.chain().focus().updateAttributes(nodeTypeName, { text }).run()
}

function close() {
  show.value = false
  submitHandler.value = null
}

async function handleSubmit() {
  const handler = submitHandler.value ?? (mode.value === 'edit' ? defaultEditHandler : defaultAddHandler)
  await Promise.resolve(handler(template.value))
  close()
}

async function open(options?: string | EditSFCDialogOptions) {
  const normalized = typeof options === 'string' ? { text: options } : options ?? {}
  const hasText = Object.prototype.hasOwnProperty.call(normalized, 'text')

  mode.value = normalized.mode ?? (hasText ? 'edit' : 'add')
  submitHandler.value = normalized.onConfirm ?? null

  const initialTemplate = hasText ? (normalized.text ?? '') : defaultTemplate
  template.value = initialTemplate

  show.value = true
  await nextTick()
  editor.value?.setValue(initialTemplate)
}
// #endregion

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="tpd-max-w-screen-xl">
      <DialogHeader>
        <DialogTitle>{{ mode === 'add' ? '添加组件' : '编辑组件' }}</DialogTitle>
      </DialogHeader>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <MonacoEditor ref="editorEl" v-model="template" language="vue" class="tpd-h-[60vh] tpd-rounded-sm tpd-overflow-hidden" />
        </ResizablePanel>

        <ResizableHandle class="tpd-mx-2" />

        <ResizablePanel>
          <div class="tpd-h-[60vh] tpd-p-4 tpd-overflow-y-auto tpd-overflow-hidden">
            <SFCLoader :text="template" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button v-if="mode === 'add'" @click="handleSubmit">
          确定
        </Button>
        <Button v-else @click="handleSubmit">
          更新
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
