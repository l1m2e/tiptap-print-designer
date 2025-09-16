<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PrimitiveProps & {
  size?: "sm" | "md"
  isActive?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  as: "a",
  size: "md",
})
</script>

<template>
  <Primitive
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="isActive"
    :class="cn(
      'tpd-flex tpd-h-7 tpd-min-w-0 tpd--translate-x-px tpd-items-center tpd-gap-2 tpd-overflow-hidden tpd-rounded-md tpd-px-2 tpd-text-sidebar-foreground tpd-outline-none tpd-ring-sidebar-ring hover:tpd-bg-sidebar-accent hover:tpd-text-sidebar-accent-foreground focus-visible:tpd-ring-2 active:tpd-bg-sidebar-accent active:tpd-text-sidebar-accent-foreground disabled:tpd-pointer-events-none disabled:tpd-opacity-50 aria-disabled:tpd-pointer-events-none aria-disabled:tpd-opacity-50 [&>span:last-child]:tpd-truncate [&>svg]:tpd-size-4 [&>svg]:tpd-shrink-0 [&>svg]:tpd-text-sidebar-accent-foreground',
      'data-[active=true]:tpd-bg-sidebar-accent data-[active=true]:tpd-text-sidebar-accent-foreground',
      size === 'sm' && 'tpd-text-xs',
      size === 'md' && 'tpd-text-sm',
      'group-data-[collapsible=icon]:tpd-hidden',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
