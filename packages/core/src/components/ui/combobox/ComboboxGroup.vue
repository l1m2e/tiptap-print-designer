<script setup lang="ts">
import type { ComboboxGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxGroup, ComboboxLabel } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ComboboxGroupProps & {
  class?: HTMLAttributes["class"]
  heading?: string
}>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ComboboxGroup
    v-bind="delegatedProps"
    :class="cn('tpd-overflow-hidden tpd-p-1 tpd-text-foreground [&_[cmdk-group-heading]]:tpd-px-2 [&_[cmdk-group-heading]]:tpd-py-1.5 [&_[cmdk-group-heading]]:tpd-text-xs [&_[cmdk-group-heading]]:tpd-font-medium [&_[cmdk-group-heading]]:tpd-text-muted-foreground', props.class)"
  >
    <ComboboxLabel v-if="heading" class="tpd-px-2 tpd-py-1.5 tpd-text-xs tpd-font-medium tpd-text-muted-foreground">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
