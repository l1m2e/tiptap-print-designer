<script setup lang="ts">
import type { ContextMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ContextMenuLabel } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ContextMenuLabelProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ContextMenuLabel
    v-bind="delegatedProps"
    :class="
      cn('tpd-px-2 tpd-py-1.5 tpd-text-sm tpd-font-semibold tpd-text-foreground',
         inset && 'tpd-pl-8', props.class,
      )"
  >
    <slot />
  </ContextMenuLabel>
</template>
