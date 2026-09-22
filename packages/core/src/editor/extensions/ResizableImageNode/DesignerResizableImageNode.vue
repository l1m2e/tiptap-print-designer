<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { useElementSize, useFileDialog } from '@vueuse/core'
import { Image, Move, RotateCcw, Trash2 } from 'lucide-vue-next'
import { getElementScale } from '~/utils'
import { useFloating } from '../../composables/useFloating'

const props = defineProps(nodeViewProps)

const imageRef = ref<HTMLImageElement>()
const { wrapperStyle, layout, constrained, isDragging, onMouseDown, toggleFloating, getBounds, beginChange, endChange } = useFloating(props)
const { width: imageWidth, height: imageHeight } = useElementSize(imageRef)
const showUrlInput = ref(false)
const urlInputValue = ref('')
let stopResizing: (() => void) | undefined
onBeforeUnmount(() => stopResizing?.())

// 使用 VueUse 的文件对话框
const { open: openFileDialog, reset: resetFiles, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

onChange((newFiles) => {
  if (newFiles && newFiles.length > 0) {
    const file = newFiles[0]
    if (!file.type.startsWith('image/')) {
      console.error('请选择图片文件')
      resetFiles()
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      props.updateAttributes({ src })
      resetFiles() // 清理文件状态
    }
    reader.readAsDataURL(file)
  }
})

// 计算图片样式
const imageStyle = computed(() => ({
  width: layout.value.width === 'auto' ? 'auto' : layout.value.width,
  height: layout.value.height === 'auto' ? 'auto' : layout.value.height,
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  maxWidth: layout.value.isFloating ? 'none' : '100%',
  cursor: layout.value.isFloating ? (isDragging.value ? 'grabbing' : 'grab') : 'default',
}))

// 容器样式
const containerStyle = computed(() => ({
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  position: 'relative' as const,
  maxWidth: props.node.attrs.display === 'inline' ? 'none' : '100%',
  ...(layout.value.isFloating ? { ...wrapperStyle.value, width: layout.value.width, margin: 0, lineHeight: 0 } : {}),
}))

// 触发文件选择
function triggerFileUpload() {
  openFileDialog()
}

// 处理图片URL输入
function handleUrlInput() {
  showUrlInput.value = true
  urlInputValue.value = props.node.attrs.src || ''
}

// 确认URL输入
function confirmUrl() {
  if (urlInputValue.value.trim()) {
    props.updateAttributes({ src: urlInputValue.value.trim() })
  }
  showUrlInput.value = false
  urlInputValue.value = ''
}

// 取消URL输入
function cancelUrl() {
  showUrlInput.value = false
  urlInputValue.value = ''
}

// 切换显示模式
function toggleDisplay() {
  const newDisplay = props.node.attrs.display === 'inline' ? 'block' : 'inline'
  props.updateAttributes({ display: newDisplay })
}

// 重置尺寸
function resetSize() {
  const image = imageRef.value
  const bounds = getBounds()
  if (props.node.attrs.isFloating && image?.naturalWidth && bounds) {
    const ratio = Math.min(1, (bounds.right - bounds.left) / bounds.scale / image.naturalWidth, (bounds.bottom - bounds.top) / bounds.scale / image.naturalHeight)
    props.updateAttributes({ width: `${image.naturalWidth * ratio}px`, height: `${image.naturalHeight * ratio}px` })
    return
  }
  props.updateAttributes({ width: 'auto', height: 'auto' })
}

// 删除图片
function deleteImage() {
  props.deleteNode()
}

// 处理拖拽改变尺寸
function handleMouseDown(event: MouseEvent, direction: 'se' | 'e' | 's') {
  if (event.button !== 0) return
  stopResizing?.()
  event.preventDefault()
  event.stopPropagation()

  const image = imageRef.value
  if (!image) return
  const bounds = getBounds()
  const rect = image.getBoundingClientRect()
  const updateAttributes = beginChange()

  const scale = getElementScale(props.editor.view.dom)
  const maxWidth = bounds ? Math.max(0, (bounds.right - rect.left) / scale) : Infinity
  const maxHeight = props.node.attrs.isFloating && bounds ? Math.max(0, (bounds.bottom - rect.top) / scale) : Infinity
  const start = {
    startX: event.clientX,
    startY: event.clientY,
    startWidth: rect.width / scale,
    startHeight: rect.height / scale,
  }

  // 添加全局样式类来禁用选择
  document.body.classList.add('select-none')

  function handleMouseMove(e: MouseEvent) {
    if (!e.buttons) {
      handleMouseUp(e)
      return
    }
    const deltaX = (e.clientX - start.startX) / scale
    const deltaY = (e.clientY - start.startY) / scale

    let newWidth = start.startWidth
    let newHeight = start.startHeight

    if (direction === 'se' || direction === 'e') {
      newWidth = Math.max(50, start.startWidth + deltaX)
    }
    if (direction === 'se' || direction === 's') {
      newHeight = Math.max(50, start.startHeight + deltaY)
    }

    // 保持宽高比（可选）
    if (direction === 'se') {
      const aspectRatio = start.startWidth / start.startHeight
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        newHeight = newWidth / aspectRatio
      }
      else {
        newWidth = newHeight * aspectRatio
      }
      // 同时限制两条边，避免 CSS 单独压缩宽度而拉坏比例。
      const ratio = Math.min(1, maxWidth / newWidth, maxHeight / newHeight)
      newWidth *= ratio
      newHeight *= ratio
    }
    else {
      newWidth = Math.min(maxWidth, newWidth)
      newHeight = Math.min(maxHeight, newHeight)
    }

    updateAttributes({
      width: `${newWidth}px`,
      height: `${newHeight}px`,
    })
  }

  function handleMouseUp(event?: Event) {
    // 移除全局样式类
    document.body.classList.remove('select-none')
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('blur', handleMouseUp)
    stopResizing = undefined
    if (event) endChange()
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('blur', handleMouseUp)
  stopResizing = handleMouseUp
}

// 处理图片加载错误
function handleImageError() {
  console.error('图片加载失败:', props.node.attrs.src)
}
</script>

<template>
  <NodeViewWrapper :style="containerStyle" class="tpd-my-1">
    <Dialog v-model:open="showUrlInput" @close="cancelUrl">
      <DialogContent>
        <DialogTitle>输入图片URL</DialogTitle>
        <Input
          v-model="urlInputValue"
          type="url"
          placeholder="https://example.com/image.jpg"
          @keyup.enter="confirmUrl"
          @keyup.escape="cancelUrl"
        />
        <DialogFooter>
          <Button variant="secondary" @click="cancelUrl">
            取消
          </Button>
          <Button @click="confirmUrl">
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 上下文菜单 -->
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="tpd-relative group">
          <!-- 如果没有图片，显示上传区域 -->
          <div v-if="!props.node.attrs.src" class="tpd-select-none">
            <div class="tpd-flex tpd-flex-col tpd-items-center tpd-justify-center tpd-p-8 tpd-border-2 tpd-border-dashed tpd-border-gray-300 tpd-rounded-lg tpd-bg-gray-50">
              <Image class="tpd-w-12 tpd-h-12 tpd-text-gray-400 tpd-mb-4" />
              <p class="tpd-text-gray-500 tpd-mb-4">
                点击上传图片或输入图片URL
              </p>
              <div class="tpd-flex tpd-gap-2 tpd-mt-2">
                <Button @click="triggerFileUpload">
                  上传文件
                </Button>
                <Button @click="handleUrlInput">
                  输入URL
                </Button>
              </div>
            </div>
          </div>

          <!-- 图片显示区域 -->
          <div v-else class="tpd-relative tpd-inline-block" :class="{ 'tpd-max-w-full': constrained }">
            <img
              ref="imageRef"
              :src="props.node.attrs.src"
              :alt="props.node.attrs.alt || ''"
              :title="props.node.attrs.title || ''"
              :style="imageStyle"
              class="max-w-full tpd-h-auto"
              draggable="false"
              @mousedown="onMouseDown"
              @error="handleImageError"
            >

            <!-- 拖拽手柄 - 只在选中时显示 -->
            <div v-if="props.selected" class="tpd-absolute tpd-inset-0 tpd-pointer-events-none">
              <!-- 右下角 - 等比例缩放 -->
              <div
                class="resize-handle resize-handle-se"
                @mousedown="(e) => handleMouseDown(e, 'se')"
              />
              <!-- 右边 - 只改变宽度 -->
              <div
                class="resize-handle resize-handle-e"
                @mousedown="(e) => handleMouseDown(e, 'e')"
              />
              <!-- 下边 - 只改变高度 -->
              <div
                class="resize-handle resize-handle-s"
                @mousedown="(e) => handleMouseDown(e, 's')"
              />
            </div>

            <!-- 小图保留完整拖拽区域；同样的操作仍可通过右键菜单使用。 -->
            <div v-if="imageWidth >= 120 && imageHeight >= 96" class="tpd-absolute tpd-top-2 tpd-right-2 tpd-flex tpd-gap-1 tpd-bg-black/80 tpd-p-1 tpd-rounded tpd-opacity-0 group-hover:tpd-opacity-100 tpd-transition-opacity">
              <button
                class="toolbar-btn"
                :title="props.node.attrs.display === 'inline' ? '切换到块级' : '切换到内嵌'"
                @click="toggleDisplay"
              >
                <Move class="tpd-w-4 tpd-h-4" />
              </button>
              <button
                class="toolbar-btn"
                title="重置尺寸"
                @click="resetSize"
              >
                <RotateCcw class="tpd-w-4 tpd-h-4" />
              </button>
              <button
                class="toolbar-btn tpd-text-red-400"
                title="删除图片"
                @click="deleteImage"
              >
                <Trash2 class="tpd-w-4 tpd-h-4" />
              </button>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem @select="handleUrlInput">
          更改图片URL
        </ContextMenuItem>
        <ContextMenuItem @select="toggleDisplay">
          {{ props.node.attrs.display === 'inline' ? '切换到块级模式' : '切换到内嵌模式' }}
        </ContextMenuItem>
        <ContextMenuItem :disabled="!props.node.attrs.src" @select="toggleFloating">
          {{ props.node.attrs.isFloating ? '关闭自由拖拽' : '开启自由拖拽' }}
        </ContextMenuItem>
        <ContextMenuItem @select="resetSize">
          重置尺寸
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem class="tpd-text-red-500" @select="deleteImage">
          删除图片
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </NodeViewWrapper>
</template>

<style scoped>
.resize-handle {
  @apply tpd-absolute tpd-bg-black tpd-border-2 tpd-border-white tpd-rounded-sm tpd-pointer-events-auto tpd-shadow-md;
}

.resize-handle-se {
  @apply tpd-bottom-[-4px] tpd-right-[-4px] tpd-w-2 tpd-h-2 tpd-cursor-nw-resize;
}

.resize-handle-e {
  @apply tpd-top-1/2 tpd-right-[-4px] tpd-w-2 tpd-h-4 tpd-cursor-ew-resize tpd--translate-y-1/2;
}

.resize-handle-s {
  @apply tpd-bottom-[-4px] tpd-left-1/2 tpd-w-4 tpd-h-2 tpd-cursor-ns-resize tpd--translate-x-1/2;
}

.toolbar-btn {
  @apply tpd-flex tpd-items-center tpd-justify-center tpd-w-7 tpd-h-7 tpd-bg-transparent tpd-border-none tpd-text-white tpd-rounded-sm tpd-cursor-pointer tpd-transition-colors hover:tpd-bg-white/20;
}
</style>
