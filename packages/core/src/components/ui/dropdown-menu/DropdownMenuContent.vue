<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  DropdownMenuContent,

  DropdownMenuPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '~/lib/utils'

const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    sideOffset: 4,
  },
)
const emits = defineEmits<DropdownMenuContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="forwarded"
      :class="cn('tpd-z-50 tpd-min-w-32 tpd-overflow-hidden tpd-rounded-md tpd-border tpd-bg-popover tpd-p-1 tpd-text-popover-foreground tpd-shadow-md data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=open]:tpd-fade-in-0 data-[state=closed]:tpd-zoom-out-95 data-[state=open]:tpd-zoom-in-95 data-[side=bottom]:tpd-slide-in-from-top-2 data-[side=left]:tpd-slide-in-from-right-2 data-[side=right]:tpd-slide-in-from-left-2 data-[side=top]:tpd-slide-in-from-bottom-2', props.class)"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
