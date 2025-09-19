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

const pageStyle = computed(() => ({
  width: paperSetting.value.style.width,
  height: paperSetting.value.style.height,
  margin: paperSetting.value.style.padding,
}))

useInjectPageStyle('tiptap-designer-page', pageStyle)

onMounted(() => {
  if (zoom) {
    panzoom(zoomEl.value!, {
      zoomSpeed: 0.2,
      initialZoom: 0.8,
      initialX: 350,
      initialY: 500,
    })
  }
})
</script>

<template>
  <div class="tpd-flex tpd-items-center tpd-justify-center">
    <div ref="zoomEl" class="paper-container tpd-bg-white dark:tpd-bg-black">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.paper-container {
  width: v-bind('pageStyle.width');
  height: v-bind('pageStyle.height');
  padding: v-bind('pageStyle.margin');
}

@media print {
  .paper-container {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border: none !important;
    background: white !important;
  }
}
</style>
