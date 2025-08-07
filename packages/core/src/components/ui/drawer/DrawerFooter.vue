<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('tpd-mt-auto tpd-flex tpd-flex-col tpd-gap-2 tpd-p-4', props.class)">
    <slot />
  </div>
</template>
