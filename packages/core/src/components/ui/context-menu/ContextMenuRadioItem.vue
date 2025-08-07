<script setup lang="ts">
import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Circle } from "lucide-vue-next"
import {
  ContextMenuItemIndicator,
  ContextMenuRadioItem,

  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ContextMenuRadioItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ContextMenuRadioItemEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuRadioItem
    v-bind="forwarded"
    :class="cn(
      'tpd-relative tpd-flex tpd-cursor-default tpd-select-none tpd-items-center tpd-rounded-sm tpd-py-1.5 tpd-pl-8 tpd-pr-2 tpd-text-sm tpd-outline-none focus:tpd-bg-accent focus:tpd-text-accent-foreground data-[disabled]:tpd-pointer-events-none data-[disabled]:tpd-opacity-50',
      props.class,
    )"
  >
    <span class="tpd-absolute tpd-left-2 tpd-flex tpd-h-3.5 tpd-w-3.5 tpd-items-center tpd-justify-center">
      <ContextMenuItemIndicator>
        <Circle class="tpd-h-4 tpd-w-4 tpd-fill-current" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
