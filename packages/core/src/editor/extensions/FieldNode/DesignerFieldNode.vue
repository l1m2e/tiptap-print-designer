<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Link } from 'lucide-vue-next'
import { NodeSelection, TextSelection } from 'prosemirror-state'
import { get } from 'radash'
import { computed, inject } from 'vue'
import { DESIGNER_KEY } from '~/designer'
import { useFormat } from '../../composables/useFormat'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)
const { data } = inject(EDITOR_CONTEXT)!
const { openFormatDialog } = inject(DESIGNER_KEY)!

const { icon } = useFormat(props)

async function openFormat() {
  const format = await openFormatDialog({
    format: props.node.attrs.format ? JSON.parse(props.node.attrs.format) : undefined,
    mockData: { value: get(data.value, props.node.attrs.path) },
    customTemplate: 'FiledNodeTemplate',
  })
  props.updateAttributes({ format: JSON.stringify(format) })
}

const text = computed<string>(() => get(data.value, props.node.attrs.path))
const { FormatNode, isFormat } = useFormat(props)

async function copy() {
  const view = props.editor.view
  const state = view.state
  const getPos = (props as any).getPos
  const textValue = String(text.value ?? '')

  // 如果没法获取节点位置，直接兜底复制纯文本
  if (typeof getPos !== 'function') {
    return navigator.clipboard.writeText(textValue).catch(() => {})
  }

  const pos = getPos()
  if (typeof pos !== 'number') {
    return navigator.clipboard.writeText(textValue).catch(() => {})
  }

  const from = pos
  const to = pos + props.node.nodeSize
  const prevSel = state.selection

  // 聚焦编辑器
  props.editor.commands.focus()

  // 尝试设置选区到该节点
  try {
    view.dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)))
  }
  catch {
    view.dispatch(state.tr.setSelection(TextSelection.create(state.doc, from, to)))
  }

  // 用 execCommand 触发 ProseMirror 内置复制逻辑
  const ok = document.execCommand('copy')

  // 还原原始选区
  view.dispatch(view.state.tr.setSelection(prevSel))

  if (!ok) {
    // execCommand 被禁用时，用 Clipboard API 兜底复制纯文本
    await navigator.clipboard.writeText(textValue).catch(() => {})
  }
}
</script>

<template>
  <NodeViewWrapper as="span" :style="{ fontSize: props.node.attrs.fontSize }">
    <ContextMenu class="tpd-w-full">
      <ContextMenuTrigger>
        <div class="tpd-inline-flex tpd-items-center tpd-justify-center  tpd-rounded tpd-cursor-pointer" :class="isFormat ? 'tpd-text-green-500' : 'tpd-text-purple-500'">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <span>
                  <template v-if="!isFormat">{{ text }}</template>
                  <FormatNode v-else :value="text" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div class="tpd-flex tpd-items-center">
                  <component :is="icon || Link" class="tpd-mr-1 tpd-w-4 tpd-h-4" />
                  <span class="tpd-ml-1">{{ props.node.attrs.label }}</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem v-if="props.node.attrs.format" @select="props.updateAttributes({ format: '' })">
          清除格式化
        </ContextMenuItem>
        <ContextMenuItem @select="openFormat">
          格式化
        </ContextMenuItem>
        <ContextMenuItem @select="copy">
          复制
        </ContextMenuItem>
        <ContextMenuItem @select="props.deleteNode">
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </NodeViewWrapper>
</template>
