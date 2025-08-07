<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import { Dialog, DialogContent } from '~/components/ui/dialog'
import Command from "./Command.vue"

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogContent class="tpd-overflow-hidden tpd-p-0 tpd-shadow-lg">
      <Command class="[&_[cmdk-group-heading]]:tpd-px-2 [&_[cmdk-group-heading]]:tpd-font-medium [&_[cmdk-group-heading]]:tpd-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:tpd-pt-0 [&_[cmdk-group]]:tpd-px-2 [&_[cmdk-input-wrapper]_svg]:tpd-h-5 [&_[cmdk-input-wrapper]_svg]:tpd-w-5 [&_[cmdk-input]]:tpd-h-12 [&_[cmdk-item]]:tpd-px-2 [&_[cmdk-item]]:tpd-py-3 [&_[cmdk-item]_svg]:tpd-h-5 [&_[cmdk-item]_svg]:tpd-w-5">
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
