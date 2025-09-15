<script setup lang="ts">
import type { ActionButtonProps } from '.'

const { title, icon, fn, variant = 'ghost' } = defineProps<ActionButtonProps>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button size="icon" class="tpd-font-black" :variant="variant" @click="fn">
          <component :is="icon" />
        </Button>
      </TooltipTrigger>
      <TooltipContent> {{ title }} </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
