import type { Attributes } from '@tiptap/core'
import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          class: {},
          fontSize: {
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        } as Attributes,
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }) => chain()
        .setMark('textStyle', { fontSize })
        .updateAttributes('paragraph', { fontSize })
        .updateAttributes('field-node', { fontSize })
        .run(),
      unsetFontSize: () => ({ chain }) => chain()
        .setMark('textStyle', { fontSize: null })
        .updateAttributes('paragraph', { fontSize: null })
        .updateAttributes('field-node', { fontSize: null })
        .removeEmptyTextStyle()
        .run(),
    }
  },

  addKeyboardShortcuts() {
    return {
      'Enter': ({ editor }) => {
        const { selection } = editor.state
        const { $from } = selection
        const currentNode = $from.node()
        
        if (currentNode.type.name === 'paragraph') {
          const currentFontSize = currentNode.attrs.fontSize || 
            editor.getAttributes('textStyle').fontSize
          
          if (currentFontSize) {
            // 延迟执行，确保新段落已创建
            setTimeout(() => {
              editor.chain()
                .updateAttributes('paragraph', { fontSize: currentFontSize })
                .setMark('textStyle', { fontSize: currentFontSize })
                .run()
            }, 10)
          }
        }
        
        return false // 让默认的回车行为继续执行
      },
    }
  },
})

export default FontSize
