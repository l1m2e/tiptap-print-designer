import type { Editor } from '@tiptap/core'
import type { Instance, Props } from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import SlashCommands from './SlashCommands.vue'

interface RenderProps {
  editor: Editor
  clientRect: () => DOMRect
}

export default {
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
        popup[0]?.destroy()
        component.destroy()
      },
    }
  },
}
