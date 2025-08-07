<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronRight } from "lucide-vue-next"
import {
  DropdownMenuSubTrigger,

  useForwardProps,
} from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="cn(
      'tpd-flex tpd-cursor-default tpd-select-none tpd-items-center tpd-rounded-sm tpd-px-2 tpd-py-1.5 tpd-text-sm tpd-outline-none focus:tpd-bg-accent data-[state=open]:tpd-bg-accent',
      props.class,
    )"
  >
    <slot />
    <ChevronRight class="tpd-ml-auto tpd-h-4 tpd-w-4" />
  </DropdownMenuSubTrigger>
</template>
