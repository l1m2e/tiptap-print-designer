<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  SelectContent,

  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '~/lib/utils'
import { SelectScrollDownButton, SelectScrollUpButton } from "."

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    position: "popper",
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }" :class="cn(
        'tpd-relative tpd-z-50 tpd-max-h-96 tpd-min-w-32 tpd-overflow-hidden tpd-rounded-md tpd-border tpd-bg-popover tpd-text-popover-foreground tpd-shadow-md data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=open]:tpd-fade-in-0 data-[state=closed]:tpd-zoom-out-95 data-[state=open]:tpd-zoom-in-95 data-[side=bottom]:tpd-slide-in-from-top-2 data-[side=left]:tpd-slide-in-from-right-2 data-[side=right]:tpd-slide-in-from-left-2 data-[side=top]:tpd-slide-in-from-bottom-2',
        position === 'popper'
          && 'data-[side=bottom]:tpd-translate-y-1 data-[side=left]:tpd--translate-x-1 data-[side=right]:tpd-translate-x-1 data-[side=top]:tpd--translate-y-1',
        props.class,
      )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn('tpd-p-1', position === 'popper' && 'tpd-h-[--reka-select-trigger-height] tpd-w-full tpd-min-w-[--reka-select-trigger-width]')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
