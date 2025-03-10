<script setup lang="ts">
import panzoom from 'panzoom'
import { useVueToPrint } from 'vue-to-print'
/** 纸张大小列表 */
const paperSizeListMap = new Map<string, [number, number]>([
  ['A4', [210, 297]], // A4 尺寸为 210mm x 297mm
  ['A5', [148, 210]], // A5 尺寸为 148mm x 210mm
  ['B4', [250, 353]], // B4 尺寸为 250mm x 353mm
  ['B5', [176, 250]], // B5 尺寸为 176mm x 250mm
])

const zoom = ref<HTMLElement>()
const print = ref<HTMLElement>()
const { handlePrint } = useVueToPrint({ content: () => print.value! })

const paperSize = ref('A4')

const size = computed(() => {
  const [width, height] = paperSizeListMap.get(paperSize.value) || [210, 297]
  return {
    width: `${width}mm`,
    height: `${height}mm`,
  }
})

onMounted(() => {
  panzoom(zoom.value!, {
    zoomSpeed: 0.2,
    initialZoom: 0.8,
    initialX: 350,
    initialY: 500,
  })
})
</script>

<template>
  <div class="relative h-full bg-gray-100 cursor-grab">
    <div class="bg-white h-[54px] dark:bg-black border-b border-neutral-200 dark:border-neutral-800 p-2 grid grid-cols-3">
      <div />
      <Tabs v-model="paperSize" default-value="A4">
        <TabsList>
          <TabsTrigger v-for="item in paperSizeListMap.keys()" :key="item" :value="item">
            {{ item }}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div class="flex justify-end">
        <Button @click="handlePrint">
          打印
        </Button>
      </div>
    </div>
    <div class="h-[calc(100vh-54px)] w-full overflow-hidden flex items-center justify-center">
      <div ref="zoom" :style="size" class="bg-white">
        <div ref="print" class="bg-white p-[6mm]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
