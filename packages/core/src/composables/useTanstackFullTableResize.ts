import type { Table } from '@tanstack/vue-table'
import { useElementSize } from '@vueuse/core'

export function useTanstackFullTableResize(table: Table<any>, tableEl: Ref<HTMLTableElement | null>) {
  const { width: tableWidth } = useElementSize(tableEl)
  const activeResizeCol = ref<string | null>(null)

  function updateColumnSizes(colId: string, event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    activeResizeCol.value = colId

    const cols = table.getAllColumns()
    const currentCol = table.getColumn(colId)!
    const currentIndex = cols.findIndex(col => col.id === colId)
    const nextCol = cols[currentIndex + 1]

    if (!currentCol || !nextCol) return

    const startX = event.pageX
    const currentSize = currentCol.getSize()
    const nextSize = nextCol.getSize()

    const mousemoveHandler = (e: MouseEvent) => {
      e.preventDefault()
      const deltaX = ((e.pageX - startX) / tableWidth.value) * 100
      const absDeltaX = Math.abs(deltaX)

      if (deltaX > 0 && currentSize + absDeltaX > currentSize + nextSize) return
      if (deltaX < 0 && currentSize - absDeltaX <= (currentCol.columnDef.minSize || 0)) return

      table.setColumnSizing({
        ...table.getState().columnSizing,
        [colId]: deltaX > 0 ? currentSize + absDeltaX : currentSize - absDeltaX,
        [nextCol.id]: deltaX > 0 ? nextSize - absDeltaX : nextSize + absDeltaX,
      })
    }

    const mouseupHandler = () => {
      activeResizeCol.value = null
      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('mouseup', mouseupHandler)
    }

    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)

    onUnmounted(mouseupHandler)
  }

  return {
    updateColumnSizes,
    getIsResizing: (colId: string) => activeResizeCol.value === colId,
    getCanResize: (colId: string) => colId !== table.getAllColumns().at(-1)?.id,
  }
}
