<script setup lang="ts">
import { useVueToPrint } from 'vue-to-print'
import { PaperContent } from '~/components/common'
import { EditorContent, EditorRoot } from '~/editor'

const { template = '', data } = defineProps<{
  template?: string
  data: any
}>()

const print = ref <HTMLElement> ()
const { handlePrint } = useVueToPrint({ content: () => print.value! })

const text = shallowRef('')
watchImmediate(() => template, (val) => { text.value = val })

defineExpose({
  handlePrint,
})
</script>

<template>
  <PaperContent zoom>
    <EditorRoot v-model="text" mode="viewer" :data>
      <EditorContent ref="print" class="pointer-events-none select-none p-[6mm]" />
    </EditorRoot>
  </PaperContent>
</template>
