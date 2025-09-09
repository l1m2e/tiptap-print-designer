<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed, inject, ref } from 'vue'
import { DESIGNER_KEY } from '~/designer'

const props = defineProps(nodeViewProps)
const { openEditSFCDialog } = inject(DESIGNER_KEY)!

const isInline = computed(() => props.node.type.name === 'sfc-inline')

const isDragging = ref(false)
const dragStart = ref<{ sx: number, sy: number, x: number, y: number } | null>(null)

const wrapperStyle = computed(() => {
  if (props.node.attrs.isFloating) {
    return {
      position: 'absolute',
      left: `${props.node.attrs.x || 0}pt`,
      top: `${props.node.attrs.y || 0}pt`,
      zIndex: props.node.attrs.zIndex || 1,
      cursor: isDragging.value ? 'grabbing' : 'grab',
    } as Record<string, string | number>
  }
  return {
    display: isInline.value ? 'inline-block' : 'block',
  }
})

function edit() {
  openEditSFCDialog(props.node.attrs.text)
}

function ddelete() {
  props.deleteNode()
}

function toggleFloating() {
  props.updateAttributes({ isFloating: !props.node.attrs.isFloating })
}

function onMouseDown(e: MouseEvent) {
  if (!props.node.attrs.isFloating) return
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
  dragStart.value = { sx: e.clientX, sy: e.clientY, x: props.node.attrs.x || 0, y: props.node.attrs.y || 0 }

  const onMove = (ev: MouseEvent) => {
    if (!dragStart.value) return
    const dx = ev.clientX - dragStart.value.sx
    const dy = ev.clientY - dragStart.value.sy
    props.updateAttributes({ x: dragStart.value.x + dx, y: dragStart.value.y + dy })
  }
  const onUp = () => {
    isDragging.value = false
    dragStart.value = null
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function toggleInlineBlock() {
  const getPos = (props as any).getPos?.()
  if (typeof getPos !== 'number') return

  const { state, view } = props.editor
  const { schema } = state
  const attrs = { ...props.node.attrs }

  if (props.node.type.name === 'sfc-node') {
    const inlineType = schema.nodes['sfc-inline']
    const paragraph = schema.nodes.paragraph
    if (!inlineType) return
    const inlineNode = inlineType.create(attrs)
    const replacement = paragraph ? paragraph.create(null, inlineNode) : inlineNode
    const tr = state.tr.replaceWith(getPos, getPos + props.node.nodeSize, replacement)
    view.dispatch(tr)
    props.editor.commands.focus()
  }
  else if (props.node.type.name === 'sfc-inline') {
    const blockType = schema.nodes['sfc-node']
    if (!blockType) return
    const blockNode = blockType.create(attrs)

    const pos = getPos
    const $pos = state.doc.resolve(pos)
    // 将块级节点插入到父段落之后
    const insertPos = $pos.after($pos.depth)
    let tr = state.tr.insert(insertPos, blockNode)
    // 删除原内联节点
    tr = tr.deleteRange(pos, pos + props.node.nodeSize)
    view.dispatch(tr)
    props.editor.commands.focus()
  }
}
</script>

<template>
  <NodeViewWrapper :as="isInline ? 'span' : 'div'" :style="wrapperStyle" @mousedown="onMouseDown">
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          class="tpd-border tpd-border-dashed tpd-border-violet-500 tpd-rounded"
          :class="[isInline ? 'tpd-inline-block' : 'tpd-w-full']"
        >
          <SfcLoader :text="props.node.attrs.text" />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem @select="edit">
          编辑组件
        </ContextMenuItem>
        <ContextMenuItem @select="toggleInlineBlock">
          {{ props.node.type.name === 'sfc-node' ? '切换到内联' : '切换到块级' }}
        </ContextMenuItem>
        <ContextMenuItem @select="toggleFloating">
          {{ props.node.attrs.isFloating ? '关闭自由拖拽' : '开启自由拖拽' }}
        </ContextMenuItem>
        <ContextMenuItem @select="ddelete">
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </NodeViewWrapper>
</template>
