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
    <DialogContent class="tpd-overflow-hidden !tpd-max-h-[700px] !tpd-max-w-[1200px] !tpd-p-0">
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel class="!tpd-font-bold dark:tpd-text-white !tpd-text-black tpd-mb-2 !tpd-text-xl">
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
        <main class="tpd-flex tpd-h-[680px] tpd-flex-1 tpd-flex-col tpd-overflow-hidden tpd-pt-12 tpd-px-4">
          <component :is="componentMap[componentType]" />
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>
