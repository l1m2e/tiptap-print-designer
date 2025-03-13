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

export default [
  StarterKit,
  TextAlign,
  Field,
  Image,
  FontSize,
  TextStyle.configure({ mergeNestedSpanStyles: true }),
  Commands.configure({ suggestion }),
  Placeholder.configure({ placeholder: '输入 / 可打开操作面板 ...' }),

  TableRow,
  TableHeader,
  TableCell,
  Table.configure({
    resizable: true,
  }),
]
