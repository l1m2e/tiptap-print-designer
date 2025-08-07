<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  ScrollAreaCorner,
  ScrollAreaRoot,

  ScrollAreaViewport,
} from "reka-ui"
import { cn } from '~/lib/utils'
import ScrollBar from "./ScrollBar.vue"

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('tpd-relative tpd-overflow-hidden', props.class)">
    <ScrollAreaViewport class="tpd-h-full tpd-w-full tpd-rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
