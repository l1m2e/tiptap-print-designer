<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'
import { Separator } from '~/components/ui/separator'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Separator
    data-sidebar="separator"
    :class="cn('tpd-mx-2 tpd-w-auto tpd-bg-sidebar-border', props.class)"
  >
    <slot />
  </Separator>
</template>
