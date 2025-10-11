<script lang="tsx" setup>
const styles = reactive({
  fontSize: [12],
  padding: [0],
})

const stylesText = computed(() => {
  const styleObj = {
    td: `font-size:${styles.fontSize[0]}pt;padding:${styles.padding[0]}pt`,
    th: `font-size:${styles.fontSize[0]}pt;padding:${styles.padding[0]}pt`,
  }
  return JSON.stringify(styleObj)
})

const show = ref(false)

const { open, confirm } = usePromiseDialog<string, [string]>(show, (styleText: string) => {
  const { 'font-size': fontSize = 12, padding = 2 } = parseSimpleInlineStyle(JSON.parse(styleText || '{}')?.td) || {}
  styles.fontSize = [fontSize]
  styles.padding = [padding]
})

function parseSimpleInlineStyle(input?: string): Record<string, number> {
  const result: Record<string, number> = {}
  input?.split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .forEach((part) => {
      const idx = part.indexOf(':')
      if (idx === -1) return
      const prop = part.slice(0, idx).trim()
      const rawVal = part.slice(idx + 1).trim()
      const numMatch = /^-?\d+(?:\.\d+)?/.exec(rawVal)
      if (!numMatch) return
      const num = Number.parseFloat(numMatch[0])
      if (Number.isNaN(num)) return
      result[prop] = num
    })
  return result
}

function save() {
  confirm(stylesText.value)
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="tpd-max-w-screen-lg">
      <DialogHeader>
        <DialogTitle>数据表格样式配置</DialogTitle>
      </DialogHeader>
      <div class="tpd-w-[500px] tpd-my-20 tpd-m-auto tpd-flex tpd-flex-col tpd-gap-6">
        <Label>边距 {{ styles.padding[0] }}pt</Label>
        <Slider v-model="styles.padding" :min="0" :max="30" :step="1" />
        <Label>字体大小 {{ styles.fontSize[0] }}pt</Label>
        <Slider v-model="styles.fontSize" :min="0" :max="30" :step="1" />
      </div>
      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button @click="save">
          保存
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
