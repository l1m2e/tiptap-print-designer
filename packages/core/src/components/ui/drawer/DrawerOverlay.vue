<script lang="ts" setup>
import type { DialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DrawerOverlay } from "vaul-vue"
import { cn } from '~/lib/utils'

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DrawerOverlay v-bind="delegatedProps" :class="cn('tpd-fixed tpd-inset-0 tpd-z-50 tpd-bg-black/80', props.class)" />
</template>
