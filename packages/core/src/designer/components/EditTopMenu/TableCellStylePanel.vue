<script lang="ts" setup>
import { Columns3CogIcon } from 'lucide-vue-next'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

// 内边距和边框状态
const padding = reactive<Record<string, number | ''>>({
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
})
const border = reactive<Record<string, boolean>>({ t: true, r: true, b: true, l: true })

// 弹窗打开时读取
const open = ref(false)

// 构建 style 字符串
function paddingStyle(): string {
  const parts: string[] = []
  Object.entries(padding).forEach(([k, v]) => v !== '' && parts.push(`padding-${k}: ${v}pt`))
  return parts.join('; ')
}

function borderStyle(): string {
  const parts: string[] = []
  Object.entries(border).forEach(([k, v]) =>
    !v && parts.push(`tpd_table-border-${k}-none`),
  )
  return parts.join(' ')
}

// 应用样式
function applyToCells() {
  editor.value?.chain().focus().setCellAttribute('style', paddingStyle()).run()
  updateCellClass()
  open.value = false
}

function updateCellClass() {
  const currentClass = editor.value?.getAttributes('cell').class || ''
  const removeClasses = ['tpd_table-border-t-none', 'tpd_table-border-l-none', 'tpd_table-border-r-none', 'tpd_table-border-b-none']
  const newClass = currentClass
    .split(/\s+/)
    .filter((c: string) => !removeClasses.includes(c))
    .concat(borderStyle())
    .join(' ')
  editor.value?.chain().focus().setCellAttribute('class', newClass).run()
}

// 清空内边距
function clearPadding() {
  Object.keys(padding).forEach(k => (padding[k] = ''))
}

// 快捷设置内边距
function setPadding(value: number) {
  Object.keys(padding).forEach(k => (padding[k] = value))
}

// 切换所有边框显示
function toggleAllBorders() {
  const allVisible = Object.values(border).every(v => v)
  Object.keys(border).forEach(k => (border[k] = !allVisible))
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <Button size="icon" variant="ghost" title="单元格样式">
        <Columns3CogIcon />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="tpd-w-[300px]">
      <div class="tpd-space-y-4">
        <!-- Padding inputs -->
        <div class="tpd-space-y-2">
          <div class="tpd-text-sm tpd-font-medium">
            内边距 (pt)
          </div>
          <div class="tpd-grid tpd-grid-cols-2 tpd-gap-2">
            <div class="tpd-relative">
              <Input v-model.number="padding.top" type="number" min="0" class="tpd-pl-8" />
              <span
                class="tpd-absolute tpd-left-2 tpd-top-1/2 tpd--translate-y-1/2 tpd-text-xs tpd-text-muted-foreground"
              >
                上
              </span>
            </div>
            <div class="tpd-relative">
              <Input v-model.number="padding.right" type="number" min="0" class="tpd-pl-8" />
              <span
                class="tpd-absolute tpd-left-2 tpd-top-1/2 tpd--translate-y-1/2 tpd-text-xs tpd-text-muted-foreground"
              >
                右
              </span>
            </div>
            <div class="tpd-relative">
              <Input v-model.number="padding.bottom" type="number" min="0" class="tpd-pl-8" />
              <span
                class="tpd-absolute tpd-left-2 tpd-top-1/2 tpd--translate-y-1/2 tpd-text-xs tpd-text-muted-foreground"
              >
                下
              </span>
            </div>
            <div class="tpd-relative">
              <Input v-model.number="padding.left" type="number" min="0" class="tpd-pl-8" />
              <span class="tpd-absolute tpd-left-2 tpd-top-1/2 tpd--translate-y-1/2 tpd-text-xs tpd-text-muted-foreground">
                左
              </span>
            </div>
          </div>

          <!-- 快捷按钮 -->
          <div class="tpd-flex tpd-gap-1 tpd-justify-between">
            <div>
              <Button size="sm" variant="ghost" @click="setPadding(0)">
                0pt
              </Button>
              <Button size="sm" variant="ghost" @click="setPadding(2)">
                2pt
              </Button>
              <Button size="sm" variant="ghost" @click="setPadding(4)">
                4pt
              </Button>
            </div>
            <Button size="sm" variant="outline" @click="clearPadding">
              清空
            </Button>
          </div>
        </div>

        <div class="tpd-h-px tpd-bg-muted" />

        <!-- Border section -->
        <div class="tpd-space-y-2">
          <div class="tpd-flex tpd-items-center tpd-justify-between">
            <div class="tpd-text-sm tpd-font-medium">
              边框显示
            </div>
            <Button size="sm" variant="ghost" class="tpd-text-xs" @click="toggleAllBorders">
              全部切换
            </Button>
          </div>
          <div class="tpd-flex tpd-justify-center">
            <div class="tpd-relative tpd-w-24 tpd-h-24 tpd-bg-muted/20 tpd-rounded">
              <div
                class="tpd-absolute tpd-inset-2 tpd-bg-background tpd-rounded-sm tpd-transition-all"
                :class="{
                  'tpd-border-t-2': border.t,
                  'tpd-border-r-2': border.r,
                  'tpd-border-b-2': border.b,
                  'tpd-border-l-2': border.l,
                  'tpd-border-primary': Object.values(border).some(v => v),
                }"
              >
                <div
                  class="tpd-w-full tpd-h-full tpd-flex tpd-items-center tpd-justify-center tpd-text-xs tpd-text-muted-foreground"
                >
                  预览
                </div>
              </div>

              <!-- Border toggle buttons -->
              <Button
                size="sm"
                :variant="border.t ? 'default' : 'ghost'"
                class="tpd-absolute tpd-top-0 tpd-left-1/2 tpd-transform tpd--translate-x-1/2 tpd--translate-y-1/2 tpd-w-8 tpd-h-6 tpd-text-xs"
                @click="border.t = !border.t"
              >
                上
              </Button>
              <Button
                size="sm"
                :variant="border.r ? 'default' : 'ghost'"
                class="tpd-absolute tpd-right-0 tpd-top-1/2 tpd-transform tpd-translate-x-1/2 tpd--translate-y-1/2 tpd-w-6 tpd-h-8 tpd-text-xs"
                @click="border.r = !border.r"
              >
                右
              </Button>
              <Button
                size="sm"
                :variant="border.b ? 'default' : 'ghost'"
                class="tpd-absolute tpd-bottom-0 tpd-left-1/2 tpd-transform tpd--translate-x-1/2 tpd-translate-y-1/2 tpd-w-8 tpd-h-6 tpd-text-xs"
                @click="border.b = !border.b"
              >
                下
              </Button>
              <Button
                size="sm"
                :variant="border.l ? 'default' : 'ghost'"
                class="tpd-absolute tpd-left-0 tpd-top-1/2 tpd-transform tpd--translate-x-1/2 tpd--translate-y-1/2 tpd-w-6 tpd-h-8 tpd-text-xs"
                @click="border.l = !border.l"
              >
                左
              </Button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="tpd-flex tpd-justify-between tpd-gap-2 tpd-pt-2">
          <Button variant="ghost" @click="open = false">
            取消
          </Button>
          <Button variant="default" class="tpd-flex-1" @click="applyToCells">
            应用样式
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
