import { Table as TiptapTable, TableCell as TiptapTableCell, TableHeader as TiptapTableHeader } from '@tiptap/extension-table'

export { TableRow } from '@tiptap/extension-table'

export const TableHeader = TiptapTableHeader.extend({
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
