import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Commands from './Commands'
import Field from './Field'
import FontSize from './FontSize/FontSize'
import Image from './Image'
import suggestion from './SlashCommands'
import TextAlign from './TextAlign'
import TrailingNode from './TrailingNode'

export const extensions = [
  StarterKit,
  TextAlign,
  Field,
  Image,
  FontSize,
  TextStyle.configure({ mergeNestedSpanStyles: true }),
  Commands.configure({ suggestion }),
  Placeholder.configure({ placeholder: '输入 / 唤起更多' }),

  TableRow,
  TableHeader,
  TableCell.extend({
    addAttributes() {
      return {
        class: {
          default: null,
        },
        colspan: {
          default: 1,
        },
        rowspan: {
          default: 1,
        },
        colwidth: {
          default: null,
          parseHTML: (element) => {
            const colwidth = element.getAttribute('colwidth')
            const value = colwidth
              ? colwidth.split(',').map(width => Number.parseInt(width, 10))
              : null

            return value
          },
        },
      }
    },
  }),
  Table.configure({ resizable: true, lastColumnResizable: false }),
  TrailingNode,
]

export function loadEditorExtensions(mode: 'designer' | 'viewer') {
  return mode === 'designer'
    ? extensions
    : extensions.filter(extension => !['placeholder', 'trailingNode'].includes(extension.name))
}
