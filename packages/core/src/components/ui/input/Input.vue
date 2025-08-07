<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from '~/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" :class="cn('tpd-flex tpd-h-9 tpd-w-full tpd-rounded-md tpd-border tpd-border-input tpd-bg-transparent tpd-px-3 tpd-py-1 tpd-text-sm tpd-shadow-sm tpd-transition-colors file:tpd-border-0 file:tpd-bg-transparent file:tpd-text-sm file:tpd-font-medium placeholder:tpd-text-muted-foreground focus-visible:tpd-outline-none focus-visible:tpd-ring-1 focus-visible:tpd-ring-ring disabled:tpd-cursor-not-allowed disabled:tpd-opacity-50', props.class)">
</template>
