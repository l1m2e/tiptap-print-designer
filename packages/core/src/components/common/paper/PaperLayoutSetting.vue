<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { PAPER_KEY } from '.'
const paperSetting = inject(PAPER_KEY)!


const layoutSetting = reactive({
  lineHeight: paperSetting.style.lineHeight,
  letterSpacing: paperSetting.style.letterSpacing,
})

const { toast } = useToast()

function save() {
  paperSetting.style.letterSpacing = layoutSetting.letterSpacing
  paperSetting.style.lineHeight = layoutSetting.lineHeight
  toast({ title: '纸张排版已更新'})
}
</script>

<template>
<div class="tpd-flex tpd-flex-col tpd-justify-between tpd-h-full">
  <div class="tpd-w-full tpd-h-full tpd-flex tpd-justify-center tpd-items-center">
    <div class="tpd-w-[600px] tpd-flex tpd-flex-col tpd-gap-2">
      <Label>行高</Label>
      <Input v-model="layoutSetting.lineHeight"></Input>
      <Label>字间距</Label>
      <Input v-model="layoutSetting.letterSpacing"></Input>
    </div>
  </div>
</div>

  <div class="tpd-flex tpd-flex-row-reverse">
    <Button class="tpd-mt-4" @click="save">
      应用
    </Button>
  </div>
</template>
