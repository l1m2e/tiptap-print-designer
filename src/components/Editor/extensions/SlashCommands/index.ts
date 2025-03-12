import type { Editor } from '@tiptap/core'
import type { Instance, Props } from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import SlashCommands from './SlashCommands.vue'

interface RenderProps {
  editor: Editor
  clientRect: () => DOMRect
}

interface CommandProps {
  event: KeyboardEvent
  editor: Editor
}

export default {
  render: (): {
    onStart: (props: RenderProps) => void
    onKeyDown: (props: CommandProps) => boolean
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

      onKeyDown(props: CommandProps) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props) ?? false
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
