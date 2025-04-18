<script lang="ts" setup>
import type { Format } from './index'
import SFCLoader from '~/components/common/sfc-loader/SfcLoader.vue'
import { DefaultTemplate, FiledNodeTemplate, TableColumnTemplate } from '~/components/common/template'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'

const { nodeMockData, customTemplate } = defineProps<{ nodeMockData: any, customTemplate: string }>()

const editorEl = ref()
const template = ref('')

function getFormat(): Format {
  return { type: 'Custom', template: template.value }
}

const templateMap = new Map([
  ['TableColumnTemplate', TableColumnTemplate],
  ['DefaultTemplate', DefaultTemplate],
  ['FiledNodeTemplate', FiledNodeTemplate],
])

function getDefaultFormatTemplate({ type, template }: Format) {
  if (template) return type === 'Custom' ? template : templateMap.get(customTemplate)!
  return templateMap.get(customTemplate)!
}

function setFormat(format: Format) {
  template.value = getDefaultFormatTemplate(format)
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
