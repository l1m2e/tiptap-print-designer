<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from '~/lib/utils'
import TableCell from "./TableCell.vue"
import TableRow from "./TableRow.vue"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  colspan?: number
}>(), {
  colspan: 1,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <TableRow>
    <TableCell
      :class="
        cn(
          'tpd-p-4 tpd-whitespace-nowrap tpd-align-middle tpd-text-sm tpd-text-foreground',
          props.class,
        )
      "
      v-bind="delegatedProps"
    >
      <div class="tpd-flex tpd-items-center tpd-justify-center tpd-py-10">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
