<script lang="tsx" setup>
import { PAPER_KEY } from '.'

const { size, paperType, padding } = inject(PAPER_KEY, { size: ref(['210mm', '297mm']), paperType: ref('A4'), padding: ref(6) })

const paperSizeListMap = new Map<string, [number, number]>([
  ['A4', [210, 297]],
  ['A5', [148, 210]],
  ['B4', [250, 353]],
  ['B5', [176, 250]],
])

function changePaperSize(sizeKey: string) {
  const [w, h] = paperSizeListMap.get(sizeKey) || [210, 297]
  size.value = [`${w}mm`, `${h}mm`]
}

const popoverShow = ref(false)
const customSize = ref([210, 297])

function changeCustomSize() {
  if (!customSize.value[0] || !customSize.value[1]) return
  paperType.value = 'Custom'
  size.value = [`${customSize.value[0]}mm`, `${customSize.value[1]}mm`]
  popoverShow.value = false
}
</script>

<template>
  <div class="flex items-center">
    <Tabs v-model="paperType" default-value="A4">
      <TabsList>
        <TabsTrigger v-for="item in paperSizeListMap.keys()" :key="item" :value="item" @click="changePaperSize(item)">
          {{ item }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Popover v-model:open="popoverShow">
      <PopoverTrigger as-child>
        <Button class="ml-2" size="sm" :variant="paperType === 'Custom' ? 'default' : 'outline'">
          自定义
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-2">
          <h4 class="mb-4">
            自定义纸张尺寸 单位 mm
          </h4>
          <div class="flex items-center">
            <Label class="flex-shrink-0">宽度</Label>
            <Input v-model="customSize[0]" type="number" class="mx-2 h-8" />
          </div>
          <div class="flex items-center">
            <Label class="flex-shrink-0">高度</Label>
            <Input v-model="customSize[1]" type="number" class="mx-2  h-8" />
          </div>
          <div class="flex items-center">
            <Label class="flex-shrink-0">边距</Label>
            <Input v-model="padding" type="number" class="mx-2  h-8" />
          </div>
          <div class="flex justify-end mt-2">
            <Button size="sm" @click="changeCustomSize">
              确定
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
