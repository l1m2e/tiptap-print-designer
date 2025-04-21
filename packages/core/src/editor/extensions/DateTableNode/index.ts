import type { Component } from 'vue'
import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DesignerDateTableNodeComponents from './DesignerDateTableNode.vue'
import RenderDateTableNodeComponents from './RenderDateTableNode.vue'

function CreateNode(Component: Component) {
  return Node.create({
    name: 'data-table-node',
    content: 'block*',
    group: 'block',
    atom: true,

    parseHTML() {
      return [{ tag: 'data-table-node' }]
    },
    renderHTML({ HTMLAttributes }) {
      return ['data-table-node', mergeAttributes(HTMLAttributes), 0]
    },
    addAttributes() {
      return {
        columnSizingState: { default: '{}' },
        columns: { default: '[]' },
        path: { default: '' },
      }
    },
    addNodeView() {
      return VueNodeViewRenderer(Component)
    },
  })
}

export const DesignerDateTableNode = CreateNode(DesignerDateTableNodeComponents)
export const RenderDateTableNode = CreateNode(RenderDateTableNodeComponents)
