import Paragraph from '@tiptap/extension-paragraph'

export const ParagraphWithLineHeight = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(), // 保留原有属性
      lineHeight: {
        default: null,
        parseHTML: element => element.style.lineHeight || null,
        renderHTML: (attributes) => {
          if (!attributes.lineHeight) return {}
          return { style: `line-height: ${attributes.lineHeight}` }
        },
      },
    }
  },
})

export default ParagraphWithLineHeight
