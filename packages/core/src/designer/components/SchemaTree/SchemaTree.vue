<script setup lang="ts">
import type { SchemaTreeEmits, SchemaTreeProps } from './index'
import type { Schema, SchemaTree } from '~/db/types'

import { ChevronDown, ChevronRight, Search } from 'lucide-vue-next'
import { TreeItem, TreeRoot, TreeVirtualizer } from 'reka-ui'
import { computed, ref } from 'vue'

import { Input } from '~/components/ui/input'

const { tree = [] } = defineProps<SchemaTreeProps>()
const emits = defineEmits<SchemaTreeEmits>()

const searchQuery = ref('')

function select(val: Schema) {
  emits('select', val)
}

// 递归过滤树结构
function filterTree(nodes: SchemaTree, query: string): SchemaTree {
  if (!query) return nodes

  const filtered: SchemaTree = []

  for (const node of nodes) {
    // 检查当前节点是否匹配搜索条件
    const matches = (node.description?.toLowerCase().includes(query.toLowerCase()) ?? false) || (node.field?.toLowerCase().includes(query.toLowerCase()) ?? false)
    // 递归检查子节点
    const filteredChildren = node.children ? filterTree(node.children, query) : undefined
    // 如果当前节点匹配或有匹配的子节点，则包含此节点
    if (matches || (filteredChildren && filteredChildren.length > 0)) {
      filtered.push({
        ...node,
        children: filteredChildren,
      })
    }
  }

  return filtered
}

const filteredTree = computed(() => {
  return filterTree(tree, searchQuery.value)
})
</script>

<template>
  <div class="tpd-space-y-2">
    <!-- 搜索框 -->
    <div class="tpd-relative">
      <Search class="tpd-absolute tpd-left-3 tpd-top-1/2 tpd-size-4 tpd--translate-y-1/2 tpd-text-muted-foreground" />
      <Input
        v-model="searchQuery"
        placeholder="搜索字段或描述..."
        class="tpd-pl-10"
      />
    </div>

    <!-- 树形结构 -->
    <ScrollArea class="tpd-h-[500px] tpd-w-full">
      <TreeRoot :items="filteredTree" :get-key="(item) => item.id">
        <TreeVirtualizer v-slot="{ item }" :text-content="(opt) => opt.field">
          <TreeItem
            v-slot="{ isExpanded }" v-bind="item.bind"
            class="tpd-h-[32px] tpd-w-full tpd-flex tpd-items-center tpd-rounded tpd-text-sm focus:tpd-bg-accent hover:tpd-bg-accent/30"
            @select="(val) => select(val.detail.value as Schema)"
          >
            <div v-if="item.level !== 1" class="tpd-h-full tpd-flex tpd-items-center">
              <div v-for="l in item.level" :key="l" class="tpd-h-full tpd-w-3 tpd-flex tpd-items-center tpd-border-l">
                <div v-if="l === item.level" class="tpd-w-full tpd-border-t" />
              </div>
            </div>

            <component :is="isExpanded ? ChevronDown : ChevronRight" v-if="item.hasChildren" class="tpd-size-[14px]" />

            <div class="tpd-py-2 tpd-text-[12px]">
              <span
                class="tpd-border-input tpd-rounded-sm tpd-bg-[#58a6ff1f] tpd-px-2 tpd-py-0.5 tpd-text-[#58a6ff] tpd-shadow-sm"
                :class="item.value.field === 'ARRAY_ITEMS' && 'tpd-bg-purple-100 tpd-text-purple-500'"
              >
                {{ item.value.field === 'ARRAY_ITEMS' ? 'items' : item.value.field }}
              </span>
              <span class="tpd-mx-2">{{ item.value.type === 'array' ? `${item.value.type}<${item.value.parentType}>` : item.value.type }}</span>
              <span class="tpd-text-gray-500 dark:tpd-text-gray-300">{{ item.value.description }}</span>
            </div>
          </TreeItem>
        </TreeVirtualizer>
      </TreeRoot>
    </ScrollArea>
  </div>
</template>

<style scoped>
:deep([data-reka-scroll-area-viewport]) {
  outline: none !important;
}
</style>
