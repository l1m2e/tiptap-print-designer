<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed, inject, ref } from 'vue'
import { DESIGNER_KEY } from '~/designer'

const props = defineProps(nodeViewProps)
const { openEditSFCDialog } = inject(DESIGNER_KEY)!

// #region state
const isInline = computed(() => props.node.type.name === 'sfc-inline')

const isDragging = ref(false)
const dragStart = ref<{ sx: number, sy: number, x: number, y: number } | null>(null)

// #endregion
// #region computed
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

// #endregion
// #region handlers
function edit() {
  // ensure the node is selected in the editor before opening the dialog
  // so that the dialog's `update` can target the correct node even when it's floating
  const getPos = (props as any).getPos
  if (typeof getPos === 'function') {
    const pos = getPos()
    if (typeof pos === 'number') {
      // focus editor and set node selection at the node position
      props.editor.commands.focus()
      // setNodeSelection accepts the node position
      if (props.editor.commands.setNodeSelection) {
        props.editor.commands.setNodeSelection(pos)
      }
    }
  }

  openEditSFCDialog({
    text: props.node.attrs.text,
    mode: 'edit',
    onConfirm: (nextText) => {
      props.updateAttributes({ text: nextText })
      props.editor.commands.focus()
    },
  })
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
  const getPos = (props as any).getPos
  if (typeof getPos !== 'function') return

  const pos = getPos()
  if (typeof pos !== 'number') return

  const { state, view } = props.editor
  const { schema } = state
  const attrs = { ...props.node.attrs }

  const currentType = props.node.type.name
  const newTypeName = currentType === 'sfc-node' ? 'sfc-inline' : 'sfc-node'
  const newType = schema.nodes[newTypeName]
  if (!newType) return

  const tr = state.tr.setNodeMarkup(pos, newType, attrs)
  view.dispatch(tr)
  props.editor.commands.focus()
}
// #endregion
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
