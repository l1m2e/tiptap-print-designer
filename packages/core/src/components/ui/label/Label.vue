<script setup lang="ts">
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Label } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'tpd-text-sm tpd-font-medium tpd-leading-none peer-disabled:tpd-cursor-not-allowed peer-disabled:tpd-opacity-70',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
