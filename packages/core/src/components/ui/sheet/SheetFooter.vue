<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    :class="
      cn(
        'tpd-flex tpd-flex-col-reverse sm:tpd-flex-row sm:tpd-justify-end sm:tpd-gap-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
