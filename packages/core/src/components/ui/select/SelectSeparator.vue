<script setup lang="ts">
import type { SelectSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SelectSeparator } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <SelectSeparator v-bind="delegatedProps" :class="cn('tpd--mx-1 tpd-my-1 tpd-h-px tpd-bg-muted', props.class)" />
</template>
