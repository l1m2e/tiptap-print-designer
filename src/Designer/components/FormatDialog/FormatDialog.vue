<script setup lang="ts">
import type { NodeViewProps } from '@tiptap/vue-3'
import { Box, Timer } from 'lucide-vue-next'
import Custom from './common/Custom.vue'
import Timestamp from './common/Timestamp.vue'

const show = ref(false)
const componentMap = {
  Custom,
  Timestamp,
}
const componentType = ref<keyof typeof componentMap>('Timestamp')
const componentRef = useTemplateRef('componentEl')
const props = ref()

interface Item {
  title: string
  component: keyof typeof componentMap
  icon: Component
}

const items: Item[] = [
  {
    title: '格式化时间戳',
    component: 'Timestamp',
    icon: Timer,
  },
  {
    title: '自定义格式化',
    component: 'Custom',
    icon: Box,
  },
]

function onConfirm() {
  const formatValue = componentRef.value?.getFormat()
  props.value?.updateAttributes({ format: JSON.stringify(formatValue) })
  show.value = false
}

function open(_props: NodeViewProps) {
  props.value = _props
  show.value = true

  const format = JSON.parse(props.value.node.attrs.format || '{}')
  componentType.value = format.type || 'Timestamp'
  nextTick(() => {
    componentRef.value?.setFormat(format.value)
  })
}

defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="overflow-hidden max-h-[700px] max-w-[1200px] p-0">
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
        <main class="flex h-[680px] flex-1 flex-col overflow-hidden pt-12 px-4">
          <component :is="componentMap[componentType]" ref="componentEl" />

          <DialogFooter>
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
