<script setup lang="ts">
import type { TemplateData } from '~/designer'
import { useVueToPrint } from 'vue-to-print'
import { EditorContent, EditorRoot } from '~/editor'

const { template = {
  content: '',
  page: {
    size: ['210mm', '297mm'],
    paperType: 'A4',
    padding: 6,
  },
  dataSources: [],
  mockData: {},
}, data } = defineProps<{
  template?: TemplateData
  data: any
}>()

const PaperRef = useTemplateRef('PaperEl')
const print = ref <HTMLElement>()
const { handlePrint } = useVueToPrint({ content: () => print.value! })

onMounted(() => {
  if (PaperRef.value) {
    PaperRef.value.size = template.page.size
    PaperRef.value.paperType = template.page.paperType
    PaperRef.value.padding = template.page.padding || 0
  }
})

defineExpose({
  handlePrint,
})
</script>

<template>
  <Paper v-bind="template.page" ref="PaperEl">
    <PaperContent>
      <EditorRoot :model-value="template.content" mode="viewer" :data>
        <EditorContent ref="print" class="tpd-pointer-events-none tpd-select-none" :style="{ padding: `${PaperRef?.padding || 0}mm` }" />
      </EditorRoot>
    </PaperContent>
  </Paper>
</template>
