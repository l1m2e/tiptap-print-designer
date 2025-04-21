<script setup lang="ts">
import type { TemplateData } from '~/designer'
import { useVueToPrint } from 'vue-to-print'
import { EditorContent, EditorRoot } from '~/editor'

const { template, data } = defineProps<{
  template: TemplateData
  data: any
}>()

const print = ref <HTMLElement> ()
const { handlePrint } = useVueToPrint({ content: () => print.value! })

const text = shallowRef('')
watchImmediate(() => template.content, (val) => { text.value = val })
defineExpose({
  handlePrint,
})
</script>

<template>
  <Paper v-bind="template.page">
    <PaperContent>
      <EditorRoot v-model="text" mode="viewer" :data>
        <EditorContent ref="print" class="pointer-events-none select-none p-[6mm]" />
      </EditorRoot>
    </PaperContent>
  </Paper>
</template>
