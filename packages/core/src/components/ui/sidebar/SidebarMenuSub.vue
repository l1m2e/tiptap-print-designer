<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <ul
    data-sidebar="menu-badge"
    :class="cn(
      'tpd-mx-3.5 tpd-flex tpd-min-w-0 tpd-translate-x-px tpd-flex-col tpd-gap-1 tpd-border-l tpd-border-sidebar-border tpd-px-2.5 tpd-py-0.5',
      'group-data-[collapsible=icon]:tpd-hidden',
      props.class,
    )"
  >
    <slot />
  </ul>
</template>
