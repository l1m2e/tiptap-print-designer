import type { Transaction } from '@tiptap/pm/state'
import type { Component } from 'vue'
import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { toast } from '~/components/ui/toast/use-toast'
import DesignerResizableImageNodeComponent from './DesignerResizableImageNode.vue'
import RenderResizableImageNodeComponent from './RenderResizableImageNode.vue'

function CreateNode(Component: Component) {
  return Node.create({
    name: 'resizable-image',
    group: 'block',
    // 支持内嵌模式
    inline: false,
    // 可以设置为段落级别或内嵌级别
    content: '',
    atom: true,

    addAttributes() {
      return {
        src: {
          default: null,
          parseHTML: element => element.getAttribute('src'),
          renderHTML: (attributes) => {
            if (!attributes.src) {
              return {}
            }
            return { src: attributes.src }
          },
        },
        alt: {
          default: null,
          parseHTML: element => element.getAttribute('alt'),
          renderHTML: (attributes) => {
            if (!attributes.alt) {
              return {}
            }
            return { alt: attributes.alt }
          },
        },
        title: {
          default: null,
          parseHTML: element => element.getAttribute('title'),
          renderHTML: (attributes) => {
            if (!attributes.title) {
              return {}
            }
            return { title: attributes.title }
          },
        },
        width: {
          default: 'auto',
          parseHTML: element => element.style.width || element.getAttribute('width'),
          renderHTML: (attributes) => {
            if (!attributes.width || attributes.width === 'auto') {
              return {}
            }
            return { style: `width: ${attributes.width}` }
          },
        },
        height: {
          default: 'auto',
          parseHTML: element => element.style.height || element.getAttribute('height'),
          renderHTML: (attributes) => {
            if (!attributes.height || attributes.height === 'auto') {
              return {}
            }
            return { style: `height: ${attributes.height}` }
          },
        },
        display: {
          default: 'block', // 'block' | 'inline'
          parseHTML: element => element.getAttribute('data-display'),
          renderHTML: (attributes) => {
            return { 'data-display': attributes.display }
          },
        },
        isFloating: {
          default: false,
          parseHTML: element => element.getAttribute('data-floating') === 'true',
          renderHTML: attributes => ({ 'data-floating': attributes.isFloating }),
        },
        x: {
          default: 0,
          parseHTML: element => Number.parseFloat(element.getAttribute('data-x') || '') || 0,
          renderHTML: attributes => ({ 'data-x': attributes.x }),
        },
        y: {
          default: 0,
          parseHTML: element => Number.parseFloat(element.getAttribute('data-y') || '') || 0,
          renderHTML: attributes => ({ 'data-y': attributes.y }),
        },
      }
    },

    parseHTML() {
      return [
        {
          tag: 'resizable-image',
        },
        {
          tag: 'img[src]',
          getAttrs: (element) => {
            const img = element as HTMLImageElement
            return {
              src: img.getAttribute('src'),
              alt: img.getAttribute('alt'),
              title: img.getAttribute('title'),
              width: img.style.width || img.getAttribute('width') || 'auto',
              height: img.style.height || img.getAttribute('height') || 'auto',
              display: img.getAttribute('data-display') || 'block',
            }
          },
        },
      ]
    },

    renderHTML({ HTMLAttributes }) {
      return ['resizable-image', mergeAttributes(HTMLAttributes)]
    },

    addCommands() {
      return {}
    },

    addProseMirrorPlugins() {
      if (Component !== DesignerResizableImageNodeComponent) return []
      const editor = this.editor
      return [new Plugin({
        props: {
          transformPastedHTML(html) {
            const template = document.createElement('template')
            template.innerHTML = html
            // 外部粘贴的原生图片是新节点；复制旧 resizable-image 节点仍保留原来的版本。
            template.content.querySelectorAll('img[src]').forEach((image) => {
              if (!image.closest('resizable-image')) {
                image.setAttribute('data-floating-version', '2')
              }
            })
            return template.innerHTML
          },
          handlePaste(view, event) {
            const clipboard = event.clipboardData
            if (!view.editable || !clipboard || /<(?:img|resizable-image)\b/i.test(clipboard.getData('text/html'))) return false
            const files = Array.from(clipboard.files).filter(file => file.type.startsWith('image/'))
            if (!files.length) return false
            event.preventDefault()
            let bookmark = view.state.selection.getBookmark()
            const mapSelection = ({ transaction }: { transaction: Transaction }) => {
              bookmark = bookmark.map(transaction.mapping)
            }
            editor.on('transaction', mapSelection)
            Promise.all(files.map(file => new Promise<string>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.onerror = () => reject(reader.error)
              reader.readAsDataURL(file)
            }))).then((sources) => {
              if (editor.isDestroyed) return
              const selection = bookmark.resolve(editor.state.doc)
              editor.commands.insertContentAt({ from: selection.from, to: selection.to }, sources.map(src => ({
                type: 'resizable-image',
                attrs: { src, floatingVersion: 2 },
              })))
            }).catch(() => {
              if (!editor.isDestroyed) toast({ title: '粘贴图片失败', description: '图片读取失败，请重新粘贴或上传。' })
            }).finally(() => editor.off('transaction', mapSelection))
            return true
          },
        },
      })]
    },

    addNodeView() {
      return VueNodeViewRenderer(Component)
    },
  })
}

export const DesignerResizableImageNode = CreateNode(DesignerResizableImageNodeComponent)
export const RenderResizableImageNode = CreateNode(RenderResizableImageNodeComponent)
