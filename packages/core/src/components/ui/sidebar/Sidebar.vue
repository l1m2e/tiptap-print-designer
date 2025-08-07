<script setup lang="ts">
import type { SidebarProps } from "."
import { cn } from '~/lib/utils'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./utils"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: "left",
  variant: "sidebar",
  collapsible: "offcanvas",
})

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    :class="cn('tpd-flex tpd-h-full tpd-w-[--sidebar-width] tpd-flex-col tpd-bg-sidebar tpd-text-sidebar-foreground', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>

  <Sheet v-else-if="isMobile" :open="openMobile" v-bind="$attrs" @update:open="setOpenMobile">
    <SheetContent
      data-sidebar="sidebar"
      data-mobile="true"
      :side="side"
      class="tpd-w-[--sidebar-width] tpd-bg-sidebar tpd-p-0 tpd-text-sidebar-foreground [&>button]:tpd-hidden"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
      }"
    >
      <div class="tpd-flex tpd-h-full tpd-w-full tpd-flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else class="tpd-group tpd-peer tpd-hidden md:tpd-block"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- This is what handles the sidebar gap on desktop  -->
    <div
      :class="cn(
        'tpd-duration-200 tpd-relative tpd-h-svh tpd-w-[--sidebar-width] tpd-bg-transparent tpd-transition-[width] tpd-ease-linear',
        'group-data-[collapsible=offcanvas]:tpd-w-0',
        'group-data-[side=right]:tpd-rotate-180',
        variant === 'floating' || variant === 'inset'
          ? 'group-data-[collapsible=icon]:tpd-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
          : 'group-data-[collapsible=icon]:tpd-w-[--sidebar-width-icon]',
      )"
    />
    <div
      :class="cn(
        'tpd-duration-200 tpd-fixed tpd-inset-y-0 tpd-z-10 tpd-hidden tpd-h-svh tpd-w-[--sidebar-width] tpd-transition-[left,right,width] tpd-ease-linear md:tpd-flex',
        side === 'left'
          ? 'tpd-left-0 group-data-[collapsible=offcanvas]:tpd-left-[calc(var(--sidebar-width)*-1)]'
          : 'tpd-right-0 group-data-[collapsible=offcanvas]:tpd-right-[calc(var(--sidebar-width)*-1)]',
        // Adjust the padding for floating and inset variants.
        variant === 'floating' || variant === 'inset'
          ? 'tpd-p-2 group-data-[collapsible=icon]:tpd-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
          : 'group-data-[collapsible=icon]:tpd-w-[--sidebar-width-icon] group-data-[side=left]:tpd-border-r group-data-[side=right]:tpd-border-l',
        props.class,
      )"
      v-bind="$attrs"
    >
      <div
        data-sidebar="sidebar"
        class="tpd-flex tpd-h-full tpd-w-full tpd-flex-col tpd-text-sidebar-foreground tpd-bg-sidebar group-data-[variant=floating]:tpd-rounded-lg group-data-[variant=floating]:tpd-border group-data-[variant=floating]:tpd-border-sidebar-border group-data-[variant=floating]:tpd-shadow"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
