<script lang="tsx" setup>
import { PAPER_KEY } from './index'

const paperSetting = ref({
  paperType: 'A4',
  style: {
    width: '210mm',
    height: '297mm',
    padding: '6mm',
  },
  customStyle: '',
})

provide(PAPER_KEY, paperSetting)

defineExpose({ paperSetting })
</script>

<template>
  <div>
    <slot />
  </div>
</template>
