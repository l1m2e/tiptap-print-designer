<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'
import { TIPTAP_PRINT_DESIGNER_CONST } from '~/constants'
import { PAPER_KEY } from '.'

const paperSetting = inject(PAPER_KEY)!

const { PAPER_SIZE_MAP } = inject(TIPTAP_PRINT_DESIGNER_CONST, {
  PAPER_SIZE_MAP: new Map<string, [string, string]>([
    ['A4', ['210mm', '297mm']],
    ['A5', ['148mm', '210mm']],
    ['B4', ['250mm', '353mm']],
    ['B5', ['176mm', '250mm']],
  ]),
})

const sizeSetting = reactive({
  type: paperSetting.value.paperType || PAPER_SIZE_MAP!.keys().next().value!,
  customSize: [paperSetting.value.style.width, paperSetting.value.style.height],
  padding: paperSetting.value.style.padding,
})

const { toast } = useToast()

function save() {
  if (sizeSetting.type === 'custom') {
    paperSetting.value.style.width = sizeSetting.customSize[0]
    paperSetting.value.style.height = sizeSetting.customSize[1]
  }
  else {
    const [w, h] = PAPER_SIZE_MAP?.get(sizeSetting.type) || ['210mm', '297mm']
    paperSetting.value.style.width = w
    paperSetting.value.style.height = h
  }
  paperSetting.value.paperType = sizeSetting.type
  paperSetting.value.style.padding = sizeSetting.padding
  toast({ title: '纸张尺寸已更新', description: `宽度${paperSetting.value.style.width}，高度${paperSetting.value.style.height} 边距${sizeSetting.padding}` })
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
            <Input v-model="sizeSetting.customSize[0]" class="tpd-pl-10" />
            <span class="tpd-absolute tpd-start-0 tpd-inset-y-0 tpd-text-sm tpd-flex tpd-items-center tpd-justify-center tpd-text-gray-500 tpd-px-2">
              宽度
            </span>
          </div>
          <XIcon class="tpd-w-4 tpd-h-4" />
          <div class="tpd-relative tpd-flex-1">
            <Input v-model="sizeSetting.customSize[1]" class="tpd-pl-10" />
            <span class="tpd-absolute tpd-start-0 tpd-inset-y-0 tpd-text-sm  tpd-flex tpd-items-center tpd-justify-center tpd-text-gray-500 tpd-px-2">
              高度
            </span>
          </div>
        </div>

        <Label class="tpd-my-2">纸张边距</Label>
        <Input v-model="sizeSetting.padding" />
      </div>
    </div>

    <div class="tpd-flex tpd-flex-row-reverse">
      <Button class="tpd-mt-4" @click="save">
        应用
      </Button>
    </div>
  </div>
</template>
