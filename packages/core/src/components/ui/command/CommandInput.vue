<script setup lang="ts">
import type { ListboxFilterProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Search } from "lucide-vue-next"
import { ListboxFilter, useForwardProps } from "reka-ui"
import { cn } from '~/lib/utils'
import { useCommand } from "."

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ListboxFilterProps & {
  class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)

const { filterState } = useCommand()
</script>

<template>
  <div class="tpd-flex tpd-items-center tpd-border-b tpd-px-3" cmdk-input-wrapper>
    <Search class="tpd-mr-2 tpd-h-4 tpd-w-4 tpd-shrink-0 tpd-opacity-50" />
    <ListboxFilter
      v-bind="{ ...forwardedProps, ...$attrs }"
      v-model="filterState.search"
      auto-focus
      :class="cn('tpd-flex tpd-h-10 tpd-w-full tpd-rounded-md tpd-bg-transparent tpd-py-3 tpd-text-sm tpd-outline-none placeholder:tpd-text-muted-foreground disabled:tpd-cursor-not-allowed disabled:tpd-opacity-50', props.class)"
    />
  </div>
</template>
