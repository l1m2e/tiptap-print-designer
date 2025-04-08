<script lang="ts" setup>
import type { NodeViewProps } from '@tiptap/vue-3'
import type { Format } from './index'
import SFCLoader from '~/components/common/sfc-loader/SfcLoader.vue'
import { DefaultTemplate, FiledNodeTemplate } from '~/components/common/template'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'

const { nodeMockData, nodeProps } = defineProps<{ nodeMockData: any, nodeProps?: NodeViewProps }>()

const editorEl = ref()
const template = ref('')

function getFormat(): Format {
  return { type: 'Custom', template: template.value }
}

const templateMap = new Map([
  ['DefaultTemplate', DefaultTemplate],
  ['field-node', FiledNodeTemplate],
])

function getDefaultFormatTemplate() {
  const type  = nodeProps?.node?.type?.name || 'DefaultTemplate'
  return templateMap.get(type) || DefaultTemplate
}

function setFormat(value: Format) {
  const { template: templateText, type } = JSON.parse(nodeProps?.node.attrs.format || '{}')
  template.value = type === 'Custom' ? templateText : getDefaultFormatTemplate()
  editorEl.value?.setValue(template.value)
}

defineExpose({
  getFormat,
  setFormat,
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
</template>
