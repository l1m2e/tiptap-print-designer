import type { NodeViewProps } from '@tiptap/vue-3'
import type { CSSProperties } from 'vue'
import { computed, readonly, ref } from 'vue'

/**
 * 像素转 pt (1pt ≈ 1.333px, 或 1px ≈ 0.75pt)
 */
const PX_TO_PT = 0.75

/**
 * 浮动定位组合式函数
 * 为节点提供脱离文档流的绝对定位和拖拽功能
 */
export function useFloating(props: NodeViewProps) {
  // 拖拽状态
  const isDragging = ref(false)
  const dragStart = ref<{ sx: number, sy: number, x: number, y: number } | null>(null)

  // 判断是否为内联节点
  const isInline = computed(() => {
    const typeName = props.node.type.name
    return typeName === 'sfc-inline' || typeName === 'field-node'
  })

  /**
   * 计算包裹器样式
   * 浮动状态:绝对定位
   * 非浮动状态:根据节点类型自动设置 display
   */
  const wrapperStyle = computed<CSSProperties>(() => {
    if (props.node.attrs.isFloating) {
      return {
        position: 'absolute',
        left: `${props.node.attrs.x || 0}pt`,
        top: `${props.node.attrs.y || 0}pt`,
        zIndex: props.node.attrs.zIndex || 1,
        cursor: isDragging.value ? 'grabbing' : 'grab',
      }
    }
    // 非浮动状态:根据节点类型设置 display
    return {
      display: isInline.value ? 'inline-block' : 'block',
    }
  })

  /**
   * 切换浮动定位状态
   */
  function toggleFloating() {
    props.updateAttributes({ isFloating: !props.node.attrs.isFloating })
  }

  /**
   * 处理鼠标按下事件,开始拖拽
   */
  function onMouseDown(e: MouseEvent) {
    // 只在浮动状态下才允许拖拽
    if (!props.node.attrs.isFloating) return

    e.preventDefault()
    e.stopPropagation()

    isDragging.value = true
    dragStart.value = {
      sx: e.clientX,
      sy: e.clientY,
      x: props.node.attrs.x || 0,
      y: props.node.attrs.y || 0,
    }

    // 监听鼠标移动
    const onMove = (ev: MouseEvent) => {
      if (!dragStart.value) return

      // 计算像素偏移量
      const dxPx = ev.clientX - dragStart.value.sx
      const dyPx = ev.clientY - dragStart.value.sy

      // 转换为 pt 单位
      const dxPt = dxPx * PX_TO_PT
      const dyPt = dyPx * PX_TO_PT

      // 实时更新节点位置
      props.updateAttributes({
        x: dragStart.value.x + dxPt,
        y: dragStart.value.y + dyPt,
      })
    }

    // 监听鼠标释放
    const onUp = () => {
      isDragging.value = false
      dragStart.value = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return {
    isDragging: readonly(isDragging),
    wrapperStyle,
    toggleFloating,
    onMouseDown,
  }
}
