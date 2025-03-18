<script setup lang="ts">
import { EDITOR_CONTEXT } from '~/components/Editor/constants'
import TableMenu from './TableMenu.vue'

const { editor } = inject(EDITOR_CONTEXT)!
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent>
      <TableMenu v-if="editor?.isActive('table')" />
    </ContextMenuContent>
  </ContextMenu>
</template>
