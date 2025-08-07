<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <th :class="cn('tpd-h-10 tpd-px-2 tpd-text-left tpd-align-middle tpd-font-medium tpd-text-muted-foreground [&:has([role=checkbox])]:tpd-pr-0 [&>[role=checkbox]]:tpd-translate-y-0.5', props.class)">
    <slot />
  </th>
</template>
