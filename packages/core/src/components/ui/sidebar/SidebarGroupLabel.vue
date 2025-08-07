<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Primitive
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'tpd-duration-200 tpd-flex tpd-h-8 tpd-shrink-0 tpd-items-center tpd-rounded-md tpd-px-2 tpd-text-xs tpd-font-medium tpd-text-sidebar-foreground/70 tpd-outline-none tpd-ring-sidebar-ring tpd-transition-[margin,opa] tpd-ease-linear focus-visible:tpd-ring-2 [&>svg]:tpd-size-4 [&>svg]:tpd-shrink-0',
      'group-data-[collapsible=icon]:tpd--mt-8 group-data-[collapsible=icon]:tpd-opacity-0',
      props.class)"
  >
    <slot />
  </Primitive>
</template>
