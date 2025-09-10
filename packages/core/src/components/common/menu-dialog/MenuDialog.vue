<script setup lang="ts">
import type { MenuDialogProps } from '.'

const { menuItems, title } = defineProps<MenuDialogProps>()

const componentType = ref<string | undefined>(menuItems?.[0]?.component.name)

const RenderComponent = computed(() => {
  const component = menuItems.find(item => item.component.name === componentType.value)
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
                  <SidebarMenuItem v-for="item in menuItems" :key="item.title">
                    <SidebarMenuButton as-child :is-active="componentType === item.component.name">
                      <div @click="componentType = item.component.name">
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
