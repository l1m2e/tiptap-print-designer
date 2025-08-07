<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <button
    data-sidebar="rail"
    aria-label="Toggle Sidebar"
    :tabindex="-1"
    title="Toggle Sidebar"
    :class="cn(
      'tpd-absolute tpd-inset-y-0 tpd-z-20 tpd-hidden tpd-w-4 tpd--translate-x-1/2 tpd-transition-all tpd-ease-linear after:tpd-absolute after:tpd-inset-y-0 after:tpd-left-1/2 after:tpd-w-[2px] hover:after:tpd-bg-sidebar-border group-data-[side=left]:tpd--right-4 group-data-[side=right]:tpd-left-0 sm:tpd-flex',
      '[[data-side=left]_&]:tpd-cursor-w-resize [[data-side=right]_&]:tpd-cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:tpd-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:tpd-cursor-w-resize',
      'group-data-[collapsible=offcanvas]:tpd-translate-x-0 group-data-[collapsible=offcanvas]:after:tpd-left-full group-data-[collapsible=offcanvas]:hover:tpd-bg-sidebar',
      '[[data-side=left][data-collapsible=offcanvas]_&]:tpd--right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:tpd--left-2',
      props.class,
    )"
    @click="toggleSidebar"
  >
    <slot />
  </button>
</template>
