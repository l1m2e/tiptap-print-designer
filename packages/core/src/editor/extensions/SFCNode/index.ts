import type { Component } from 'vue'
import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DesignerSFCNodeComponents from './DesignerSFCNode.vue'
import RenderSFCNodeComponents from './RenderSFCNode.vue'

function CreateNode(Comp: Component, options: { name: 'sfc-node' | 'sfc-inline', inline: boolean, group: 'block' | 'inline' }) {
  return Node.create({
    name: options.name,
    group: options.group,
    inline: options.inline,
    atom: true,
    selectable: true,
    draggable: true,

    parseHTML() {
      return [{ tag: options.name }]
    },
    renderHTML({ HTMLAttributes }) {
      // 原为 [tag, attrs, 0]（内容孔），但当前为 atom 节点，不包含内容
      return [options.name, mergeAttributes(HTMLAttributes)]
    },
    addAttributes() {
      return {
        text: { default: '' },
        // 是否启用相对定位（绝对定位到 .ProseMirror 容器内）
        isFloating: { default: false },
        x: { default: 0 },
        y: { default: 0 },
        zIndex: { default: 1 },
      }
    },
    addNodeView() {
      return VueNodeViewRenderer(Comp)
    },
  })
}

// 设计器模式：块级与内联
export const DesignerSFCNode = CreateNode(DesignerSFCNodeComponents, { name: 'sfc-node', inline: false, group: 'block' })
export const DesignerSFCInlineNode = CreateNode(DesignerSFCNodeComponents, { name: 'sfc-inline', inline: true, group: 'inline' })

// 渲染模式：块级与内联
export const RenderSFCNode = CreateNode(RenderSFCNodeComponents, { name: 'sfc-node', inline: false, group: 'block' })
export const RenderSFCInlineNode = CreateNode(RenderSFCNodeComponents, { name: 'sfc-inline', inline: true, group: 'inline' })
