import { LineHeight } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { DesignerDateTableNode, RenderDateTableNode } from './DateTableNode'
import { DesignerFieldNode, RenderFieldNode } from './FieldNode'
import FontSize from './FontSize'
import Paragraph from './Paragraph'
import Placeholder from './Placeholder'
import { DesignerResizableImageNode, RenderResizableImageNode } from './ResizableImageNode'
import { DesignerSFCInlineNode, DesignerSFCNode, RenderSFCInlineNode, RenderSFCNode } from './SFCNode'
import { Table, TableCell, TableHeader, TableRow } from './Table'
import TextAlign from './TextAlign'
import TextStyle from './TextStyle'

const baseExtensions = [
  StarterKit.configure({
    trailingNode: false, // 彻底禁用自动 trailing node
    paragraph: false,
  }),
  Paragraph,
  LineHeight,
  TextAlign,
  FontSize,
  TextStyle,
  Underline,
  Table,
  TableCell,
  TableHeader,
  TableRow,
]

const designerExtensions = [
  Placeholder,
  ...baseExtensions,
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
