<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    :class="cn('tpd-flex tpd-flex-col tpd-gap-y-1.5 tpd-text-center sm:tpd-text-left', props.class)"
  >
    <slot />
  </div>
</template>
