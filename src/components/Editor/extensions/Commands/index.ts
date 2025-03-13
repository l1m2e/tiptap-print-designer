import type { Editor } from '@tiptap/core'
import type { SuggestionOptions } from '@tiptap/suggestion'
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

interface CommandProps {
  editor: Editor
  range: { from: number, to: number }
  props: { command: (props: { editor: Editor, range: { from: number, to: number } }) => void }
}

export default Extension.create({
  name: 'CommandsSlash',

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
