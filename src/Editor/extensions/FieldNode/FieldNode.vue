<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Link } from 'lucide-vue-next'
import { get } from 'radash'
import { inject } from 'vue'
import { DESIGNER_KEY } from '~/Designer'
import { useFormat } from '../../composables/useFormat'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)
const { mode, data } = inject(EDITOR_CONTEXT)!
const { openFormatDialog } = inject(DESIGNER_KEY)!

const text = computed(() => mode === 'designer' ? props.node.attrs.label : get(data.value, props.node.attrs.path))
const { FormatNode, icon, isFormat } = useFormat(props)

function openFormat() {
  openFormatDialog({ nodeProps: props, mockData: { value: get(data.value, props.node.attrs.path) } })
}
</script>

<template>
  <NodeViewWrapper
    as="span"
    :style="{ fontSize: props.node.attrs.fontSize }"
  >
    <ContextMenu v-if="mode === 'designer'" class="w-full">
      <ContextMenuTrigger>
        <div class="inline-flex items-center justify-center px-2 py-0.5 bg-purple-500 rounded-[5px] text-white">
          <component :is="icon || Link" class="mr-1" :style="{ width: props.node.attrs.fontSize, height: props.node.attrs.fontSize }" />
          <span>{{ text }}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem v-if="props.node.attrs.format" @select="props.updateAttributes({ format: '' })">
          清除格式化
        </ContextMenuItem>
        <ContextMenuItem @select="openFormat">
          格式化
        </ContextMenuItem>
        <ContextMenuItem @select="props.deleteNode">
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

    <template v-else>
      <template v-if="!isFormat">
        {{ text }}
      </template>
      <FormatNode v-else :value="text" />
    </template>
  </NodeViewWrapper>
</template>
