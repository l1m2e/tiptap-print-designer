<script setup lang="ts">
import MonacoEditor from '~/components/common/monaco-editor/MonacoEditor.vue'
import { useToast } from '~/components/ui/toast/use-toast'
import { getMockData, updateMockData } from '~/db/services/printDesigner'
import { DESIGNER_KEY } from '~/designer'
import { get, set } from '~/utils'

const { fetchMockData } = inject(DESIGNER_KEY)!
const { toast } = useToast()
const show = ref(false)
const label = ref('')
const path = ref('')
const text = ref('')
const editType = ref<'text' | 'number' | 'boolean' | 'json'>('json')
// 字段模式下值为 null：允许选择要创建的值类型
const isNullable = ref(false)

/** 不带参数打开＝编辑整份Mock数据；带 label/path＝编辑单个字段的值 */
async function open(options?: { label: string, path: string }) {
  const mockData = await getMockData()

  if (options) {
    label.value = options.label
    path.value = options.path
    const value = get(mockData, options.path)
    isNullable.value = value == null
    editType.value = value !== null && typeof value === 'object'
      ? 'json'
      : typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : 'text'
    text.value = editType.value === 'json' ? JSON.stringify(value, null, 2) : value == null ? '' : String(value)
  }
  else {
    label.value = 'Mock数据'
    path.value = ''
    isNullable.value = false
    editType.value = 'json'
    text.value = JSON.stringify(mockData, null, 2)
  }

  show.value = true
}

const { isLoading, execute: save } = useAsyncState(async () => {
  try {
    if (path.value) {
      let value: any
      if (editType.value === 'json') {
        value = JSON.parse(text.value)
      }
      else if (editType.value === 'number') {
        if (text.value.trim() === '' && isNullable.value) {
          value = null
        }
        else {
          value = Number(text.value)
          if (Number.isNaN(value))
            throw new Error('请输入数字')
        }
      }
      else if (editType.value === 'boolean') {
        value = text.value === 'true'
      }
      else {
        value = isNullable.value && text.value === '' ? null : text.value
      }

      const mockData = await getMockData()
      set(mockData, path.value, value)
      await updateMockData(mockData)
    }
    else {
      const data = JSON.parse(text.value)
      if (typeof data !== 'object' || data === null || Array.isArray(data))
        throw new Error('Mock数据必须是对象')
      await updateMockData(data)
    }

    await fetchMockData()
    show.value = false
    toast({ title: '提示', description: 'Mock数据已更新' })
  }
  catch (error: any) {
    toast({ title: '保存失败', description: `请检查输入：${error.message}`, variant: 'destructive' })
  }
}, null, { immediate: false })

defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="tpd-max-w-screen-lg">
      <DialogHeader>
        <DialogTitle>{{ path ? `编辑数据：${label}` : 'Mock数据' }}</DialogTitle>
        <p v-if="path" class="tpd-text-sm tpd-text-muted-foreground tpd-break-all">
          {{ path }}
        </p>
      </DialogHeader>

      <Select v-if="path && isNullable" v-model="editType">
        <SelectTrigger class="tpd-w-full">
          <SelectValue placeholder="选择值类型" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="text">
            文本
          </SelectItem>
          <SelectItem value="number">
            数字
          </SelectItem>
          <SelectItem value="boolean">
            布尔
          </SelectItem>
          <SelectItem value="json">
            JSON（对象/数组）
          </SelectItem>
        </SelectContent>
      </Select>

      <div v-if="editType === 'json'" class="tpd-h-[60vh]">
        <MonacoEditor v-model="text" language="json" />
      </div>
      <Select v-else-if="editType === 'boolean'" v-model="text">
        <SelectTrigger class="tpd-w-full">
          <SelectValue placeholder="选择布尔值" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">
            true
          </SelectItem>
          <SelectItem value="false">
            false
          </SelectItem>
        </SelectContent>
      </Select>
      <div v-else>
        <Input
          v-model="text"
          :type="editType === 'number' ? 'number' : 'text'"
          :placeholder="isNullable ? '输入新值（留空保持为 null）' : `输入${label}`"
          @keydown.enter="save"
        />
      </div>

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button :loading="isLoading" @click="save">
          保存
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
