<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

interface SkeletonProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div :class="cn('tpd-animate-pulse tpd-rounded-md tpd-bg-primary/10', props.class)" />
</template>
