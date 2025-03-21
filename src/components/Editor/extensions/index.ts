import BubbleMenu from '@tiptap/extension-bubble-menu'
import StarterKit from '@tiptap/starter-kit'
import Field from './Field'
import FontSize from './FontSize'
import Image from './Image'
import Placeholder from './Placeholder'
import SFCLoad from './SFCLoad'
import SlashCommands from './SlashCommands'
import { Table, TableCell, TableHeader, TableRow } from './Table'
import TextAlign from './TextAlign'
import TextStyle from './TextStyle'
import TrailingNode from './TrailingNode'

export const extensions = [
  StarterKit,
  TextAlign,
  Field,
  Image,
  FontSize,
  TextStyle,
  SlashCommands,
  Placeholder,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  BubbleMenu,
  TrailingNode,
  SFCLoad,
]

export function loadEditorExtensions(mode: 'designer' | 'viewer') {
  return mode === 'designer'
    ? extensions
    : extensions.filter(extension => !['placeholder', 'trailingNode', 'bubbleMenu'].includes(extension.name))
}
