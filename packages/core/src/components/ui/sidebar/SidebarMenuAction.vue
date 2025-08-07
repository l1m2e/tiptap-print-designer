<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PrimitiveProps & {
  showOnHover?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-sidebar="menu-action"
    :class="cn(
      'tpd-absolute tpd-right-1 tpd-top-1.5 tpd-flex tpd-aspect-square tpd-w-5 tpd-items-center tpd-justify-center tpd-rounded-md tpd-p-0 tpd-text-sidebar-foreground tpd-outline-none tpd-ring-sidebar-ring tpd-transition-transform hover:tpd-bg-sidebar-accent hover:tpd-text-sidebar-accent-foreground focus-visible:tpd-ring-2 tpd-peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:tpd-size-4 [&>svg]:tpd-shrink-0',
      'after:tpd-absolute after:tpd--inset-2 after:md:tpd-hidden',
      'tpd-peer-data-[size=sm]/menu-button:top-1',
      'tpd-peer-data-[size=default]/menu-button:top-1.5',
      'tpd-peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:tpd-hidden',
      showOnHover
        && 'tpd-group-focus-within/menu-item:opacity-100 tpd-group-hover/menu-item:opacity-100 data-[state=open]:tpd-opacity-100 tpd-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:tpd-opacity-0',
      props.class,
    )"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
