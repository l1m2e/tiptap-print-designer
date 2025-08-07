<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxItem, useForwardPropsEmits } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="cn('tpd-relative tpd-flex tpd-cursor-default tpd-gap-2 tpd-select-none tpd-justify-between tpd-items-center tpd-rounded-sm tpd-px-2 tpd-py-1.5 tpd-text-sm tpd-outline-none data-[highlighted]:tpd-bg-accent data-[highlighted]:tpd-text-accent-foreground data-[disabled]:tpd-pointer-events-none data-[disabled]:tpd-opacity-50 [&_svg]:tpd-size-4 [&_svg]:tpd-shrink-0', props.class)"
  >
    <slot />
  </ComboboxItem>
</template>
