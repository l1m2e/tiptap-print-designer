<script setup lang="ts">
import type { Format } from './common'
import { Box, Clock, Maximize2Icon, Minimize2Icon } from 'lucide-vue-next'
import { usePromiseDialog } from '~/composables/usePromiseDialog'
import { TIPTAP_PRINT_DESIGNER_CUSTOM_FORMAT } from '~/constants'
import Custom from './common/Custom.vue'
import Timestamp from './common/Timestamp.vue'

const show = ref(false)
const componentType = ref<string>('Timestamp')
const format = ref<Format | undefined>()
const nodeMockData = ref()
const CommonRef = useTemplateRef('CommonEl')
const customTemplate = ref('DefaultTemplate')

const customFormatList = inject(TIPTAP_PRINT_DESIGNER_CUSTOM_FORMAT, [])

const items = [
  {
    type: 'Timestamp',
    title: '格式化时间戳',
    component: Timestamp,
    icon: Clock,
  },
  ...customFormatList,
  {
    type: 'Custom',
    title: '自定义格式化',
    component: Custom,
    icon: Box,
  },
]

const FormatComponent = computed(() => items.find(i => i.type === componentType.value)?.component || Timestamp)

const { open, confirm, closed } = usePromiseDialog<Format, [{ format?: Format, mockData: any, customTemplate?: string }]>(show, (options) => {
  nodeMockData.value = options.mockData
  customTemplate.value = options.customTemplate || 'DefaultTemplate'
  format.value = options.format
  componentType.value = options.format?.type || 'Timestamp'
  setFormat()
})

watch(componentType, setFormat)

async function setFormat() {
  const { template = 'DefaultTemplate', expands, type = 'Timestamp' } = format.value || {}
  CommonRef.value?.setFormat({ type, template, expands })
}

function onConfirm() {
  const format = CommonRef.value!.getFormat()
  confirm(format)
}

watch(show, (val) => {
  if (val === false) closed()
})

const isFullscreen = ref(false)
const toggle = () => (isFullscreen.value = !isFullscreen.value)

defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="tpd-overflow-hidden !tpd-p-0" :class="isFullscreen ? '!tpd-max-h-[100vh] !tpd-max-w-[100vw]' : '!tpd-max-h-[700px] !tpd-max-w-[1300px]'">
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel class="!tpd-font-bold dark:tpd-text-white !tpd-text-black tpd-mb-2 !tpd-text-xl">
                格式化设置
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in items" :key="item.title">
                    <SidebarMenuButton as-child :is-active="componentType === item.type">
                      <div @click="componentType = item.type">
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main class="tpd-flex tpd-flex-1 tpd-flex-col tpd-overflow-hidden tpd-px-4" :class="isFullscreen ? 'tpd-h-[calc(100vh-20px)]' : 'tpd-h-[680px]'">
          <div class="tpd-h-12">
            <div variant="ghost" size="icon" class="tpd-absolute tpd-top-[18px] tpd-right-0 tpd-mr-12 tpd-cursor-pointer tpd-text-gray-700 hover:tpd-text-black dark:tpd-text-gray-300 tpd-dark:hover:text-white" @click="toggle">
              <Maximize2Icon v-if="!isFullscreen" class="tpd-size-3" />
              <Minimize2Icon v-else class="tpd-size-3" />
            </div>
          </div>
          <component
            :is="FormatComponent"
            ref="CommonEl"
            v-model:show="show"
            :node-mock-data="nodeMockData"
            :custom-template="customTemplate"
            @ready="setFormat"
          />
          <DialogFooter class="tpd-mt-4">
            <Button variant="outline" @click="show = false">
              取消
            </Button>
            <Button @click="onConfirm">
              确定
            </Button>
          </DialogFooter>
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>
