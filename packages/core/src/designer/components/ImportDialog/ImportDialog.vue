<script setup lang="ts">
import type { TemplateData } from '../../index'
import { useClipboard, useFileDialog } from '@vueuse/core'
import { Copy, Upload } from 'lucide-vue-next'
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
import { updateDataSource, updateMockData } from '~/db/services/printDesigner'
import { DESIGNER_KEY } from '../../index'

// #region 状态管理
const show = ref(false)
const { toast } = useToast()

const jsonContent = ref<string>('')
const { setTemplate } = inject(DESIGNER_KEY)!
// #endregion

// #region 剪贴板功能
const { isSupported: clipboardSupported } = useClipboard()

async function handlePasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    jsonContent.value = text
    toast({
      title: '粘贴成功',
      description: '已从剪贴板粘贴内容',
    })
  }
  catch {
    toast({
      title: '粘贴失败',
      description: '请检查剪贴板权限',
      variant: 'destructive',
    })
  }
}
// #endregion

// #region 文件导入功能
const { open: openFileDialog, onChange } = useFileDialog({
  accept: '.json',
  multiple: false,
})

onChange((files) => {
  if (files && files.length > 0) {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        jsonContent.value = content
        toast({
          title: '文件加载成功',
          description: `已加载文件: ${file.name}`,
        })
      }
      catch {
        toast({
          title: '文件读取失败',
          description: '请检查文件格式',
          variant: 'destructive',
        })
      }
    }
    reader.readAsText(file)
  }
})

// #endregion

// #region 对话框控制
function handleImport() {
  try {
    const data = JSON.parse(jsonContent.value) as TemplateData

    // 验证数据结构
    if (!data.content || !data.paperSetting || !data.dataSources || !data.mockData) {
      throw new Error('数据格式不正确')
    }

    setTemplate(data)

    toast({
      title: '导入成功',
      description: '模板数据已成功导入',
    })
  }
  catch (error) {
    toast({
      title: '导入失败',
      description: error instanceof Error ? error.message : '请检查 JSON 格式是否正确',
      variant: 'destructive',
    })
  }
}

async function onlyImportDataSources() {
  try {
    const data = JSON.parse(jsonContent.value) as TemplateData

    // 验证数据结构
    if (!data.dataSources) {
      throw new Error('数据格式不正确')
    }

    await updateDataSource(data.dataSources)
    await updateMockData(data.mockData)

    toast({
      title: '导入成功',
      description: '数据源已成功导入',
    })

    show.value = false
  }
  catch (error) {
    toast({
      title: '导入失败',
      description: error instanceof Error ? error.message : '请检查 JSON 格式是否正确',
      variant: 'destructive',
    })
  }
}
// #endregion

function open() {
  show.value = true
  jsonContent.value = ''
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="!tpd-max-w-[1200px] tpd-flex tpd-flex-col">
      <DialogHeader>
        <DialogTitle>导入模板</DialogTitle>
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
          @click="openFileDialog"
        >
          <Upload class="tpd-mr-2 tpd-h-4 tpd-w-4" />
          上传 JSON 文件
        </Button>
        <Button
          variant="outline"
          :disabled="!clipboardSupported"
          @click="handlePasteFromClipboard"
        >
          <Copy class="tpd-mr-2 tpd-h-4 tpd-w-4" />
          从剪贴板粘贴
        </Button>
        <Button @click="onlyImportDataSources">
          仅导入数据源
        </Button>
        <Button @click="handleImport">
          导入
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
