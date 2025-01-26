<script setup lang="ts">
import type { Schema, SchemaTreeEmits, SchemaTreeProps } from './index'
import { TreeItem, TreeRoot, TreeVirtualizer } from 'reka-ui'
import { apiSchemaToApiTree } from '../../utils/apiSchemaToApiTree'

const { schema, tree = [] } = defineProps<SchemaTreeProps>()
const emits = defineEmits<SchemaTreeEmits>()

function select(val: Schema) {
  emits('select', val)
}

const items = computed(() => schema ? apiSchemaToApiTree(schema) : tree)
</script>

<template>
  <ScrollArea class="h-500px w-full">
    <TreeRoot :items :get-key="(item) => item.id">
      <TreeVirtualizer v-slot="{ item }" :text-content="(opt) => opt.field">
        <TreeItem
          v-slot="{ isExpanded }" v-bind="item.bind"
          class="h-32px w-full flex items-center rounded text-sm focus:bg-accent hover:bg-accent/30"
          @select="(val) => select(val.detail.value as Schema)"
        >
          <div v-if="item.level !== 1" class="h-full flex items-center">
            <div v-for="l in item.level" :key="l" class="h-full w-3 flex items-center items-center border-l">
              <div v-if="l === item.level" class="w-full border-t" />
            </div>
          </div>

          <div class="w-3">
            <div v-if="item.hasChildren" :class="isExpanded ? 'i-ri-arrow-down-s-fill' : 'i-ri-arrow-right-s-fill'" />
          </div>

          <div class="py-2">
            <span class="border-input rounded-sm bg-#58a6ff1f px-2 py-0.5 text-#58a6ff shadow-sm">{{ item.value.field }}</span>
            <span class="mx-2">{{ item.value.type === 'array' ? `${item.value.type}<${item.value.parentType}>` : item.value.type }}</span>
            <span>{{ item.value.description }}</span>
          </div>
        </TreeItem>
      </TreeVirtualizer>
    </TreeRoot>
  </ScrollArea>
</template>
