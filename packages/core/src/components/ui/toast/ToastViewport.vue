<script setup lang="ts">
import type { ToastViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ToastViewport } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ToastViewport v-bind="delegatedProps" :class="cn('tpd-fixed tpd-top-0 tpd-z-[100] tpd-flex tpd-max-h-screen tpd-w-full tpd-flex-col-reverse tpd-p-4 sm:tpd-bottom-0 sm:tpd-right-0 sm:tpd-top-auto sm:tpd-flex-col md:tpd-max-w-[420px]', props.class)" />
</template>
