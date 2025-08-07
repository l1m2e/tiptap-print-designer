<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-sidebar="header"
    :class="cn('tpd-flex tpd-flex-col tpd-gap-2 tpd-p-2', props.class)"
  >
    <slot />
  </div>
</template>
