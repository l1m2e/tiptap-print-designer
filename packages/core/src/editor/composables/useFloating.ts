import type { NodeViewProps } from '@tiptap/vue-3'
import type { CSSProperties } from 'vue'
import { closeHistory } from '@tiptap/pm/history'
import { columnResizingPluginKey } from '@tiptap/pm/tables'
import { computed, getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, readonly, ref, toRaw, watch } from 'vue'
import { toast } from '~/components/ui/toast/use-toast'
import { getElementScale } from '~/utils'
import { EDITOR_CONTEXT } from '../constants'
import { getTableColumnWidths, setTableColumnWidths } from '../extensions/Table/columnWidths'

const PX_TO_PT = 0.75

/** 屏幕坐标下的内容边界及绝对定位原点；边框、内边距不属于可拖动区域。 */
export function getFloatingBounds(element: HTMLElement) {
  const container = element.parentElement?.closest<HTMLElement>('td, th, .ProseMirror')
  if (!container) return

  const rect = container.getBoundingClientRect()
  const scale = getElementScale(element.closest<HTMLElement>('.ProseMirror') || container)
  const style = getComputedStyle(container)
  const originLeft = rect.left + container.clientLeft * scale
  const originTop = rect.top + container.clientTop * scale
  const paper = container.matches('.ProseMirror') ? container.closest<HTMLElement>('.paper-container') : null
  return {
    container,
    scale,
    originLeft,
    originTop,
    left: originLeft + Number.parseFloat(style.paddingLeft) * scale,
    top: originTop + Number.parseFloat(style.paddingTop) * scale,
    right: originLeft + (container.clientWidth - Number.parseFloat(style.paddingRight)) * scale,
    bottom: paper
      ? paper.getBoundingClientRect().bottom - Number.parseFloat(getComputedStyle(paper).paddingBottom) * scale
      : originTop + (container.clientHeight - Number.parseFloat(style.paddingBottom)) * scale,
  }
}

/** 共用浮动定位。display 依次为非浮动时的内联、块级显示方式。 */
export function useFloating(props: NodeViewProps, display: [string, string] = ['inline-block', 'block']) {
  const { mode } = inject(EDITOR_CONTEXT)!
  const instance = getCurrentInstance()
  // ponytail: 无标记节点保留旧行为；停止兼容旧模板后将此判断改为 true，并删除标记读写。
  const constrained = computed(() => props.node.attrs.floatingVersion === 2)
  const isImage = computed(() => props.node.type.name === 'resizable-image')
  const isInline = computed(() => ['sfc-inline', 'field-node'].includes(props.node.type.name))
  const isDragging = ref(false)
  const adjustment = ref<Record<string, unknown> | null>(null)
  const availableWidth = ref<number>()
  let availableHeight = 0
  let imageSize: { width: number, height: number } | undefined
  const layout = computed(() => ({ ...props.node.attrs, ...adjustment.value }))
  let element: HTMLElement | undefined
  let container: HTMLElement | undefined
  let paper: HTMLElement | null = null
  let observer: ResizeObserver | undefined
  let frame = 0
  let disposed = false
  let stopDragging: (() => void) | undefined

  function getElement() {
    const root = instance?.proxy?.$el
    return root instanceof HTMLElement ? root : undefined
  }

  function getBounds(target = getElement()) {
    return constrained.value && target ? getFloatingBounds(target) : undefined
  }

  const wrapperStyle = computed<CSSProperties>(() => {
    if (!layout.value.isFloating) return { display: isInline.value ? display[0] : display[1] }
    return {
      position: 'absolute',
      left: `${layout.value.x || 0}pt`,
      top: `${layout.value.y || 0}pt`,
      zIndex: layout.value.zIndex || 1,
      cursor: isDragging.value ? 'grabbing' : 'grab',
      ...(constrained.value
        ? {
            width: isImage.value ? layout.value.width : 'max-content',
            maxWidth: availableWidth.value === undefined ? '100%' : `${availableWidth.value}px`,
            margin: 0,
          }
        : {}),
    }
  })

  function scheduleLayout() {
    if (disposed || frame || !constrained.value || !props.node.attrs.isFloating) return
    frame = requestAnimationFrame(() => {
      frame = 0
      updateLayout()
    })
  }

  function updateLayout() {
    if (!element?.isConnected || !constrained.value || !props.node.attrs.isFloating || adjustment.value?.isFloating === false) return
    const pos = props.getPos()
    if (typeof pos !== 'number') return
    const node = props.editor.state.doc.nodeAt(pos)
    // NodeView 的 Vue props 可能尚未追上最新事务，不能用旧属性覆盖刚更新的内容。
    if (!node?.eq(toRaw(props.node))) {
      scheduleLayout()
      return
    }
    const bounds = getBounds(element)
    if (!bounds || !bounds.container.getBoundingClientRect().width) return
    if (container !== bounds.container) {
      if (container) observer?.unobserve(container)
      if (paper) observer?.unobserve(paper)
      container = bounds.container
      paper = container.matches('.ProseMirror') ? container.closest<HTMLElement>('.paper-container') : null
      observer?.observe(container)
      if (paper) observer?.observe(paper)
    }
    const width = Math.max(0, (bounds.right - bounds.left) / bounds.scale)
    const height = Math.max(0, (bounds.bottom - bounds.top) / bounds.scale)
    if (width > 0 && (availableWidth.value !== width || availableHeight !== height)) {
      availableWidth.value = width
      availableHeight = height
      if (!isImage.value) {
        adjustment.value = null
        scheduleLayout()
        return
      }
    }

    const image = isImage.value ? element.querySelector('img') : null
    if (isImage.value && (!image?.complete || !image.naturalWidth)) return
    const rect = (image || element).getBoundingClientRect()
    if (!rect.width || !rect.height) return
    if (image && !imageSize) {
      const style = getComputedStyle(image)
      imageSize = { width: Number.parseFloat(style.width), height: Number.parseFloat(style.height) }
    }
    const requestedWidth = imageSize ? imageSize.width * bounds.scale : rect.width
    const requestedHeight = imageSize ? imageSize.height * bounds.scale : rect.height
    const ratio = isImage.value ? Math.max(0, Math.min(1, (bounds.right - bounds.left) / requestedWidth, (bounds.bottom - bounds.top) / requestedHeight)) : 1
    const nodeWidth = requestedWidth * ratio
    const nodeHeight = requestedHeight * ratio
    const patch: Record<string, unknown> = {}
    if (!width || bounds.bottom <= bounds.top || ratio === 0 || (!isImage.value && (Math.max(rect.width, element.scrollWidth * bounds.scale) > bounds.right - bounds.left + bounds.scale
      || Math.max(rect.height, element.scrollHeight * bounds.scale) > bounds.bottom - bounds.top + bounds.scale))) {
      patch.isFloating = false
    }
    else {
      const x = Number(props.node.attrs.x) || 0
      const y = Number(props.node.attrs.y) || 0
      const left = Math.max(bounds.left, Math.min(bounds.right - nodeWidth, bounds.originLeft + x / PX_TO_PT * bounds.scale))
      const top = Math.max(bounds.top, Math.min(bounds.bottom - nodeHeight, bounds.originTop + y / PX_TO_PT * bounds.scale))
      const nextX = (left - bounds.originLeft) / bounds.scale * PX_TO_PT
      const nextY = (top - bounds.originTop) / bounds.scale * PX_TO_PT
      if (!Number.isFinite(Number(props.node.attrs.x)) || Math.abs(nextX - x) > 0.01) patch.x = nextX
      if (!Number.isFinite(Number(props.node.attrs.y)) || Math.abs(nextY - y) > 0.01) patch.y = nextY
      if (ratio < 0.999) {
        patch.width = `${nodeWidth / bounds.scale}px`
        patch.height = `${nodeHeight / bounds.scale}px`
      }
    }
    // 列宽拖动尚在预览阶段，不能让组件恢复文档流而改变表格的布局。
    if (patch.isFloating === false && columnResizingPluginKey.getState(props.editor.state)?.dragging) return
    // 自动适配仅影响显示。写入图片尺寸会重建表格列节点、打断拖拽，并使撤销丢失原尺寸。
    adjustment.value = Object.keys(patch).length ? patch : null
    if (mode === 'designer' && patch.isFloating === false) {
      props.editor.view.dispatch(props.editor.state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, isFloating: false }).setMeta('addToHistory', false))
      toast({ title: '内容超出容器', description: '已恢复普通布局，请调整内容或容器尺寸后再开启自由拖拽。' })
    }
  }

  watch(() => props.node.attrs, (attrs, previous) => {
    if (attrs.floatingVersion !== previous.floatingVersion || attrs.isFloating !== previous.isFloating) {
      adjustment.value = null
      imageSize = undefined
    }
    const sizeChanged = ['width', 'height', 'src'].some(key => attrs[key] !== previous[key])
    if (sizeChanged) imageSize = undefined
    if (adjustment.value) {
      adjustment.value = Object.fromEntries(Object.entries(adjustment.value).filter(([key]) =>
        key !== 'isFloating' && attrs[key] === previous[key] && !(sizeChanged && ['width', 'height'].includes(key)),
      ))
    }
    scheduleLayout()
  })
  onMounted(async () => {
    await nextTick()
    if (disposed) return
    element = getElement()
    if (!element) return
    observer = new ResizeObserver(scheduleLayout)
    observer.observe(element)
    element.addEventListener('load', scheduleLayout, true)
    props.editor.on('transaction', scheduleLayout)
    scheduleLayout()
  })
  onBeforeUnmount(() => {
    disposed = true
    stopDragging?.()
    cancelAnimationFrame(frame)
    observer?.disconnect()
    element?.removeEventListener('load', scheduleLayout, true)
    props.editor.off('transaction', scheduleLayout)
  })

  function toggleFloating() {
    if (props.node.attrs.isFloating || !constrained.value) {
      props.updateAttributes({
        isFloating: !props.node.attrs.isFloating,
        ...(constrained.value && isImage.value ? { width: layout.value.width, height: layout.value.height } : {}),
      })
      return
    }
    const target = getElement()
    const bounds = getBounds(target)
    const pos = props.getPos()
    if (!target || !bounds || typeof pos !== 'number') return
    const image = isImage.value ? target.querySelector('img') : null
    if (isImage.value && (!image?.complete || !image.naturalWidth)) return
    const rect = (image || target).getBoundingClientRect()
    const attrs = {
      ...props.node.attrs,
      isFloating: true,
      x: (rect.left - bounds.originLeft) / bounds.scale * PX_TO_PT,
      y: (rect.top - bounds.originTop) / bounds.scale * PX_TO_PT,
      ...(image ? { width: `${rect.width / bounds.scale}px`, height: `${rect.height / bounds.scale}px` } : {}),
    }
    const tr = props.editor.state.tr
    const $pos = props.editor.state.doc.resolve(pos)
    // 脱离文档流前固定当前列宽和行高；浮动内容不再参与表格自动列宽计算。
    for (let depth = $pos.depth; depth > 0; depth--) {
      const node = $pos.node(depth)
      if (['tableCell', 'tableHeader'].includes(node.type.name)) {
        const style = document.createElement('td').style
        style.cssText = node.attrs.style || ''
        style.height = `${bounds.container.getBoundingClientRect().height / bounds.scale}px`
        tr.setNodeMarkup($pos.before(depth), undefined, { ...node.attrs, style: style.cssText })
      }
      if (node.type.name === 'table') {
        const table = target.closest('table')
        const widths = table && getTableColumnWidths(table, bounds.scale)
        if (widths?.length) setTableColumnWidths(tr, node, $pos.start(depth), widths)
        break
      }
    }
    tr.setNodeMarkup(pos, undefined, attrs)
    props.editor.view.dispatch(tr)
  }

  function beginChange() {
    const time = Date.now()
    props.editor.view.dispatch(closeHistory(props.editor.state.tr))
    return (attributes: Record<string, unknown>) => props.editor.commands.command(({ tr }) => {
      const pos = props.getPos()
      const node = typeof pos === 'number' ? tr.doc.nodeAt(pos) : null
      if (!node || typeof pos !== 'number' || Object.entries(attributes).every(([key, value]) => node.attrs[key] === value)) return false
      tr.setNodeMarkup(pos, undefined, { ...node.attrs, ...attributes }).setTime(time)
      return true
    })
  }

  function endChange() {
    if (!disposed && !props.editor.isDestroyed) props.editor.view.dispatch(closeHistory(props.editor.state.tr))
  }

  function onMouseDown(event: MouseEvent) {
    if (!props.node.attrs.isFloating || event.button !== 0) return
    const target = getElement()
    if (!target) return
    stopDragging?.()
    event.preventDefault()
    event.stopPropagation()
    const pos = props.getPos()
    if (typeof pos === 'number') props.editor.commands.setNodeSelection(pos)
    props.editor.view.focus()
    const updateAttributes = beginChange()
    const scale = getElementScale(props.editor.view.dom)
    const start = { clientX: event.clientX, clientY: event.clientY, x: layout.value.x || 0, y: layout.value.y || 0 }
    const win = target.ownerDocument.defaultView!
    isDragging.value = true
    const move = (event: MouseEvent) => {
      if (!event.buttons) {
        stop()
        return
      }
      let x = start.x + (event.clientX - start.clientX) / scale * PX_TO_PT
      let y = start.y + (event.clientY - start.clientY) / scale * PX_TO_PT
      const bounds = getBounds(target)
      if (bounds) {
        const rect = (isImage.value ? target.querySelector('img') : null)?.getBoundingClientRect() || target.getBoundingClientRect()
        const left = Math.max(bounds.left, Math.min(bounds.right - rect.width, bounds.originLeft + x / PX_TO_PT * bounds.scale))
        const top = Math.max(bounds.top, Math.min(bounds.bottom - rect.height, bounds.originTop + y / PX_TO_PT * bounds.scale))
        x = (left - bounds.originLeft) / bounds.scale * PX_TO_PT
        y = (top - bounds.originTop) / bounds.scale * PX_TO_PT
      }
      updateAttributes({ x, y })
    }
    function stop() {
      isDragging.value = false
      win.removeEventListener('mousemove', move)
      win.removeEventListener('mouseup', stop)
      win.removeEventListener('blur', stop)
      stopDragging = undefined
      endChange()
    }
    win.addEventListener('mousemove', move)
    win.addEventListener('mouseup', stop)
    win.addEventListener('blur', stop)
    stopDragging = stop
  }

  return { wrapperStyle, layout, constrained, getBounds, toggleFloating, onMouseDown, beginChange, endChange, isDragging: readonly(isDragging) }
}
