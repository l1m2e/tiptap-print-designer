import StarterKit from '@tiptap/starter-kit'
import { DesignerDateTableNode, RenderDateTableNode } from './DateTableNode'
import { DesignerFieldNode, RenderFieldNode } from './FieldNode'
import FontSize from './FontSize'
import Placeholder from './Placeholder'
import { DesignerResizableImageNode, RenderResizableImageNode } from './ResizableImageNode'
import { DesignerSFCInlineNode, DesignerSFCNode, RenderSFCInlineNode, RenderSFCNode } from './SFCNode'
import SlashCommands from './SlashCommands'
import { Table, TableCell, TableHeader, TableRow } from './Table'
import TextAlign from './TextAlign'
import TextStyle from './TextStyle'
// import TrailingNode from './TrailingNode'

const baseExtensions = [
  StarterKit,
  TextAlign,
  FontSize,
  TextStyle,
  Table,
  TableCell,
  TableHeader,
  TableRow,
]

const designerExtensions = [
  ...baseExtensions,
  Placeholder,
  // TrailingNode,
  SlashCommands,
  DesignerFieldNode,
  DesignerDateTableNode,
  DesignerSFCNode,
  DesignerResizableImageNode,
  DesignerSFCInlineNode,
]

const renderExtensions = [
  ...baseExtensions,
  RenderFieldNode,
  RenderDateTableNode,
  RenderSFCNode,
  RenderResizableImageNode,
  RenderSFCInlineNode,
]

export function loadEditorExtensions(mode: 'designer' | 'viewer') {
  return mode === 'designer' ? designerExtensions : renderExtensions
}
