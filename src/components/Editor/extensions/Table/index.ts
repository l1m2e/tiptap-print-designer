import TiptapTable from '@tiptap/extension-table'
import TiptapTableCell from '@tiptap/extension-table-cell'
import TiptapTableHeade from '@tiptap/extension-table-header'

export { default as TableRow } from '@tiptap/extension-table-row'

export const TableHeader = TiptapTableHeade.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: null,
    }
  },
})

export const TableCell = TiptapTableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: null,
    }
  },
})

export const Table = TiptapTable.configure({
  resizable: true,
  lastColumnResizable: false,
})
