<script setup lang="ts">
import type { DesignerEmits, EditSFCDialogOptions, SelectFieldDialogOptions, TemplateData } from '.'
import type { Format } from './components/FormatDialog/common'
import { Database, Download, Settings, Upload } from 'lucide-vue-next'
import { useVueToPrint } from 'vue-to-print'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { ResizablePanel } from '~/components/ui/resizable'
import { getDataSource, getMockData, updateDataSource, updateMockData } from '~/db/services/printDesigner'
import { EditorContent, EditorRoot } from '~/editor'
import { DESIGNER_KEY } from '.'
import DataSourcesDialog from './components/DataSourcesDialog/DataSourcesDialog.vue'
import DataTableDialog from './components/DataTableDialog/DataTableDialog.vue'
import DateTableStyleDialog from './components/DataTableStyleDialog/DateTableStyleDialog.vue'
import EditSFCDialog from './components/EditSFCDialog/EditSFCDialog.vue'
import EditTopMenu from './components/EditTopMenu/EditTopMenu.vue'
import ExportDialog from './components/ExportDialog/ExportDialog.vue'
import FormatDialog from './components/FormatDialog/FormatDialog.vue'
import ImportDialog from './components/ImportDialog/ImportDialog.vue'
import RightClickMenu from './components/RightClickMenu/RightClickMenu.vue'
import SelectFieldDialog from './components/SelectFieldDialog/SelectFieldDialog.vue'
import SettingDialog from './components/SettingDialog/SettingDialog.vue'

const emits = defineEmits<DesignerEmits>()
const text = useSessionStorage('text', '')

const { state: mockData, execute: fetchMockData } = useAsyncState(async () => {
  const data = await getMockData()
  return data
}, null)

const PaperRef = useTemplateRef('PaperEl')
const DataSourcesDialogRef = useTemplateRef('DataSourcesDialogEl')
const SettingDialogRef = useTemplateRef('SettingDialogEl')
const SelectFieldDialogRef = useTemplateRef('SelectFieldDialogEl')
const EditSFCDialogRef = useTemplateRef('EditSFCDialogEl')
const DataTableDialogRef = useTemplateRef('DataTableDialogEl')
const FormatDialogRef = useTemplateRef('FormatDialogEl')
const DateTableStyleDialogRef = useTemplateRef('DateTableStyleDialogEl')
const ImportDialogRef = useTemplateRef('ImportDialogEl')
const ExportDialogRef = useTemplateRef('ExportDialogEl')

const print = ref<HTMLElement>()

const { handlePrint } = useVueToPrint({ content: () => print.value! })

function openSelectFieldDialog(options?: SelectFieldDialogOptions) {
  SelectFieldDialogRef.value?.open(options)
}

function openEditSFCDialog(options?: string | EditSFCDialogOptions) {
  EditSFCDialogRef.value?.open(options)
}

function openDateTableDialog(data?: { columns: string, path: string }) {
  DataTableDialogRef.value?.open(data)
}

async function openFormatDialog(options: { format?: Format, mockData: any, customTemplate?: string }) {
  return await FormatDialogRef.value?.open(options)
}

async function openDataTableStyleDialog(styleText: string) {
  return await DateTableStyleDialogRef.value!.open(styleText)
}

// #region 导入导出功能
async function handleImport() {
  ImportDialogRef.value?.open()
}

async function handleExport() {
  const templateData = await getTemplate()
  ExportDialogRef.value?.open(templateData)
}
// #endregion

async function save() {
  const templateData = await getTemplate()
  emits('save', templateData)
}

async function getTemplate(): Promise<TemplateData> {
  const dataSources = await getDataSource()
  const mockData = await getMockData()
  return {
    content: text.value,
    paperSetting: toRaw(PaperRef.value!.paperSetting),
    dataSources,
    mockData,
  }
}

/** 设置模板 */
async function setTemplate(template: TemplateData) {
  await updateDataSource(template.dataSources)
  await updateMockData(template.mockData)

  if (PaperRef.value) {
    PaperRef.value.paperSetting = template.paperSetting
  }
  text.value = template.content
  mockData.value = template.mockData
}

provide(DESIGNER_KEY, { getTemplate, setTemplate, fetchMockData, openSelectFieldDialog, openEditSFCDialog, openDateTableDialog, openFormatDialog, openDataTableStyleDialog })

defineExpose({
  setTemplate,
  getTemplate,
})
</script>

<template>
  <Paper ref="PaperEl">
    <EditorRoot v-model="text" :data="mockData">
      <div class="tpd-grid tpd-grid-cols-4 gap-x-4 tpd-items-center tpd-border-b tpd-border-neutral-200 tpd-p-2 dark:tpd-border-neutral-800 tpd-h-[54px]">
        <EditTopMenu class="tpd-col-span-3" />
        <div class="tpd-flex tpd-items-center tpd-justify-end tpd-gap-2">
          <PaperTrigger />
          <Button variant="outline" size="icon" @click="SettingDialogRef?.open">
            <Database />
          </Button>
          <Button variant="outline" size="icon" @click="DataSourcesDialogRef?.open ">
            <Settings />
          </Button>
          <Button variant="outline" size="icon" @click="handleImport">
            <Download />
          </Button>
          <Button variant="outline" size="icon" @click="handleExport">
            <Upload />
          </Button>
          <Button @click="handlePrint">
            打印
          </Button>
          <Button @click="save">
            保存
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal" class="tpd-min-h-[calc(100vh-75px)] dark:tpd-bg-black">
        <!-- 设计器 -->
        <ResizablePanel>
          <RightClickMenu>
            <div class="tpd-overflow-y-auto tpd-h-[calc(100vh-54px)]">
              <PaperContent>
                <EditorContent />
              </PaperContent>
            </div>
          </RightClickMenu>
        </ResizablePanel>

        <ResizableHandle />

        <!-- 预览 -->
        <ResizablePanel>
          <div class="tpd-bg-gray-100 dark:tpd-bg-neutral-950 tpd-h-[calc(100vh-54px)] tpd-overflow-hidden">
            <PaperContent zoom>
              <EditorRoot v-model="text" mode="viewer" :data="mockData">
                <EditorContent ref="print" class="tpd-pointer-events-none tpd-select-none" />
              </EditorRoot>
            </PaperContent>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <SettingDialog ref="DataSourcesDialogEl" />
      <DataSourcesDialog ref="SettingDialogEl" @on-update-data-source="fetchMockData" />
      <SelectFieldDialog ref="SelectFieldDialogEl" />
      <EditSFCDialog ref="EditSFCDialogEl" />
      <DataTableDialog ref="DataTableDialogEl" />
      <FormatDialog ref="FormatDialogEl" />
      <DateTableStyleDialog ref="DateTableStyleDialogEl" />
      <ImportDialog ref="ImportDialogEl" />
      <ExportDialog ref="ExportDialogEl" />
    </EditorRoot>
    <Toaster />
  </Paper>
</template>
