<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('tpd-grid tpd-gap-1.5 tpd-p-4 tpd-text-center sm:tpd-text-left', props.class)">
    <slot />
  </div>
</template>
