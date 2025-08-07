<script setup lang="ts">
import type { SelectScrollUpButtonProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronUp } from "lucide-vue-next"
import { SelectScrollUpButton, useForwardProps } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cn('tpd-flex tpd-cursor-default tpd-items-center tpd-justify-center tpd-py-1', props.class)">
    <slot>
      <ChevronUp />
    </slot>
  </SelectScrollUpButton>
</template>
