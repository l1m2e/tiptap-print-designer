<script lang="tsx" setup>
import panzoom from 'panzoom'
import { PAPER_KEY } from '.'

const { zoom } = defineProps<{
  /** 是否可以开启缩放功能 */
  zoom?: boolean
}>()

const zoomEl = ref<HTMLElement>()
const paperSetting = inject(PAPER_KEY)!

onMounted(() => {
  zoom && panzoom(zoomEl.value!, {
    zoomSpeed: 0.2,
    initialZoom: 0.8,
    initialX: 350,
    initialY: 500,
  })
})
</script>

<template>
  <div class="tpd-flex tpd-items-center tpd-justify-center">
    <div ref="zoomEl" :style="paperSetting.style" class="tpd-bg-white dark:tpd-bg-black">
      <slot />
    </div>
  </div>
</template>
