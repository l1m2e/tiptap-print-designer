<script setup lang="ts">
import type { TemplateData } from '../../index'
import { useClipboard } from '@vueuse/core'
import { Copy, Download } from 'lucide-vue-next'
import { ref } from 'vue'
import MonacoEditor from '~/components/common/monaco-editor/MonacoEditor.vue'
import Button from '~/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { useToast } from '~/components/ui/toast'

// #region 状态管理
const open = ref(false)
const { toast } = useToast()

const jsonContent = ref<string>('')
// #endregion

// #region 剪贴板功能
const { copy, copied, isSupported: clipboardSupported } = useClipboard()

async function handleCopyToClipboard() {
  try {
    await copy(jsonContent.value)
    toast({
      title: '复制成功',
      description: '已复制到剪贴板',
    })
  }
  catch {
    toast({
      title: '复制失败',
      description: '请检查剪贴板权限',
      variant: 'destructive',
    })
  }
}
// #endregion

// #region 文件下载功能
function handleDownloadFile() {
  try {
    const blob = new Blob([jsonContent.value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `template-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: '导出成功',
      description: '文件已下载',
    })
  }
  catch {
    toast({
      title: '导出失败',
      description: '下载文件时出错',
      variant: 'destructive',
    })
  }
}
// #endregion

// #region 对话框控制
function openDialog(data: TemplateData) {
  jsonContent.value = JSON.stringify(data, null, 2)
  open.value = true
}
// #endregion

defineExpose({
  open: openDialog,
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="!tpd-max-w-[1200px] tpd-flex tpd-flex-col">
      <DialogHeader>
        <DialogTitle>导出模板</DialogTitle>
      </DialogHeader>

      <div class="tpd-flex-1 tpd-border tpd-rounded-md tpd-overflow-hidden tpd-h-[800px]">
        <MonacoEditor
          v-model="jsonContent"
          language="json"
          class="tpd-h-full"
        />
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          @click="handleDownloadFile"
        >
          <Download class="tpd-mr-2 tpd-h-4 tpd-w-4" />
          下载 JSON 文件
        </Button>
        <Button
          :disabled="!clipboardSupported"
          @click="handleCopyToClipboard"
        >
          <Copy class="tpd-mr-2 tpd-h-4 tpd-w-4" />
          {{ copied ? '已复制' : '复制到剪贴板' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
