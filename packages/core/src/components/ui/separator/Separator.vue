<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "reka-ui"
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"] }
>(), {
  orientation: "horizontal",
  decorative: true,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      cn(
        'tpd-shrink-0 tpd-bg-border',
        props.orientation === 'horizontal' ? 'tpd-h-px tpd-w-full' : 'tpd-w-px tpd-h-full',
        props.class,
      )
    "
  />
</template>
