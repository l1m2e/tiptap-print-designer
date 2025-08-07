<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-sidebar="content"
    :class="cn('tpd-flex tpd-min-h-0 tpd-flex-1 tpd-flex-col tpd-gap-2 tpd-overflow-auto group-data-[collapsible=icon]:tpd-overflow-hidden', props.class)"
  >
    <slot />
  </div>
</template>
