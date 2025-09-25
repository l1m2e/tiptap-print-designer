<script lang="ts" setup>
import type { Format } from './index'
import SFCLoader from '~/components/common/sfc-loader/SfcLoader.vue'
import { DefaultTemplate, FiledNodeTemplate, TableColumnTemplate } from '~/components/common/template'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'

const { nodeMockData, customTemplate } = defineProps<{ nodeMockData: any, customTemplate: string }>()
const emits = defineEmits<{ ready: [] }>()
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
  <ResizablePanelGroup direction="horizontal" class="tpd-w-full tpd-bg-white dark:tpd-bg-neutral-950">
    <ResizablePanel>
      <MonacoEditor ref="editorEl" v-model="template" language="vue" class="tpd-h-full tpd-rounded-sm tpd-overflow-hidden" @ready="emits('ready')" />
    </ResizablePanel>

    <ResizableHandle class="tpd-mx-2" />

    <ResizablePanel class="tpd-relative">
      <div class="tpd-px-8 tpd-pt-2 tpd-overflow-y-auto tpd-h-full tpd-overflow-hidden tpd-break-all">
        <SFCLoader :text="template" v-bind="nodeMockData" />
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
