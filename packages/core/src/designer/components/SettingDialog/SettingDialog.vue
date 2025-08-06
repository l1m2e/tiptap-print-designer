<script setup lang="ts">
import { Database } from 'lucide-vue-next'
import DataSourcesSetting from './DataSourcesSetting.vue'
// import ThemeSetting from './ThemeSetting.vue'

const show = ref(false)
const componentMap = {
  DataSourcesSetting,
  // ThemeSetting,
}
const componentType = ref <keyof typeof componentMap>('DataSourcesSetting')

interface Item {
  title: string
  component: keyof typeof componentMap
  icon: Component
}

const items: Item[] = [
  {
    title: '数据源',
    component: 'DataSourcesSetting',
    icon: Database,
  },
  // {
  //   title: '主题',
  //   component: 'ThemeSetting',
  //   icon: Palette,
  // },
]

function open() {
  show.value = true
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
                设置
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
          <component :is="componentMap[componentType]" />
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>
