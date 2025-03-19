<script setup lang="ts">
import { Database, Settings } from 'lucide-vue-next'
import { useVueToPrint } from 'vue-to-print'
import { ResizablePanel } from '~/components/ui/resizable'
import { generateMockData } from '~/db/services/printDesigner'
import { DESIGNER_KEY } from '.'
import DataSourcesDialog from './components/DataSourcesDialog/DataSourcesDialog.vue'
import DesignerContextMenu from './components/DesignerContextMenu/DesignerContextMenu.vue'
import EditTopMenu from './components/EditTopMenu/EditTopMenu.vue'
import { Paper, PaperContent, PaperTrigger } from './components/Paper'
import SelectFieldDialog from './components/SelectFieldDialog/SelectFieldDialog.vue'
import SettingDialog from './components/SettingDialog/SettingDialog.vue'

const text = ref('')
const { state: mockData } = useAsyncState(async () => {
  const data = await generateMockData()
  return data
}, null)

const DataSourcesDialogRef = useTemplateRef('DataSourcesDialogEl')
const SettingDialogRef = useTemplateRef('SettingDialogEl')
const SelectFieldDialogRef = useTemplateRef('SelectFieldDialogEl')

const print = ref<HTMLElement>()
const { handlePrint } = useVueToPrint({ content: () => print.value! })

function openSelectFieldDialog() {
  SelectFieldDialogRef.value?.open()
}

provide(DESIGNER_KEY, { openSelectFieldDialog })
</script>

<template>
  <Paper>
    <EditorRoot v-model="text">
      <div class="grid grid-cols-3 gap-x-4 items-center border-b border-neutral-200 p-2 dark:border-neutral-800 h-[54px] ">
        <EditTopMenu />
        <PaperTrigger class="flex justify-center w-full" />
        <div class="flex items-center justify-end">
          <Button variant="outline" size="icon" @click="SettingDialogRef?.open">
            <Database />
          </Button>
          <Button variant="outline" class="mx-2" size="icon" @click="DataSourcesDialogRef?.open ">
            <Settings />
          </Button>
          <Button @click="handlePrint">
            打印
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal" class="min-h-[calc(100vh-75px)]">
        <!-- 设计器 -->
        <ResizablePanel>
          <div class="overflow-y-auto h-[calc(100vh-54px)]">
            <DesignerContextMenu>
              <PaperContent>
                <EditorContent class="p-[6mm]" />
              </PaperContent>
            </DesignerContextMenu>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <!-- 预览 -->
        <ResizablePanel>
          <div class="bg-gray-100 dark:bg-neutral-800 h-[calc(100vh-54px)] overflow-hidden">
            <PaperContent zoom>
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
    </EditorRoot>
  </Paper>
</template>
