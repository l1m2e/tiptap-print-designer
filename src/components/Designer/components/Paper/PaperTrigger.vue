<script lang="tsx" setup>
import { PAPER_KEY } from '.'

const { size } = inject(PAPER_KEY, { size: ref(['210mm', '297mm']) })

const paperSizeListMap = new Map<string, [number, number]>([
  ['A4', [210, 297]],
  ['A5', [148, 210]],
  ['B4', [250, 353]],
  ['B5', [176, 250]],
])
const paperSize = ref('A4')

function changePaperSize(sizeKey: string) {
  const [w, h] = paperSizeListMap.get(sizeKey) || [210, 297]
  size.value = [`${w}mm`, `${h}mm`]
}
</script>

<template>
  <Tabs v-model="paperSize" default-value="A4">
    <TabsList>
      <TabsTrigger v-for="item in paperSizeListMap.keys()" :key="item" :value="item" @click="changePaperSize(item)">
        {{ item }}
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
