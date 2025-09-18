<script lang="tsx" setup>
import panzoom from 'panzoom'
import { useInjectPageStyle } from '~/composables'
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

const pageStyle = computed(() => ({
  width: paperSetting.value.style.width,
  height: paperSetting.value.style.height,
  margin: paperSetting.value.style.padding,
}))

useInjectPageStyle('tiptap-designer-page', pageStyle)
</script>

<template>
  <div class="tpd-flex tpd-items-center tpd-justify-center">
    <div ref="zoomEl" :style="paperSetting.style" class="tpd-bg-white dark:tpd-bg-black print:!tpd-p-0">
      <slot />
    </div>
  </div>
</template>
