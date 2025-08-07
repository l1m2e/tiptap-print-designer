<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronDown } from "lucide-vue-next"
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn(
      'tpd-flex tpd-h-9 tpd-w-full tpd-items-center tpd-justify-between tpd-whitespace-nowrap tpd-rounded-md tpd-border tpd-border-input tpd-bg-transparent tpd-px-3 tpd-py-2 tpd-text-sm tpd-shadow-sm tpd-ring-offset-background data-[placeholder]:tpd-text-muted-foreground focus:tpd-outline-none focus:tpd-ring-1 focus:tpd-ring-ring disabled:tpd-cursor-not-allowed disabled:tpd-opacity-50 [&>span]:tpd-truncate tpd-text-start',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="tpd-w-4 tpd-h-4 tpd-opacity-50 tpd-shrink-0" />
    </SelectIcon>
  </SelectTrigger>
</template>
