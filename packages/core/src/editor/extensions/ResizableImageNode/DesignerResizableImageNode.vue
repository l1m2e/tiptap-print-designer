<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { useFileDialog } from '@vueuse/core'
import { Image, Move, RotateCcw, Trash2 } from 'lucide-vue-next'

const props = defineProps(nodeViewProps)

const imageRef = ref<HTMLImageElement>()
const isResizing = ref(false)
const isDragging = ref(false)
const showUrlInput = ref(false)
const urlInputValue = ref('')
const resizeStartData = ref<{ startX: number, startY: number, startWidth: number, startHeight: number } | null>(null)

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
  width: props.node.attrs.width === 'auto' ? 'auto' : props.node.attrs.width,
  height: props.node.attrs.height === 'auto' ? 'auto' : props.node.attrs.height,
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  maxWidth: '100%',
  cursor: isDragging.value ? 'grabbing' : 'grab',
}))

// 容器样式
const containerStyle = computed(() => ({
  display: props.node.attrs.display === 'inline' ? 'inline-block' : 'block',
  position: 'relative' as const,
  maxWidth: props.node.attrs.display === 'inline' ? 'none' : '100%',
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
  props.updateAttributes({ width: 'auto', height: 'auto' })
}

// 删除图片
function deleteImage() {
  props.deleteNode()
}

// 处理拖拽改变尺寸
function handleMouseDown(event: MouseEvent, direction: 'se' | 'e' | 's') {
  event.preventDefault()
  isResizing.value = true

  const rect = imageRef.value?.getBoundingClientRect()
  if (!rect) return

  resizeStartData.value = {
    startX: event.clientX,
    startY: event.clientY,
    startWidth: rect.width,
    startHeight: rect.height,
  }

  // 添加全局样式类来禁用选择
  document.body.classList.add('select-none')

  function handleMouseMove(e: MouseEvent) {
    if (!resizeStartData.value) return

    const deltaX = e.clientX - resizeStartData.value.startX
    const deltaY = e.clientY - resizeStartData.value.startY

    let newWidth = resizeStartData.value.startWidth
    let newHeight = resizeStartData.value.startHeight

    if (direction === 'se' || direction === 'e') {
      newWidth = Math.max(50, resizeStartData.value.startWidth + deltaX)
    }
    if (direction === 'se' || direction === 's') {
      newHeight = Math.max(50, resizeStartData.value.startHeight + deltaY)
    }

    // 保持宽高比（可选）
    if (direction === 'se' && imageRef.value) {
      const aspectRatio = resizeStartData.value.startWidth / resizeStartData.value.startHeight
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        newHeight = newWidth / aspectRatio
      }
      else {
        newWidth = newHeight * aspectRatio
      }
    }

    props.updateAttributes({
      width: `${newWidth}px`,
      height: `${newHeight}px`,
    })
  }

  function handleMouseUp() {
    isResizing.value = false
    resizeStartData.value = null
    // 移除全局样式类
    document.body.classList.remove('select-none')
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 处理图片加载错误
function handleImageError() {
  console.error('图片加载失败:', props.node.attrs.src)
}
</script>

<template>
  <NodeViewWrapper :style="containerStyle" class="my-1">
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
        <div class="relative group">
          <!-- 如果没有图片，显示上传区域 -->
          <div v-if="!props.node.attrs.src" class="select-none">
            <div class="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Image class="w-12 h-12 text-gray-400 mb-4" />
              <p class="text-gray-500 mb-4">
                点击上传图片或输入图片URL
              </p>
              <div class="flex gap-2 mt-2">
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
          <div v-else class="relative inline-block">
            <img
              ref="imageRef"
              :src="props.node.attrs.src"
              :alt="props.node.attrs.alt || ''"
              :title="props.node.attrs.title || ''"
              :style="imageStyle"
              class="max-w-full h-auto"
              @error="handleImageError"
            >

            <!-- 拖拽手柄 - 只在选中时显示 -->
            <div v-if="props.selected" class="absolute inset-0 pointer-events-none">
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

            <!-- 工具栏 - 悬停时显示 -->
            <div class="absolute top-2 right-2 flex gap-1 bg-black/80 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                class="toolbar-btn"
                :title="props.node.attrs.display === 'inline' ? '切换到块级' : '切换到内嵌'"
                @click="toggleDisplay"
              >
                <Move class="w-4 h-4" />
              </button>
              <button
                class="toolbar-btn"
                title="重置尺寸"
                @click="resetSize"
              >
                <RotateCcw class="w-4 h-4" />
              </button>
              <button
                class="toolbar-btn text-red-400"
                title="删除图片"
                @click="deleteImage"
              >
                <Trash2 class="w-4 h-4" />
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
        <ContextMenuItem @select="resetSize">
          重置尺寸
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem class="text-red-500" @select="deleteImage">
          删除图片
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </NodeViewWrapper>
</template>

<style scoped>
.resize-handle {
  @apply absolute bg-black border-2 border-white rounded-sm pointer-events-auto shadow-md;
}

.resize-handle-se {
  @apply bottom-[-4px] right-[-4px] w-2 h-2 cursor-nw-resize;
}

.resize-handle-e {
  @apply top-1/2 right-[-4px] w-2 h-4 cursor-ew-resize -translate-y-1/2;
}

.resize-handle-s {
  @apply bottom-[-4px] left-1/2 w-4 h-2 cursor-ns-resize -translate-x-1/2;
}

.toolbar-btn {
  @apply flex items-center justify-center w-7 h-7 bg-transparent border-none text-white rounded-sm cursor-pointer transition-colors hover:bg-white/20;
}
</style>
