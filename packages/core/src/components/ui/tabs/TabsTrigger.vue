<script setup lang="ts">
import type { TabsTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TabsTrigger, useForwardProps } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="cn(
      'tpd-inline-flex tpd-items-center tpd-justify-center tpd-whitespace-nowrap tpd-rounded-md tpd-px-3 tpd-py-1 tpd-text-sm tpd-font-medium tpd-ring-offset-background tpd-transition-all focus-visible:tpd-outline-none focus-visible:tpd-ring-2 focus-visible:tpd-ring-ring focus-visible:tpd-ring-offset-2 disabled:tpd-pointer-events-none disabled:tpd-opacity-50 data-[state=active]:tpd-bg-background data-[state=active]:tpd-text-foreground data-[state=active]:tpd-shadow',
      props.class,
    )"
  >
    <span class="tpd-truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
