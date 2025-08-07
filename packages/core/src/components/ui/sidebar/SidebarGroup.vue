<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-sidebar="group"
    :class="cn('tpd-relative tpd-flex tpd-w-full tpd-min-w-0 tpd-flex-col tpd-p-2', props.class)"
  >
    <slot />
  </div>
</template>
