<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui"
import { cn } from '~/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes["class"] }>(), {
  sideOffset: 4,
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent v-bind="{ ...forwarded, ...$attrs }" :class="cn('tpd-z-50 tpd-overflow-hidden tpd-rounded-md tpd-bg-primary tpd-px-3 tpd-py-1.5 tpd-text-xs tpd-text-primary-foreground tpd-animate-in tpd-fade-in-0 tpd-zoom-in-95 data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=closed]:tpd-zoom-out-95 data-[side=bottom]:tpd-slide-in-from-top-2 data-[side=left]:tpd-slide-in-from-right-2 data-[side=right]:tpd-slide-in-from-left-2 data-[side=top]:tpd-slide-in-from-bottom-2', props.class)">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
