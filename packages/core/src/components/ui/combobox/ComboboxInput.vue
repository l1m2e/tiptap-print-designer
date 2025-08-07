<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxInput, useForwardPropsEmits } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxInput
    v-bind="forwarded"
    :class="cn('tpd-flex tpd-h-9 tpd-w-full tpd-rounded-md tpd-border tpd-border-input tpd-bg-transparent tpd-px-3 tpd-py-1 tpd-text-sm tpd-shadow-sm tpd-transition-colors file:tpd-border-0 file:tpd-bg-transparent file:tpd-text-sm file:tpd-font-medium placeholder:tpd-text-muted-foreground focus-visible:tpd-outline-none focus-visible:tpd-ring-1 focus-visible:tpd-ring-ring disabled:tpd-cursor-not-allowed disabled:tpd-opacity-50', props.class)"
  >
    <slot />
  </ComboboxInput>
</template>
