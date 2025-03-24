<script setup lang="ts">
import type { SchemaTreeEmits, SchemaTreeProps } from './index'
import type { Schema } from '~/db/types'
import { ChevronDown, ChevronRight } from 'lucide-vue-next'
import { TreeItem, TreeRoot, TreeVirtualizer } from 'reka-ui'

const { tree = [] } = defineProps<SchemaTreeProps>()
const emits = defineEmits<SchemaTreeEmits>()

function select(val: Schema) {
  emits('select', val)
}
</script>

<template>
  <ScrollArea class="h-[500px] w-full">
    <TreeRoot :items="tree" :get-key="(item) => item.id">
      <TreeVirtualizer v-slot="{ item }" :text-content="(opt) => opt.field">
        <TreeItem
          v-slot="{ isExpanded }" v-bind="item.bind"
          class="h-[32px] w-full flex items-center rounded text-sm focus:bg-accent hover:bg-accent/30"
          @select="(val) => select(val.detail.value as Schema)"
        >
          <div v-if="item.level !== 1" class="h-full flex items-center">
            <div v-for="l in item.level" :key="l" class="h-full w-3 flex items-center border-l">
              <div v-if="l === item.level" class="w-full border-t" />
            </div>
          </div>

          <component :is="isExpanded ? ChevronDown : ChevronRight" v-if="item.hasChildren" class=" size-[14px]" />

          <div class="py-2 text-[12px]">
            <span class="border-input rounded-sm bg-[#58a6ff1f] px-2 py-0.5 text-[#58a6ff] shadow-sm">{{ item.value.field }}</span>
            <span class="mx-2">{{ item.value.type === 'array' ? `${item.value.type}<${item.value.parentType}>` : item.value.type }}</span>
            <span class="text-gray-500 dark:text-gray-300">{{ item.value.description }}</span>
          </div>
        </TreeItem>
      </TreeVirtualizer>
    </TreeRoot>
  </ScrollArea>
</template>

<style scoped>
:deep([data-reka-scroll-area-viewport]) {
  outline: none !important;
}
</style>
