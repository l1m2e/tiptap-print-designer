<script setup lang="ts">
import type { DesignerEmits } from '.'
import type { Format } from './components/FormatDialog/common'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { Database, Settings } from 'lucide-vue-next'
import { useVueToPrint } from 'vue-to-print'
import { ResizablePanel } from '~/components/ui/resizable'
import { generateMockData } from '~/db/services/printDesigner'
import { EditorContent, EditorRoot } from '~/editor'
import { DESIGNER_KEY } from '.'
import DataSourcesDialog from './components/DataSourcesDialog/DataSourcesDialog.vue'
import DataTableDialog from './components/DataTableDialog/DataTableDialog.vue'
import EditSFCDialog from './components/EditSFCDialog/EditSFCDialog.vue'
import EditTopMenu from './components/EditTopMenu/EditTopMenu.vue'
import FormatDialog from './components/FormatDialog/FormatDialog.vue'
import SelectFieldDialog from './components/SelectFieldDialog/SelectFieldDialog.vue'
import SettingDialog from './components/SettingDialog/SettingDialog.vue'

const emits = defineEmits<DesignerEmits>()
const text = useLocalStorage('text', '')
const { state: mockData } = useAsyncState(async () => {
  const data = await generateMockData()
  return data
}, null)

const PaperRef = useTemplateRef('PaperEl')
const DataSourcesDialogRef = useTemplateRef('DataSourcesDialogEl')
const SettingDialogRef = useTemplateRef('SettingDialogEl')
const SelectFieldDialogRef = useTemplateRef('SelectFieldDialogEl')
const EditSFCDialogRef = useTemplateRef('EditSFCDialogEl')
const DataTableDialogRef = useTemplateRef('DataTableDialogEl')
const FormatDialogRef = useTemplateRef('FormatDialogEl')
const print = ref<HTMLElement>()

const { handlePrint } = useVueToPrint({ content: () => print.value! })

function openSelectFieldDialog() {
  SelectFieldDialogRef.value?.open()
}

function openEditSFCDialog(text?: string) {
  EditSFCDialogRef.value?.open(text)
}

function openDateTableDialog(data?: { columns: string, path: string }) {
  DataTableDialogRef.value?.open(data)
}

async function openFormatDialog(options: { format?: Format, mockData: any, customTemplate?: string }) {
  return await FormatDialogRef.value?.open(options)
}

function save() {
  emits('save', {
    content: text.value,
    page: {
      size: toRaw(PaperRef.value!.size),
      paperType: toRaw(PaperRef.value!.paperType),
    },
  })
}

provide(DESIGNER_KEY, { openSelectFieldDialog, openEditSFCDialog, openDateTableDialog, openFormatDialog })
</script>

<template>
  <Paper ref="PaperEl">
    <EditorRoot v-model="text" :data="mockData">
      <div class="grid grid-cols-3 gap-x-4 items-center border-b border-neutral-200 p-2 dark:border-neutral-800 h-[54px] ">
        <EditTopMenu />
        <PaperTrigger class="flex justify-center w-full" />
        <div class="flex items-center justify-end gap-2">
          <Button variant="outline" size="icon" @click="SettingDialogRef?.open">
            <Database />
          </Button>
          <Button variant="outline" size="icon" @click="DataSourcesDialogRef?.open ">
            <Settings />
          </Button>
          <Button @click="handlePrint">
            打印
          </Button>
          <Button @click="save">
            保存
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal" class="min-h-[calc(100vh-75px)] dark:bg-black">
        <!-- 设计器 -->
        <ResizablePanel>
          <div class="overflow-y-auto h-[calc(100vh-54px)]">
            <PaperContent>
              <EditorContent class="p-[6mm]" />
            </PaperContent>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <!-- 预览 -->
        <ResizablePanel>
          <div class="bg-gray-100 dark:bg-neutral-950 h-[calc(100vh-54px)] overflow-hidden">
            <PaperContent>
              <EditorRoot v-model="text" mode="viewer" :data="mockData">
                <EditorContent ref="print" class="pointer-events-none select-none p-[6mm]" />
              </EditorRoot>
            </PaperContent>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <SettingDialog ref="DataSourcesDialogEl" />
      <DataSourcesDialog ref="SettingDialogEl" />
      <SelectFieldDialog ref="SelectFieldDialogEl" />
      <EditSFCDialog ref="EditSFCDialogEl" />
      <DataTableDialog ref="DataTableDialogEl" />
      <FormatDialog ref="FormatDialogEl" />
    </EditorRoot>
    <Toaster />
  </Paper>
</template>
