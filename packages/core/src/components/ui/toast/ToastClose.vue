<script setup lang="ts">
import type { ToastCloseProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import { ToastClose } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ToastClose v-bind="delegatedProps" :class="cn('tpd-absolute tpd-right-1 tpd-top-1 tpd-rounded-md tpd-p-1 tpd-text-foreground/50 tpd-opacity-0 tpd-transition-opacity hover:tpd-text-foreground focus:tpd-opacity-100 focus:tpd-outline-none focus:tpd-ring-1 group-hover:tpd-opacity-100 group-[.destructive]:tpd-text-red-300 group-[.destructive]:hover:tpd-text-red-50 group-[.destructive]:focus:tpd-ring-red-400 group-[.destructive]:focus:tpd-ring-offset-red-600', props.class)">
    <X class="tpd-h-4 tpd-w-4" />
  </ToastClose>
</template>
