<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'
import { PAPER_KEY } from '.'
import { TIPTAP_PRINT_DESIGNER_CONST } from '~/constants'

const { size, paperType, padding } = inject(PAPER_KEY, { size: ref(['210mm', '297mm']), paperType: ref('A4'), padding: ref(6) })
const { PAPER_SIZE_MAP } = inject(TIPTAP_PRINT_DESIGNER_CONST, {
  PAPER_SIZE_MAP: new Map<string, [number, number]>([
    ['A4', [210, 297]],
    ['A5', [148, 210]],
    ['B4', [250, 353]],
    ['B5', [176, 250]],
  ])
})

const sizeSetting = reactive({
  type: paperType.value || PAPER_SIZE_MAP!.keys().next().value!,
  customSize: [Number(size.value[0].replace('mm', '')) || 210, Number(size.value[1].replace('mm', '')) || 297],
  padding: padding.value,
})

const { toast } = useToast()

function save() {
  if (sizeSetting.type === 'custom') {
    size.value = [`${sizeSetting.customSize[0]}mm`, `${sizeSetting.customSize[1]}mm`]
  }
  else {
    const [w, h] = PAPER_SIZE_MAP?.get(sizeSetting.type) || [210, 297]
    size.value = [`${w}mm`, `${h}mm`]
  }
  paperType.value = sizeSetting.type
  padding.value = sizeSetting.padding
  toast({ title: '纸张尺寸已更新', description: `宽度${size.value[0]}，高度${size.value[1]} 边距${sizeSetting.padding}mm` })
}
</script>

<template>
  <div class="tpd-flex tpd-flex-col tpd-justify-between tpd-h-full">
    <div class="tpd-w-full tpd-h-full tpd-flex tpd-justify-center tpd-items-center">
      <div class="tpd-flex tpd-flex-col tpd-gap-2 tpd-p-1  tpd-w-[600px]">
        <Label class="tpd-mb-2">纸张尺寸</Label>
        <Select v-model="sizeSetting.type">
          <SelectTrigger>
            <SelectValue placeholder="选择纸张尺寸" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="item in PAPER_SIZE_MAP?.keys()" :key="item" :value="item">
              {{ item }}
            </SelectItem>
            <SelectItem value="custom">
              自定义
            </SelectItem>
          </SelectContent>
        </Select>

        <div v-if="sizeSetting.type === 'custom'" class="tpd-flex tpd-gap-2 tpd-items-center">
          <div class="tpd-relative tpd-flex-1">
            <Input v-model="sizeSetting.customSize[0]" type="number" class="tpd-pl-10" />
            <span class="tpd-absolute tpd-start-0 tpd-inset-y-0 tpd-text-sm tpd-flex tpd-items-center tpd-justify-center tpd-text-gray-500 tpd-px-2">
              宽度
            </span>
          </div>
          <XIcon class="tpd-w-4 tpd-h-4" />
          <div class="tpd-relative tpd-flex-1">
            <Input v-model="sizeSetting.customSize[1]" type="number" class="tpd-pl-10" />
            <span class="tpd-absolute tpd-start-0 tpd-inset-y-0 tpd-text-sm  tpd-flex tpd-items-center tpd-justify-center tpd-text-gray-500 tpd-px-2">
              高度
            </span>
          </div>
        </div>

        <Label class="tpd-my-2">纸张边距</Label>
        <Input v-model="sizeSetting.padding" type="number" />
      </div>
    </div>

    <div class="tpd-flex tpd-flex-row-reverse">
      <Button class="tpd-mt-4" @click="save">
        应用
      </Button>
    </div>
  </div>
</template>
