import { Table as TiptapTable, TableCell as TiptapTableCell, TableHeader as TiptapTableHeader } from '@tiptap/extension-table'

export { TableRow } from '@tiptap/extension-table'

export const TableHeader = TiptapTableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: null,
      // allow inline style string so we can control padding and border sides per header cell
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: (attributes) => {
          if (!attributes.style)
            return {}
          return { style: attributes.style }
        },
      },
    }
  },
})

export const TableCell = TiptapTableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: null,
      // allow inline style string so we can control padding and border sides per cell
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: (attributes) => {
          if (!attributes.style)
            return {}
          return { style: attributes.style }
        },
      },
    }
  },
})

export const Table = TiptapTable.configure({
  resizable: true,
  lastColumnResizable: false,
})
