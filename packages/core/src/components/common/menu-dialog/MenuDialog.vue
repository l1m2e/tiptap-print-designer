<script setup lang="ts">
import type { MenuDialogProps } from '.'

const { menuItems, title } = defineProps<MenuDialogProps>()

const componentIndex = ref<number>(0)

const RenderComponent = computed(() => {
  const component = menuItems[componentIndex.value]
  return component?.component
})
</script>

<template>
  <Dialog>
    <DialogContent class="tpd-overflow-hidden !tpd-max-h-[700px] !tpd-max-w-[1200px] !tpd-p-0">
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel class="!tpd-font-bold dark:tpd-text-white !tpd-text-black tpd-mb-2 !tpd-text-xl">
                {{ title }}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="(item, index) in menuItems" :key="item.title">
                    <SidebarMenuButton as-child :is-active="componentIndex === index">
                      <div @click="componentIndex = index">
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
          <component :is="RenderComponent" />
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>
