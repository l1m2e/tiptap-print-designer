import type Component from './FieldNode.vue'
import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DesignerFieldNodeComponents from './DesignerFieldNode.vue'
import RenderFieldNodeComponents from './RenderFieldNode.vue'

function CreateNode(Component: Component) {
  return Node.create({
    name: 'field-node',
    group: 'inline',
    inline: true,
    atom: true,
    selectable: true,
    draggable: false,

    parseHTML() {
      return [{ tag: 'field-node' }]
    },
    renderHTML({ HTMLAttributes }) {
      return ['field-node', mergeAttributes(HTMLAttributes)]
    },
    addAttributes() {
      return {
        label: { default: '' },
        path: { default: '' },
        format: { default: '' },
      }
    },
    addNodeView() {
      return VueNodeViewRenderer(Component)
    },
  })
}

export const DesignerFieldNode = CreateNode(DesignerFieldNodeComponents)
export const RenderFieldNode = CreateNode(RenderFieldNodeComponents)
