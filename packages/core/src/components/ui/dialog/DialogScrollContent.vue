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
      class="tpd-fixed tpd-inset-0 tpd-z-50 tpd-grid tpd-place-items-center tpd-overflow-y-auto tpd-bg-black/80 data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-fade-out-0 data-[state=open]:tpd-fade-in-0"
    >
      <DialogContent
        :class="
          cn(
            'tpd-relative tpd-z-50 tpd-grid tpd-w-full tpd-max-w-lg tpd-my-8 tpd-gap-4 tpd-border tpd-border-border tpd-bg-background tpd-p-6 tpd-shadow-lg tpd-duration-200 sm:tpd-rounded-lg md:tpd-w-full',
            props.class,
          )
        "
        v-bind="forwarded"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          class="tpd-absolute tpd-top-4 tpd-right-4 tpd-p-0.5 tpd-transition-colors tpd-rounded-md hover:tpd-bg-secondary"
        >
          <X class="tpd-w-4 tpd-h-4" />
          <span class="tpd-sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
