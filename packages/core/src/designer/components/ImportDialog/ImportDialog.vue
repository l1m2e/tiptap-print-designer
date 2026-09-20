<script setup lang="ts">
import type { TemplateData } from '../../index'
import { useFileDialog } from '@vueuse/core'
import { Download, Upload } from 'lucide-vue-next'
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
const { getTemplate, setTemplate, fetchMockData } = inject(DESIGNER_KEY)!
// #endregion

// #region 文件功能
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

// #region 导入功能
function handleImport() {
  try {
    const data = JSON.parse(jsonContent.value) as TemplateData

    // 验证数据结构
    if (!data.content || !data.paperSetting || !data.dataSources || !data.mockData) {
      throw new Error('数据格式不正确')
    }

    setTemplate(data)

    toast({
      title: '保存成功',
      description: '模板数据已应用',
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
    await fetchMockData()

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

async function open() {
  show.value = true
  // 打开时预填当前模板，便于直接导出；导入时可粘贴/上传覆盖
  const templateData = await getTemplate()
  jsonContent.value = JSON.stringify(templateData, null, 2)
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="!tpd-max-w-[1200px] tpd-flex tpd-flex-col">
      <DialogHeader>
        <DialogTitle>导入 / 导出模板</DialogTitle>
      </DialogHeader>

      <div class="tpd-flex-1 tpd-border tpd-rounded-md tpd-overflow-hidden tpd-h-[800px]">
        <MonacoEditor
          v-model="jsonContent"
          language="json"
          class="tpd-h-full"
        />
      </div>

      <DialogFooter class="sm:tpd-justify-between sm:tpd-gap-x-0">
        <!-- 左侧：JSON 文件读取/下载 -->
        <div class="tpd-flex tpd-flex-wrap tpd-items-center tpd-gap-2">
          <Button
            variant="outline"
            @click="handleDownloadFile"
          >
            <Download class="tpd-mr-2 tpd-h-4 tpd-w-4" />
            下载 JSON 文件
          </Button>
          <Button
            variant="outline"
            @click="openFileDialog"
          >
            <Upload class="tpd-mr-2 tpd-h-4 tpd-w-4" />
            上传 JSON 文件
          </Button>
        </div>

        <!-- 右侧：保存 -->
        <div class="tpd-flex tpd-flex-wrap tpd-items-center tpd-gap-2">
          <Button variant="outline" @click="onlyImportDataSources">
            仅导入数据源
          </Button>
          <Button @click="handleImport">
            保存
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
