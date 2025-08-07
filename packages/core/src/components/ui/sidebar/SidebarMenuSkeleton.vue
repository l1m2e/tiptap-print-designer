<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from '~/lib/utils'
import { Skeleton } from '~/components/ui/skeleton'

const props = defineProps<{
  showIcon?: boolean
  class?: HTMLAttributes["class"]
}>()

const width = computed(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`
})
</script>

<template>
  <div
    data-sidebar="menu-skeleton"
    :class="cn('tpd-rounded-md tpd-h-8 tpd-flex tpd-gap-2 tpd-px-2 tpd-items-center', props.class)"
  >
    <Skeleton
      v-if="showIcon"
      class="tpd-size-4 tpd-rounded-md"
      data-sidebar="menu-skeleton-icon"
    />

    <Skeleton
      class="tpd-h-4 tpd-flex-1 tpd-max-w-[--skeleton-width]"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
