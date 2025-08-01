import type { Component } from 'vue'
import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
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

    addNodeView() {
      return VueNodeViewRenderer(Component)
    },
  })
}

export const DesignerResizableImageNode = CreateNode(DesignerResizableImageNodeComponent)
export const RenderResizableImageNode = CreateNode(RenderResizableImageNodeComponent)
