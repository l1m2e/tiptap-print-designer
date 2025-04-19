import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './FieldNode.vue'

export default Node.create({
  name: 'field-node',
  group: 'inline',
  inline: true,
  content: 'text*',

  parseHTML() {
    return [{ tag: 'field-node' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['field-node', mergeAttributes(HTMLAttributes), 0]
  },
  addAttributes() {
    return {
      label: { default: '' },
      path: { default: '' },
      format: { default: '' },
      fontSize: { default: '12pt' },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})
