import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './DateTableNode.vue'

export default Node.create({
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
      columns: { default: [] },
      path: { default: '' },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})
