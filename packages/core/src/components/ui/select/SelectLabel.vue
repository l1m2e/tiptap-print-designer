<script setup lang="ts">
import type { SelectLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectLabel } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectLabel :class="cn('tpd-px-2 tpd-py-1.5 tpd-text-sm tpd-font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>
