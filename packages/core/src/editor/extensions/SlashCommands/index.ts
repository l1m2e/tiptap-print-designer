import type { Editor } from '@tiptap/core'
import type { SuggestionOptions } from '@tiptap/suggestion'
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { VueRenderer } from '@tiptap/vue-3'
import SlashCommands from './SlashCommands.vue'

interface CommandProps {
  editor: Editor
  range: { from: number, to: number }
  props: { command: (props: { editor: Editor, range: { from: number, to: number } }) => void }
}
interface RenderProps {
  editor: Editor
  clientRect: () => DOMRect
}

const slashCommands = Extension.create({
  name: 'slashCommands',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: CommandProps) => {
          props.command({ editor, range })
        },
      } as SuggestionOptions,
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

export default slashCommands.configure({
  suggestion: {
    render: () => {
      let component: VueRenderer | null = null
      let popupEl: HTMLElement | null = null
      let cleanup: (() => void) | null = null

      return {
        onStart: (props: RenderProps) => {
          component = new VueRenderer(SlashCommands, {
            props,
            editor: props.editor,
          })

          popupEl = document.createElement('div')
          popupEl.appendChild(component.element!)
          document.body.appendChild(popupEl)

          if (props.clientRect) {
            cleanup = autoUpdate(popupEl, popupEl, () => {
              const rect = props.clientRect?.()
              if (!rect) return
              computePosition(
                {
                  getBoundingClientRect: props.clientRect!,
                },
                popupEl!,
                {
                  placement: 'bottom-start',
                  middleware: [offset(4), flip(), shift()],
                },
              ).then(({ x, y }) => {
                Object.assign(popupEl!.style, {
                  left: `${x}px`,
                  top: `${y}px`,
                  position: 'absolute',
                  zIndex: 9999,
                })
              })
            })
          }
        },

        onUpdate(props: RenderProps) {
          component?.updateProps(props)
        },

        onKeyDown(props: { event: KeyboardEvent }) {
          if (props.event.key === 'Escape') {
            cleanup?.()
            popupEl?.remove()
            component?.destroy()
            return true
          }
          return component?.ref?.onKeyDown?.(props) ?? false
        },

        onExit() {
          cleanup?.()
          popupEl?.remove()
          component?.destroy()
        },
      }
    },
  },
})
