<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<SliderRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    :class="cn(
      'tpd-relative tpd-flex tpd-w-full tpd-touch-none tpd-select-none tpd-items-center data-[orientation=vertical]:tpd-flex-col data-[orientation=vertical]:tpd-w-1.5 data-[orientation=vertical]:tpd-h-full',
      props.class,
    )"
    v-bind="forwarded"
  >
    <SliderTrack class="tpd-relative tpd-h-1.5 tpd-w-full data-[orientation=vertical]:tpd-w-1.5 tpd-grow tpd-overflow-hidden tpd-rounded-full tpd-bg-primary/20">
      <SliderRange class="tpd-absolute tpd-h-full data-[orientation=vertical]:tpd-w-full tpd-bg-primary" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="tpd-block tpd-h-5 tpd-w-5 tpd-rounded-full tpd-border-2 tpd-border-primary tpd-bg-background tpd-ring-offset-background tpd-transition-colors focus-visible:tpd-outline-none focus-visible:tpd-ring-2 focus-visible:tpd-ring-ring focus-visible:tpd-ring-offset-2 disabled:tpd-pointer-events-none disabled:tpd-opacity-50"
    />
  </SliderRoot>
</template>
