<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'
import { Input } from '~/components/ui/input'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Input
    data-sidebar="input"
    :class="cn(
      'tpd-h-8 tpd-w-full tpd-bg-background tpd-shadow-none focus-visible:tpd-ring-2 focus-visible:tpd-ring-sidebar-ring',
      props.class,
    )"
  >
    <slot />
  </Input>
</template>
