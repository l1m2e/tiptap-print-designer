<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <td
    :class="
      cn(
        'tpd-p-2 tpd-align-middle [&:has([role=checkbox])]:tpd-pr-0 [&>[role=checkbox]]:tpd-translate-y-0.5',
        props.class,
      )
    "
  >
    <slot />
  </td>
</template>
