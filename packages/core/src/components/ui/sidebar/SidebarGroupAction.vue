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
    data-sidebar="group-action"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'tpd-absolute tpd-right-3 tpd-top-3.5 tpd-flex tpd-aspect-square tpd-w-5 tpd-items-center tpd-justify-center tpd-rounded-md tpd-p-0 tpd-text-sidebar-foreground tpd-outline-none tpd-ring-sidebar-ring tpd-transition-transform hover:tpd-bg-sidebar-accent hover:tpd-text-sidebar-accent-foreground focus-visible:tpd-ring-2 [&>svg]:tpd-size-4 [&>svg]:tpd-shrink-0',
      'after:tpd-absolute after:tpd--inset-2 after:md:tpd-hidden',
      'group-data-[collapsible=icon]:tpd-hidden',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
