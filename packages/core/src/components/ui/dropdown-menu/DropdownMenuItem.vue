<script setup lang="ts">
import type { DropdownMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DropdownMenuItem, useForwardProps } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="cn(
      'tpd-relative tpd-flex tpd-cursor-default tpd-select-none tpd-items-center tpd-rounded-sm tpd-gap-2 tpd-px-2 tpd-py-1.5 tpd-text-sm tpd-outline-none tpd-transition-colors focus:tpd-bg-accent focus:tpd-text-accent-foreground data-[disabled]:tpd-pointer-events-none data-[disabled]:tpd-opacity-50 [&>svg]:tpd-size-4 [&>svg]:tpd-shrink-0',
      inset && 'tpd-pl-8',
      props.class,
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>
