<script setup lang="ts">
import type { ToastActionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ToastAction } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ToastActionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ToastAction v-bind="delegatedProps" :class="cn('tpd-inline-flex tpd-h-8 tpd-shrink-0 tpd-items-center tpd-justify-center tpd-rounded-md tpd-border tpd-bg-transparent tpd-px-3 tpd-text-sm tpd-font-medium tpd-transition-colors hover:tpd-bg-secondary focus:tpd-outline-none focus:tpd-ring-1 focus:tpd-ring-ring disabled:tpd-pointer-events-none disabled:tpd-opacity-50 group-[.destructive]:tpd-border-muted/40 group-[.destructive]:hover:tpd-border-destructive/30 group-[.destructive]:hover:tpd-bg-destructive group-[.destructive]:hover:tpd-text-destructive-foreground group-[.destructive]:focus:tpd-ring-destructive', props.class)">
    <slot />
  </ToastAction>
</template>
