import type { Editor } from '@tiptap/core'
import type { Instance, Props } from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import SlashCommands from './SlashCommands.vue'
import type { SuggestionOptions } from '@tiptap/suggestion'
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

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
    render: (): {
      onStart: (props: RenderProps) => void
      onExit: () => void
    } => {
      let component: VueRenderer
      let popup: Instance<Props>[]

      return {
        onStart: (props: RenderProps) => {
          component = new VueRenderer(SlashCommands, {
            props,
            editor: props.editor,
          })

          if (!props.clientRect) {
            return
          }
          // @ts-expect-error 类型定义错误暂时忽略
          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          })
        },

        onExit() {
          popup?.[0]?.destroy()
          component?.destroy()
        },
      }
    },
  }
})
