<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tr :class="cn('tpd-border-b tpd-transition-colors hover:tpd-bg-muted/50 data-[state=selected]:tpd-bg-muted', props.class)">
    <slot />
  </tr>
</template>
