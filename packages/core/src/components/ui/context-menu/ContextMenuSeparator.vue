<script setup lang="ts">
import type { ContextMenuSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  ContextMenuSeparator,

} from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<ContextMenuSeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ContextMenuSeparator v-bind="delegatedProps" :class="cn('tpd--mx-1 tpd-my-1 tpd-h-px tpd-bg-border', props.class)" />
</template>
