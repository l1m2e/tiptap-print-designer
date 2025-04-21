import type { NodeViewProps } from '@tiptap/vue-3'
import { Box, Clock } from 'lucide-vue-next'
import SfcLoader from '~/components/common/sfc-loader/SfcLoader.vue'

export function useFormat(props: NodeViewProps) {
  const FormatIconMap = {
    Timestamp: Clock,
    Custom: Box,
  }

  const type = ref('')
  const template = ref('')
  const expands = ref('')
  const icon = computed(() => FormatIconMap?.[type.value as keyof typeof FormatIconMap])
  const isFormat = computed(() => type.value)

  function FormatNode(props: any) {
    return <SfcLoader text={template.value} {...props} />
  }

  watchImmediate(() => props.node.attrs.format, (newFormat) => {
    const format = JSON.parse(newFormat || '{}')
    type.value = format.type || ''
    template.value = format.template || ''
    expands.value = format.expands || undefined
  })

  return {
    type,
    template,
    expands,
    icon,
    isFormat,
    FormatNode,
  }
}
