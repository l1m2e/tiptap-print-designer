<script lang="ts" setup>
import type { NodeViewProps } from '@tiptap/vue-3'

import SFCLoader from '~/components/common/sfc-loader/SfcLoader.vue'
import DefaultTemplate from '~/components/common/template/defaultTemplate.vue?raw'
import FiledNodeFormat from '~/components/common/template/FiledNodeFormat.vue?raw'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'

const { nodeProps, nodeMockData } = defineProps<{ nodeProps: NodeViewProps, show: boolean, nodeMockData: any }>()
const emit = defineEmits<{ 'update:show': [show: boolean] }>()

const editorEl = ref()
const template = ref('')
const nodeType = nodeProps.node.type.name

function onConfirm() {
  nodeProps.updateAttributes({ format: JSON.stringify({ type: 'Custom', template: template.value }) })
  emit('update:show', false)
}

function getTemplate() {
  const defaultTemplateText = {
    'field-node': FiledNodeFormat,
  }
  const defaultTemplate = defaultTemplateText[nodeType as keyof typeof defaultTemplateText] || DefaultTemplate

  const { template } = JSON.parse(nodeProps.node.attrs.format || '{}')
  return template || defaultTemplate
}

onMounted(() => {
  template.value = getTemplate()
  editorEl.value?.setValue(template.value)
})
</script>

<template>
  <ResizablePanelGroup direction="horizontal" class="w-full bg-white dark:bg-neutral-950 ">
    <ResizablePanel>
      <MonacoEditor ref="editorEl" v-model="template" language="vue" class="h-full rounded-sm overflow-hidden " />
    </ResizablePanel>

    <ResizableHandle class="mx-2" />

    <ResizablePanel class="relative">
      <div class="px-8 pt-2 overflow-y-auto h-full overflow-hidden break-all">
        <SFCLoader :text="template" v-bind="nodeMockData" />
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>

  <DialogFooter class="mt-4">
    <Button variant="outline" @click="emit('update:show', false)">
      取消
    </Button>
    <Button @click="onConfirm">
      确定
    </Button>
  </DialogFooter>
</template>
