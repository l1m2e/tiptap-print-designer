<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui"
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes["class"] }>(), {
  orientation: "vertical",
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="
      cn('tpd-flex tpd-touch-none tpd-select-none tpd-transition-colors',
         orientation === 'tpd-vertical'
           && 'tpd-h-full tpd-w-2.5 tpd-border-l tpd-border-l-transparent tpd-p-px',
         orientation === 'tpd-horizontal'
           && 'tpd-h-2.5 tpd-flex-col tpd-border-t tpd-border-t-transparent tpd-p-px',
         props.class)"
  >
    <ScrollAreaThumb class="tpd-relative tpd-flex-1 tpd-rounded-full tpd-bg-border" />
  </ScrollAreaScrollbar>
</template>
