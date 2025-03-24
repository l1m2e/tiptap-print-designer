import BubbleMenu from '@tiptap/extension-bubble-menu'
import StarterKit from '@tiptap/starter-kit'
import DateTableNode from './DateTableNode'
import FieldNode from './FieldNode'
import FontSize from './FontSize'
import Placeholder from './Placeholder'
import SFCNode from './SFCNode'
import SlashCommands from './SlashCommands'
import { Table, TableCell, TableHeader, TableRow } from './Table'
import TextAlign from './TextAlign'
import TextStyle from './TextStyle'
import TrailingNode from './TrailingNode'

export const extensions = [
  StarterKit,
  TextAlign,
  FieldNode,
  FontSize,
  TextStyle,
  SlashCommands,
  Placeholder,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  DateTableNode,
  TrailingNode,
  SFCNode,
  BubbleMenu,
]

export function loadEditorExtensions(mode: 'designer' | 'viewer') {
  return mode === 'designer'
    ? extensions
    : extensions.filter(extension => !['placeholder', 'trailingNode', 'bubbleMenu'].includes(extension.name))
}
