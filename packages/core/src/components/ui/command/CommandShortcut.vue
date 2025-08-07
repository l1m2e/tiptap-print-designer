<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span :class="cn('tpd-ml-auto tpd-text-xs tpd-tracking-widest tpd-text-muted-foreground', props.class)">
    <slot />
  </span>
</template>
