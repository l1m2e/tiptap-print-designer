<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { DrawerContent, DrawerPortal } from "vaul-vue"
import { cn } from '~/lib/utils'
import DrawerOverlay from "./DrawerOverlay.vue"

const props = defineProps<DialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwardedProps" :class="cn(
        'tpd-fixed tpd-inset-x-0 tpd-bottom-0 tpd-z-50 tpd-mt-24 tpd-flex tpd-h-auto tpd-flex-col tpd-rounded-t-[10px] tpd-border tpd-bg-background',
        props.class,
      )"
    >
      <div class="tpd-mx-auto tpd-mt-4 tpd-h-2 tpd-w-[100px] tpd-rounded-full tpd-bg-muted" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
