<script lang="tsx" setup>
import panzoom from 'panzoom'
import { PAPER_KEY } from '.'

const { zoom } = defineProps<{
  /** 是否可以开启缩放功能 */
  zoom?: boolean
}>()

const zoomEl = ref<HTMLElement>()
const { size } = inject(PAPER_KEY, { size: ref(['210mm', '297mm']) })

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
  <div class="flex items-center justify-center">
    <div ref="zoomEl" :style="{ width: size[0], minHeight: size[1] }" class="bg-white dark:bg-black">
      <slot />
    </div>
  </div>
</template>
