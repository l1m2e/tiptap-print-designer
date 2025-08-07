<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  PopoverContent,

  PopoverPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '~/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    align: "center",
    sideOffset: 4,
  },
)
const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'tpd-z-50 tpd-w-72 tpd-rounded-md tpd-border tpd-bg-popover tpd-p-4 tpd-text-popover-foreground tpd-shadow-md tpd-outline-none data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=open]:tpd-fade-in-0 data-[state=closed]:tpd-zoom-out-95 data-[state=open]:tpd-zoom-in-95 data-[side=bottom]:tpd-slide-in-from-top-2 data-[side=left]:tpd-slide-in-from-right-2 data-[side=right]:tpd-slide-in-from-left-2 data-[side=top]:tpd-slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
