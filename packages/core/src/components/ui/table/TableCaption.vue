<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <caption :class="cn('tpd-mt-4 tpd-text-sm tpd-text-muted-foreground', props.class)">
    <slot />
  </caption>
</template>
