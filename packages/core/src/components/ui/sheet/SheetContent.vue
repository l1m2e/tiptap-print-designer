<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { SheetVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import {
  DialogClose,
  DialogContent,

  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '~/lib/utils'
import { sheetVariants } from "."

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes["class"]
  side?: SheetVariants["side"]
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "side")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="tpd-fixed tpd-inset-0 tpd-z-50 tpd-bg-black/80 data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=open]:tpd-fade-in-0"
    />
    <DialogContent
      :class="cn(sheetVariants({ side }), props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />

      <DialogClose
        class="tpd-absolute tpd-right-4 tpd-top-4 tpd-rounded-sm tpd-opacity-70 tpd-ring-offset-background tpd-transition-opacity hover:tpd-opacity-100 focus:tpd-outline-none focus:tpd-ring-2 focus:tpd-ring-ring focus:tpd-ring-offset-2 disabled:tpd-pointer-events-none data-[state=open]:tpd-bg-secondary"
      >
        <X class="tpd-w-4 tpd-h-4" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
