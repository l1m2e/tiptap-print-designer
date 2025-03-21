import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './SFCNode.vue'

export default Node.create({
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
