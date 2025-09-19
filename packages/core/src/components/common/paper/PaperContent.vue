<script lang="tsx" setup>
import panzoom from 'panzoom'
import { omit } from 'radash'
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
  <div class="tpd-flex tpd-items-center tpd-justify-center">
    <div ref="zoomEl" class="tpd-bg-white dark:tpd-bg-black paper-container ">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.paper-container {
  box-sizing: content-box;
  width: v-bind('printableArea.width');
  height: v-bind('printableArea.height');
  padding: v-bind('printableArea.padding');
}

@media print {
  .paper-container {
    box-sizing: border-box;
    padding: 0 !important;
  }
}
</style>
