<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { DataSchema, Schema } from '~/db/types'
import { Link } from 'lucide-vue-next'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { generateMockData, getDataSource, updateDataSource, updateMockData } from '~/db/services/printDesigner'
import ApiSelect from '../ApiSelect/ApiSelect.vue'
import SelectResponsesPathDialog from './SelectResponsesPathDialog.vue'

const emits = defineEmits<{ onUpdateDataSource: [] }>()

const show = ref(false)
const SelectResponsesPathDialogRef = ref<InstanceType<typeof SelectResponsesPathDialog>>()

const data = ref<DataSchema[]>([])

const columns = ref<ColumnDef<DataSchema>[]>([
  {
    accessorKey: 'key',
    header: '键',
    cell: ({ row }) => <Input v-model={row.original.key} />,
    size: 200,
  },
  {
    accessorKey: 'api',
    header: 'API',
    cell: ({ row }) => <ApiSelect v-model={row.original.api} class="tpd-w-full" />,
    size: 400,
  },
  {
    accessorKey: 'path',
    header: '路径',
    cell: ({ row }) => {
      const path = row.original.path
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger class="tpd-w-full">
              <Button variant="outline" class="tpd-w-[200px] !justify-start" onClick={() => SelectResponsesPathDialogRef.value?.open(row.original)}>
                <Link class="tpd-mr-1" />
                <span class="truncate">{path ? `Root.${path}` : 'Root'}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {path ? `Root.${path}` : 'Root'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    header: '操作',
    cell: ({ row }) => (
      <div>
        <Button onClick={() => addRow(row.index)} variant="outline"> 添加</Button>
        <Button onClick={() => removeRow(row.index)} class="tpd-ml-1" variant="outline"> 删除 </Button>
      </div>
    ),
    size: 150,
  },
])

function addRow(index: number) {
  const newRow = { key: '', api: null, path: '', id: uuidv4() }
  data.value.splice(index + 1, 0, newRow)
}

function removeRow(index: number) {
  data.value.splice(index, 1)
}

function resetSchemaTree(key: string, tree: Schema) {
  const api = data.value.find(item => item.key === key)
  api && (api.path = tree.path)
}

const { execute: save, isLoading: saveLoading } = useAsyncState(async () => {
  await updateDataSource(data.value!)
  const mockData = await generateMockData()
  await updateMockData(mockData)
  show.value = false
  emits('onUpdateDataSource')
}, null, { immediate: false })

async function open() {
  show.value = true
  data.value = await getDataSource()
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show" :modal="false">
    <DialogContent class="tpd-max-w-screen-lg">
      <DialogHeader>
        <DialogTitle>数据源配置</DialogTitle>
      </DialogHeader>
      <DateTable :data="data" :columns="columns" class="mt-sm tpd-rounded-none" :max-height="500">
        <template #no-data>
          <Button class="w-lg" variant="outline" @click="() => addRow(0)">
            添加一行
          </Button>
        </template>
      </DateTable>
      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button :loading="saveLoading" @click="save">
          保存
        </Button>
      </DialogFooter>
    </DialogContent>
    <SelectResponsesPathDialog ref="SelectResponsesPathDialogRef" @reset-schema-tree="resetSchemaTree" />
  </Dialog>
</template>
