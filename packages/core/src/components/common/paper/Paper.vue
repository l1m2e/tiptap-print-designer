<script lang="tsx" setup>
import type { PagerSetting } from './index'
import { PAPER_KEY } from './index'

const paperSetting = ref<PagerSetting>({
  paperType: 'A4',
  style: {
    width: '210mm',
    height: '297mm',
    padding: '6mm',
  },
})

provide(PAPER_KEY, paperSetting)

function updatePaperSetting(value: PagerSetting) {
  paperSetting.value = value
}

defineExpose({ paperSetting, updatePaperSetting })
</script>

<template>
  <div>
    <slot />
  </div>
</template>
