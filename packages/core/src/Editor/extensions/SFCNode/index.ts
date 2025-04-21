import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DesignerSFCNodeComponents from './DesignerSFCNode.vue'
import RenderSFCNodeComponents from './RenderSFCNode.vue'

function CreateNode(Component: Component) {
  return Node.create({
    name: 'sfc-node',
    content: 'block*',
    group: 'block',
    atom: true,

    parseHTML() {
      return [{ tag: 'sfc-node' }]
    },
    renderHTML({ HTMLAttributes }) {
      return ['sfc-node', mergeAttributes(HTMLAttributes), 0]
    },
    addAttributes() {
      return {
        text: { default: '' },
      }
    },
    addNodeView() {
      return VueNodeViewRenderer(Component)
    },
  })
}

export const DesignerSFCNode = CreateNode(DesignerSFCNodeComponents)
export const RenderSFCNode = CreateNode(RenderSFCNodeComponents)
