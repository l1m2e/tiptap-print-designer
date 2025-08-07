<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tfoot :class="cn('tpd-border-t tpd-bg-muted/50 tpd-font-medium [&>tr]:last:tpd-border-b-0', props.class)">
    <slot />
  </tfoot>
</template>
