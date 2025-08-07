<script setup lang="ts">
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import {
  DropdownMenuCheckboxItem,

  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    :class=" cn(
      'tpd-relative tpd-flex tpd-cursor-default tpd-select-none tpd-items-center tpd-rounded-sm tpd-py-1.5 tpd-pl-8 tpd-pr-2 tpd-text-sm tpd-outline-none tpd-transition-colors focus:tpd-bg-accent focus:tpd-text-accent-foreground data-[disabled]:tpd-pointer-events-none data-[disabled]:tpd-opacity-50',
      props.class,
    )"
  >
    <span class="tpd-absolute tpd-left-2 tpd-flex tpd-h-3.5 tpd-w-3.5 tpd-items-center tpd-justify-center">
      <DropdownMenuItemIndicator>
        <Check class="tpd-w-4 tpd-h-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
