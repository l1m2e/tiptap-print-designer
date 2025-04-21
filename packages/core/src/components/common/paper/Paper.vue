<script lang="tsx" setup>
import { PAPER_KEY } from './index'

const props = defineProps<{
  size?: [string, string]
  paperType?: string
}>()

const paperType = ref<string>(props.paperType ?? 'A4')
const size = ref<[string, string]>(props.size ?? ['210mm', '297mm'])

provide(PAPER_KEY, { size, paperType })

defineExpose({ size, paperType })
</script>

<template>
  <slot />
</template>
