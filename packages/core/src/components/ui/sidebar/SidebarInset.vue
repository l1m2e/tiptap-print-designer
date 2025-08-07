<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <main
    :class="cn(
      'tpd-relative tpd-flex tpd-min-h-svh tpd-flex-1 tpd-flex-col tpd-bg-background',
      'peer-data-[variant=inset]:tpd-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tpd-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tpd-ml-2 md:peer-data-[variant=inset]:tpd-ml-0 md:peer-data-[variant=inset]:tpd-rounded-xl md:peer-data-[variant=inset]:tpd-shadow',
      props.class,
    )"
  >
    <slot />
  </main>
</template>
