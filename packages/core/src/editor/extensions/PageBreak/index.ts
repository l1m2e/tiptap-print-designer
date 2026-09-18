import { mergeAttributes, Node } from '@tiptap/core'

/**
 * 分页符：打印时在当前位置强制分页。
 * 屏幕上显示为虚线标记（样式见 editor/style/base.css），打印时仅保留 break-after 分页作用。
 */
export const PageBreak = Node.create({
  name: 'page-break',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  parseHTML() {
    return [{ tag: 'div[data-page-break]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-page-break': 'true',
      'style': 'break-after: page; page-break-after: always',
    })]
  },
})

export default PageBreak
