<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { PAPER_KEY } from '.'

const paperSetting = inject(PAPER_KEY)!
const editorRef = useTemplateRef('editorEl')
const template = ref(paperSetting.value.customStyle || '')

const { toast } = useToast()

function save() {
  paperSetting.value.customStyle = template.value
  toast({ title: '自定义样式已更新' })
}

onMounted(() => {
  editorRef.value?.setValue(paperSetting.value.customStyle)
})
</script>

<template>
  <div class="tpd-flex tpd-flex-col tpd-justify-between tpd-h-full">
    <MonacoEditor ref="editorEl" v-model="template" language="css" class="tpd-w-full tpd-h-full tpd-rounded-sm tpd-overflow-hidden" />
  </div>

  <div class="tpd-flex tpd-flex-row-reverse">
    <Button class="tpd-mt-4" @click="save">
      应用
    </Button>
  </div>
</template>
