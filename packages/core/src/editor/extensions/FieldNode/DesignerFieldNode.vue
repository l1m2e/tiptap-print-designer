<script lang="tsx" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Link } from 'lucide-vue-next'
import { NodeSelection, TextSelection } from 'prosemirror-state'
import { get } from 'radash'
import { computed, inject } from 'vue'
import { DESIGNER_KEY } from '~/designer'
import { useFloating } from '../../composables/useFloating'
import { useFormat } from '../../composables/useFormat'
import { EDITOR_CONTEXT } from '../../constants'

const props = defineProps(nodeViewProps)
const { data } = inject(EDITOR_CONTEXT)!
const { openFormatDialog, openSelectFieldDialog } = inject(DESIGNER_KEY)!

const { icon } = useFormat(props)

// 使用浮动定位组合式函数
const { wrapperStyle, toggleFloating, onMouseDown } = useFloating(props, ['inline', 'inline-block'])

async function openFormat() {
  const format = await openFormatDialog({
    format: props.node.attrs.format ? JSON.parse(props.node.attrs.format) : undefined,
    mockData: { value: get(data.value, props.node.attrs.path) },
    customTemplate: 'FiledNodeTemplate',
  })
  props.updateAttributes({ format: JSON.stringify(format) })
}

function changeField() {
  openSelectFieldDialog({
    mode: 'update',
    onConfirm: ({ label, path }) => {
      props.updateAttributes({ label, path })
    },
  })
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
  <NodeViewWrapper
    as="span"
    :style="wrapperStyle"
    :class="isFormat ? 'tpd-text-green-500' : 'tpd-text-purple-500'"
    class="tpd-cursor-pointer tpd-rounded tpd-inline tpd-break-all tpd-whitespace-normal [text-decoration:inherit]"
    @mousedown="onMouseDown"
  >
    <TooltipProvider>
      <ContextMenu>
        <ContextMenuTrigger>
          <Tooltip>
            <TooltipTrigger as-child>
              <template v-if="!isFormat">
                {{ text }}
              </template>
              <FormatNode v-else :value="text" />
            </TooltipTrigger>
            <TooltipContent>
              <div class="tpd-flex tpd-items-center">
                <component :is="icon || Link" class="tpd-mr-1 tpd-w-3 tpd-h-3" />
                <span class="tpd-ml-1">{{ props.node.attrs.label }} <span class="tpd-text-purple-300 tpd-font-bold">{{ props.node.attrs.path }}</span></span>
              </div>
            </TooltipContent>
          </Tooltip>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem @select="changeField">
            更换字段
          </ContextMenuItem>
          <ContextMenuItem v-if="props.node.attrs.format" @select="props.updateAttributes({ format: '' })">
            清除格式化
          </ContextMenuItem>
          <ContextMenuItem @select="openFormat">
            格式化
          </ContextMenuItem>
          <ContextMenuItem @select="toggleFloating">
            {{ props.node.attrs.isFloating ? '关闭自由拖拽' : '开启自由拖拽' }}
          </ContextMenuItem>
          <ContextMenuItem @select="copy">
            复制
          </ContextMenuItem>
          <ContextMenuItem @select="props.deleteNode">
            删除
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </TooltipProvider>
  </NodeViewWrapper>
</template>
