<script setup lang="ts">
import type { ActionButtonProps } from '.'

const { title, icon, fn } = defineProps<ActionButtonProps>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button size="icon" class="font-black" variant="ghost" @click="fn">
          <component :is="icon" />
        </Button>
      </TooltipTrigger>
      <TooltipContent> {{ title }} </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
