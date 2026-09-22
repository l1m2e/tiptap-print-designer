import { Extension } from '@tiptap/core'

export default Extension.create({
  name: 'floating',
  addGlobalAttributes() {
    return [{
      types: ['field-node', 'sfc-node', 'sfc-inline', 'resizable-image'],
      attributes: {
        floatingVersion: {
          // 缺少标记的 HTML/JSON 属于旧模板；仅在新建节点时显式写入 2。
          default: null,
          parseHTML: element => element.getAttribute('data-floating-version') === '2' ? 2 : null,
          renderHTML: attributes => attributes.floatingVersion === 2 ? { 'data-floating-version': '2' } : {},
        },
      },
    }]
  },
})
