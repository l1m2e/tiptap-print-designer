<script setup lang="ts">
import type { SelectItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import {
  SelectItem,
  SelectItemIndicator,

  SelectItemText,
  useForwardProps,
} from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'tpd-relative tpd-flex tpd-w-full tpd-cursor-default tpd-select-none tpd-items-center tpd-rounded-sm tpd-py-1.5 tpd-pl-2 tpd-pr-8 tpd-text-sm tpd-outline-none focus:tpd-bg-accent focus:tpd-text-accent-foreground data-[disabled]:tpd-pointer-events-none data-[disabled]:tpd-opacity-50',
        props.class,
      )
    "
  >
    <span class="tpd-absolute tpd-right-2 tpd-flex tpd-h-3.5 tpd-w-3.5 tpd-items-center tpd-justify-center">
      <SelectItemIndicator>
        <Check class="tpd-h-4 tpd-w-4" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
