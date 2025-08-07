<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div class="tpd-relative tpd-w-full tpd-overflow-auto">
    <table :class="cn('tpd-w-full tpd-caption-bottom tpd-text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
