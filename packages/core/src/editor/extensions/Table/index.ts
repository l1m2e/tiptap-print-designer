import type { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { TableView, Table as TiptapTable, TableCell as TiptapTableCell, TableHeader as TiptapTableHeader } from '@tiptap/extension-table'
import { closeHistory } from '@tiptap/pm/history'
import { Plugin } from '@tiptap/pm/state'
import { columnResizingPluginKey, TableMap } from '@tiptap/pm/tables'
import { getElementScale } from '~/utils'
import { getTableColumnWidths, setTableColumnWidths } from './columnWidths'

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

export const Table = TiptapTable.extend({
  addProseMirrorPlugins() {
    let stopResize = () => {}
    const cellMinWidth = this.options.cellMinWidth
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            mousedown(view, event) {
              const state = columnResizingPluginKey.getState(view.state)
              if (!view.editable || event.button !== 0 || !state || state.activeHandle < 0 || state.dragging) return false

              const $cell = view.state.doc.resolve(state.activeHandle)
              const node = $cell.node(-1)
              const start = $cell.start(-1)
              const map = TableMap.get(node)
              const column = map.colCount($cell.pos - start) + $cell.nodeAfter!.attrs.colspan - 1
              const table = (view.nodeDOM(state.activeHandle) as HTMLElement | null)?.closest('table')
              if (!table || column >= map.width - 1) return false

              stopResize()
              event.preventDefault()
              const startX = event.clientX
              const scale = getElementScale(view.dom)
              const win = view.dom.ownerDocument.defaultView!
              const cols = Array.from(table.querySelectorAll<HTMLTableColElement>(':scope > colgroup > col'))
              const tableWidth = Math.round(table.getBoundingClientRect().width / scale)
              const widths = getTableColumnWidths(table, scale)
              if (widths.length !== map.width) return false
              const minWidth = Math.min(cellMinWidth, Math.floor((widths[column] + widths[column + 1]) / 2))
              let resized = widths
              const originalStyle = table.style.cssText
              const originalColumns = cols.map(col => col.style.cssText)
              const display = (event: MouseEvent) => {
                const delta = Math.max(minWidth - widths[column], Math.min(widths[column + 1] - minWidth, Math.round((event.clientX - startX) / scale)))
                resized = widths.slice()
                resized[column] += delta
                resized[column + 1] -= delta
                table.style.width = `${tableWidth}px`
                table.style.minWidth = ''
                cols.forEach((col, index) => {
                  col.style.minWidth = ''
                  col.style.width = `${resized[index]}px`
                })
              }
              const finish = (event?: MouseEvent) => {
                stopResize()
                if (event) display(event)
                const tr = view.state.tr.setMeta(columnResizingPluginKey, { setDragging: null })
                if (view.state.doc.nodeAt(start - 1) === node && resized[column] !== widths[column]) {
                  setTableColumnWidths(tr, node, start, resized)
                }
                else {
                  table.style.cssText = originalStyle
                  cols.forEach((col, index) => {
                    col.style.cssText = originalColumns[index]
                  })
                }
                view.dispatch(tr)
              }
              const move = (event: MouseEvent) => event.buttons ? display(event) : finish(event)
              const blur = () => finish()
              stopResize = () => {
                win.removeEventListener('mousemove', move)
                win.removeEventListener('mouseup', finish)
                win.removeEventListener('blur', blur)
              }
              view.dispatch(closeHistory(view.state.tr).setMeta(columnResizingPluginKey, { setDragging: { startX, startWidth: widths[column] } }))
              win.addEventListener('mousemove', move)
              win.addEventListener('mouseup', finish)
              win.addEventListener('blur', blur)
              return true
            },
          },
        },
        view: () => ({ destroy: () => stopResize() }),
      }),
      ...this.parent?.() ?? [],
    ]
  },
}).configure({
  resizable: true,
  lastColumnResizable: false,
  View: class extends TableView {
    update(node: ProseMirrorNode) {
      if (node.type !== this.node.type) return false
      // 拖拽状态和手柄装饰变化不应重建列节点，否则鼠标移动会更新已脱离 DOM 的列。
      if (node === this.node) return true
      // 撤销或导入无列宽的表格时，清除上一次拖拽留下的内联宽度。
      this.colgroup.textContent = ''
      return super.update(node)
    }
  },
})
