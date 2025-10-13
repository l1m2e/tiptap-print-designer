import { Placeholder as TiptapPlaceholder } from '@tiptap/extensions'

const Placeholder = TiptapPlaceholder.configure({
  placeholder: ({ node }) => {
    if (node.isTextblock) {
      let hasFieldNode = false
      node.descendants((n) => {
        if (n.type?.name === 'field-node') {
          hasFieldNode = true
          return false
        }
        return true
      })
      if (hasFieldNode) return ''
    }
    return '输入 或 鼠标右键唤起更多'
  },
})
export default Placeholder
