<script setup lang="ts">
import type { TemplateData } from '~/designer'
import { useVueToPrint } from 'vue-to-print'
import { EditorContent, EditorRoot } from '~/editor'

const { template = {
  content: '',
  paperSetting: {
    paperType: 'A4',
    style: {
      width: '210mm',
      height: '297mm',
      padding: '6mm',
      lineHeight: '1.5',
      letterSpacing: '0.5px',
    },
    customStyle: '',
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
    PaperRef.value.paperSetting = template.paperSetting
  }
})

defineExpose({
  handlePrint,
})
</script>

<template>
  <Paper v-bind="template.paperSetting" ref="PaperEl">
    <PaperContent>
      <EditorRoot :model-value="template.content" mode="viewer" :data>
        <EditorContent ref="print" class="tpd-pointer-events-none tpd-select-none" />
      </EditorRoot>
    </PaperContent>
  </Paper>
</template>
