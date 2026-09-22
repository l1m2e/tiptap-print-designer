import type { Table } from '@tanstack/vue-table'
import type { Ref } from 'vue'

export function useTanstackFullTableResize(table: Table<any>, tableEl: Ref<HTMLTableElement | null>) {
  const activeResizeCol = ref<string | null>(null)
  let stopResize = () => {}
  onUnmounted(() => stopResize())

  function updateColumnSizes(colId: string, event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    const cols = table.getAllColumns()
    const currentCol = table.getColumn(colId)!
    const currentIndex = cols.findIndex(col => col.id === colId)
    const nextCol = cols[currentIndex + 1]

    const tableWidth = tableEl.value?.getBoundingClientRect().width
    if (!currentCol || !nextCol || !tableWidth) return

    stopResize()
    activeResizeCol.value = colId
    const startX = event.clientX
    const currentSize = currentCol.getSize()
    const nextSize = nextCol.getSize()

    const mousemoveHandler = (e: MouseEvent) => {
      e.preventDefault()
      const deltaX = Math.max((currentCol.columnDef.minSize ?? 0) - currentSize, Math.min(nextSize - (nextCol.columnDef.minSize ?? 0), ((e.clientX - startX) / tableWidth) * 100))

      table.setColumnSizing({
        ...table.getState().columnSizing,
        [colId]: currentSize + deltaX,
        [nextCol.id]: nextSize - deltaX,
      })
    }

    const mouseupHandler = () => {
      activeResizeCol.value = null
      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('mouseup', mouseupHandler)
    }

    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)

    stopResize = mouseupHandler
  }

  return {
    updateColumnSizes,
    getIsResizing: (colId: string) => activeResizeCol.value === colId,
    getCanResize: (colId: string) => colId !== table.getAllColumns().at(-1)?.id,
  }
}
