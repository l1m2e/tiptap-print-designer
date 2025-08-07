<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TabsList } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="cn(
      'tpd-inline-flex tpd-items-center tpd-justify-center tpd-rounded-lg tpd-bg-muted tpd-p-1 tpd-text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
