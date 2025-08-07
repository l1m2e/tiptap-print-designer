<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-sidebar="menu-badge"
    :class="cn(
      'tpd-absolute tpd-right-1 tpd-flex tpd-h-5 tpd-min-w-5 tpd-items-center tpd-justify-center tpd-rounded-md tpd-px-1 tpd-text-xs tpd-font-medium tpd-tabular-nums tpd-text-sidebar-foreground tpd-select-none tpd-pointer-events-none',
      'tpd-peer-hover/menu-button:text-sidebar-accent-foreground tpd-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'tpd-peer-data-[size=sm]/menu-button:top-1',
      'tpd-peer-data-[size=default]/menu-button:top-1.5',
      'tpd-peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:tpd-hidden',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
