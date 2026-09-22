import type { Node } from '@tiptap/pm/model'
import type { Transaction } from '@tiptap/pm/state'
import { TableMap } from '@tiptap/pm/tables'

export function getTableColumnWidths(table: HTMLTableElement, scale: number) {
  const measured = Array.from(table.querySelectorAll<HTMLTableColElement>(':scope > colgroup > col'), col => col.getBoundingClientRect().width / scale)
  const total = measured.reduce((sum, width) => sum + width, 0)
  const tableWidth = Math.round(table.getBoundingClientRect().width / scale)
  if (!total) return []

  // 累计取整保持总宽度，避免 HTML 往返后重复拖动产生误差累积。
  let used = 0
  let measuredTotal = 0
  return measured.map((width) => {
    measuredTotal += width
    const boundary = Math.round(measuredTotal / total * tableWidth)
    const result = boundary - used
    used = boundary
    return result
  })
}

export function setTableColumnWidths(tr: Transaction, node: Node, start: number, widths: number[]) {
  const map = TableMap.get(node)
  const seen = new Set<number>()
  map.map.forEach((pos, index) => {
    if (seen.has(pos)) return
    seen.add(pos)
    const cell = tr.doc.nodeAt(start + pos)!
    const col = index % map.width
    tr.setNodeMarkup(start + pos, null, { ...cell.attrs, colwidth: widths.slice(col, col + cell.attrs.colspan) })
  })
}
