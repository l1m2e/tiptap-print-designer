<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
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

const props = defineProps<DialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="tpd-fixed tpd-inset-0 tpd-z-50 tpd-bg-black/80 data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=open]:tpd-fade-in-0"
    />
    <DialogContent
      v-bind="forwarded"
      :class="
        cn(
          'tpd-fixed tpd-left-1/2 tpd-top-1/2 tpd-z-50 tpd-grid tpd-w-full tpd-max-w-lg tpd--translate-x-1/2 tpd--translate-y-1/2 tpd-gap-4 tpd-border tpd-bg-background tpd-p-6 tpd-shadow-lg tpd-duration-200 data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=open]:tpd-fade-in-0 data-[state=closed]:tpd-zoom-out-95 data-[state=open]:tpd-zoom-in-95 data-[state=closed]:tpd-slide-out-to-left-1/2 data-[state=closed]:tpd-slide-out-to-top-[48%] data-[state=open]:tpd-slide-in-from-left-1/2 data-[state=open]:tpd-slide-in-from-top-[48%] sm:tpd-rounded-lg',
          props.class,
        )"
    >
      <slot />

      <DialogClose
        class="tpd-absolute tpd-right-4 tpd-top-4 tpd-rounded-sm tpd-opacity-70 tpd-ring-offset-background tpd-transition-opacity hover:tpd-opacity-100 focus:tpd-outline-none focus:tpd-ring-2 focus:tpd-ring-ring focus:tpd-ring-offset-2 disabled:tpd-pointer-events-none data-[state=open]:tpd-bg-accent data-[state=open]:tpd-text-muted-foreground"
      >
        <X class="tpd-w-4 tpd-h-4" />
        <span class="tpd-sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
