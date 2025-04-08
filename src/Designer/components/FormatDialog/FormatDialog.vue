<script setup lang="ts">
import type { NodeViewProps } from '@tiptap/vue-3'
import type { Format } from './common'
import { Box, Clock, Maximize2Icon, Minimize2Icon } from 'lucide-vue-next'
import Custom from './common/Custom.vue'
import Timestamp from './common/Timestamp.vue'

const emits = defineEmits<{ onConfirm: [ val: Format ] }>()

const componentMap = {
  Custom,
  Timestamp,
}

const show = ref(false)
const componentType = ref<keyof typeof componentMap>('Timestamp')
const nodeProps = ref()
const nodeMockData = ref()
const CommonRef = useTemplateRef('CommonEl')

const items = [
  {
    title: '格式化时间戳',
    component: 'Timestamp',
    icon: Clock,
  },
  {
    title: '自定义格式化',
    component: 'Custom',
    icon: Box,
  },
] as const

async function open(options: { nodeProps?: NodeViewProps, mockData: any }) {
  nodeMockData.value = options.mockData
  nodeProps.value = options?.nodeProps || undefined

  const { type = 'Timestamp' } = JSON.parse(options.nodeProps?.node?.attrs?.format || '{}')
  componentType.value = type
  show.value = true
  setFormat()
}
watch(componentType, setFormat)

async function setFormat() {
  await nextTick()
  const { template, expands } = JSON.parse(nodeProps.value?.node?.attrs?.format || '{}')
  CommonRef.value?.setFormat({ type: componentType.value, template, expands })
}

function confirm() {
  const format = CommonRef.value!.getFormat()
  emits('onConfirm', format)
  nodeProps.value?.updateAttributes({ format: JSON.stringify(format) })
  show.value = false
}

const isFullscreen = ref(false)
const toggle = () => (isFullscreen.value = !isFullscreen.value)

defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="overflow-hidden max-h-[700px] max-w-[1300px] p-0" :class="isFullscreen ? 'max-h-[100vh] max-w-[100vw]' : 'max-h-[700px] max-w-[1300px]'">
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel class="font-bold dark:text-white text-black mb-2 text-xl">
                格式化设置
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in items" :key="item.title">
                    <SidebarMenuButton as-child :is-active="componentType === item.component">
                      <div @click="componentType = item.component">
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
        <main class="flex flex-1 flex-col overflow-hidden  px-4" :class="isFullscreen ? 'h-[calc(100vh-20px)]' : 'h-[680px]'">
          <div class="h-12">
            <div variant="ghost" size="icon" class="absolute top-[18px] right-0 mr-12 cursor-pointer text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" @click="toggle">
              <Maximize2Icon v-if="!isFullscreen" class="size-3" />
              <Minimize2Icon v-else class="size-3" />
            </div>
          </div>
          <component
            :is="componentMap[componentType]"
            ref="CommonEl"
            v-model:show="show"
            :node-props="nodeProps"
            :node-mock-data="nodeMockData"
          />
          <DialogFooter class="mt-4">
            <Button variant="outline" @click="show = false">
              取消
            </Button>
            <Button @click="confirm">
              确定
            </Button>
          </DialogFooter>
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>
