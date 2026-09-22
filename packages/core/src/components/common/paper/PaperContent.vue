<script lang="tsx" setup>
import panzoom from 'panzoom'
import { omit } from 'radash'
import { useInjectPageStyle } from '~/composables'
import { PAPER_KEY } from '.'

const { zoom } = defineProps<{
  /** true 为预览平移缩放，editor 为保留编辑交互的滚轮缩放 */
  zoom?: boolean | 'editor'
}>()

const viewportEl = ref<HTMLElement>()
const zoomEl = ref<HTMLElement>()
const paperSetting = inject(PAPER_KEY)!
const scale = ref(1)
const fitToWidth = ref(true)
let previewZoom: ReturnType<typeof panzoom> | undefined

function fitWidth() {
  if (zoom !== 'editor' || !fitToWidth.value || !viewportEl.value?.clientWidth || !zoomEl.value?.offsetWidth) return
  scale.value = Math.max(0.1, Math.min(3, (viewportEl.value.clientWidth - 32) / zoomEl.value.offsetWidth))
}

function resetZoom(event: MouseEvent) {
  if (zoom !== 'editor' || zoomEl.value?.contains(event.target as Node)) return
  fitToWidth.value = true
  fitWidth()
  viewportEl.value?.scrollTo(0, 0)
}

useResizeObserver([viewportEl, zoomEl], fitWidth)
useEventListener(viewportEl, 'wheel', async (event: WheelEvent) => {
  if (zoom !== 'editor' || !(event.ctrlKey || event.metaKey)) return
  event.preventDefault()
  const viewport = viewportEl.value!
  const paper = zoomEl.value!
  const rect = paper.getBoundingClientRect()
  const x = (event.clientX - rect.left) / scale.value
  const y = (event.clientY - rect.top) / scale.value
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1)
  fitToWidth.value = false
  scale.value = Math.max(0.1, Math.min(3, scale.value * Math.exp(-delta * 0.002)))
  await nextTick()
  const nextRect = paper.getBoundingClientRect()
  viewport.scrollLeft += nextRect.left + x * scale.value - event.clientX
  viewport.scrollTop += nextRect.top + y * scale.value - event.clientY
}, { passive: false })

onMounted(() => {
  if (zoom === true) {
    previewZoom = panzoom(zoomEl.value!, {
      zoomSpeed: 0.2,
      initialZoom: 0.8,
      initialX: 350,
      initialY: 500,
    })
  }
  fitWidth()
})
onBeforeUnmount(() => previewZoom?.dispose())

const unitMap: Record<string, number> = {
  mm: 1,
  cm: 10,
  in: 25.4,
  px: 0.264583,
  pt: 0.352778,
}

function parsePadding(padding: string): [number, number, number, number] {
  const parts = padding.trim().split(/\s+/)

  const parse = (val: string): number => {
    const match = val.match(/^([\d.]+)(mm|cm|in|px|pt)?$/)
    if (!match) return 0
    const [, num, unit = 'mm'] = match
    return Number.parseFloat(num) * (unitMap[unit] ?? 1)
  }

  const values = parts.map(parse)

  switch (values.length) {
    case 1: return [values[0], values[0], values[0], values[0]]
    case 2: return [values[0], values[1], values[0], values[1]]
    case 3: return [values[0], values[1], values[2], values[1]]
    case 4: return [values[0], values[1], values[2], values[3]]
    default: return [0, 0, 0, 0]
  }
}

function parseSize(size: string): number | 'auto' | '100%' {
  const s = size.trim()
  if (s === 'auto' || s === '100%') return s
  const match = s.match(/^([\d.]+)(mm|cm|in|px|pt)?$/)
  if (!match) return 0
  const [, num, unit = 'mm'] = match
  return Number.parseFloat(num) * (unitMap[unit] ?? 1)
}

const printableArea = computed(() => {
  const { width, height, padding } = paperSetting.value.style
  const [top, right, bottom, left] = parsePadding(padding)

  const w = parseSize(width)
  const h = parseSize(height)

  const printableWidth = typeof w === 'number' ? `${w - left - right}mm` : w
  const printableHeight = typeof h === 'number' ? `${h - top - bottom}mm` : h

  return {
    width: printableWidth,
    height: printableHeight,
    padding: `${top}mm ${right}mm ${bottom}mm ${left}mm`,
  }
})

const pageStyle = computed(() => (omit({ ...paperSetting.value.style, margin: paperSetting.value.style.padding }, ['padding'])))
useInjectPageStyle('tiptap-designer-page', pageStyle)
</script>

<template>
  <div
    ref="viewportEl"
    :class="zoom === 'editor' ? 'editor-viewport tpd-bg-gray-100 dark:tpd-bg-neutral-950' : 'tpd-flex tpd-items-center tpd-justify-center'"
    @dblclick="resetZoom"
  >
    <div ref="zoomEl" class="tpd-bg-white dark:tpd-bg-black paper-container" :style="zoom === 'editor' ? { zoom: scale } : undefined">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.editor-viewport {
  overflow: auto;
  overflow-anchor: none;
  padding: 16px;
}

.editor-viewport .paper-container {
  height: auto;
  min-height: v-bind('printableArea.height');
  margin: 0 auto;
}

.paper-container {
  flex-shrink: 0;
  box-sizing: content-box;
  width: v-bind('printableArea.width');
  height: v-bind('printableArea.height');
  padding: v-bind('printableArea.padding');
}

@media print {
  .paper-container {
    box-sizing: border-box;
    padding: 0 !important;
    zoom: 1 !important;
  }
}
</style>
