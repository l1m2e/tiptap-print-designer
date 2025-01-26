import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Field.vue'

export default Node.create({
  name: 'field',
  group: 'inline',
  inline: true,
  content: 'text*',

  parseHTML() {
    return [{ tag: 'field' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['field', mergeAttributes(HTMLAttributes), 0]
  },
  addAttributes() {
    return {
      label: { default: '' },
      path: { default: '' },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})
