<script setup lang="ts">
import type { SplitterResizeHandleEmits, SplitterResizeHandleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { GripVertical } from "lucide-vue-next"
import { SplitterResizeHandle, useForwardPropsEmits } from "reka-ui"
import { cn } from '~/lib/utils'

const props = defineProps<SplitterResizeHandleProps & { class?: HTMLAttributes["class"], withHandle?: boolean }>()
const emits = defineEmits<SplitterResizeHandleEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SplitterResizeHandle v-bind="forwarded" :class="cn('tpd-relative tpd-flex tpd-w-px tpd-items-center tpd-justify-center tpd-bg-border after:tpd-absolute after:tpd-inset-y-0 after:tpd-left-1/2 after:tpd-w-1 after:tpd--translate-x-1/2 focus-visible:tpd-outline-none focus-visible:tpd-ring-1 focus-visible:tpd-ring-ring focus-visible:tpd-ring-offset-1 [&[data-orientation=vertical]]:tpd-h-px [&[data-orientation=vertical]]:tpd-w-full [&[data-orientation=vertical]]:after:tpd-left-0 [&[data-orientation=vertical]]:after:tpd-h-1 [&[data-orientation=vertical]]:after:tpd-w-full [&[data-orientation=vertical]]:after:tpd--translate-y-1/2 [&[data-orientation=vertical]]:after:tpd-translate-x-0 [&[data-orientation=vertical]>div]:tpd-rotate-90', props.class)">
    <template v-if="props.withHandle">
      <div class="tpd-z-10 tpd-flex tpd-h-4 tpd-w-3 tpd-items-center tpd-justify-center tpd-rounded-sm tpd-border tpd-bg-border">
        <GripVertical class="tpd-h-2.5 tpd-w-2.5" />
      </div>
    </template>
  </SplitterResizeHandle>
</template>
