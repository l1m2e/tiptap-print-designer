import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './SFCLoad.vue'

export default Node.create({
  name: 'sfcLoad',
  content: 'block+',
  group: 'block',

  parseHTML() {
    return [{ tag: 'sfcLoad' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['sfcLoad', mergeAttributes(HTMLAttributes), 0]
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
