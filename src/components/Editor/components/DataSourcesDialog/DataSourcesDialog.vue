<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { DataSchema } from '.'
import type { Schema } from '../SchemaTree'
import { Link } from 'lucide-vue-next'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { getDataSource, updateDataSource } from '~/db/services/printDesigner'
import ApiSelect from '../ApiSelect/ApiSelect.vue'
import SelectResponsesPathDialog from './SelectResponsesPathDialog.vue'

const show = ref(false)
const SelectResponsesPathDialogRef = ref<InstanceType<typeof SelectResponsesPathDialog>>()

const data = ref<DataSchema[]>([])

const columns = ref<ColumnDef<DataSchema>[]>([
  {
    accessorKey: 'key',
    header: '键',
    cell: ({ row }) => <Input v-model={row.original.key} />,
  },
  {
    accessorKey: 'api',
    header: 'API',
    cell: ({ row }) => <ApiSelect v-model={row.original.api} />,
  },
  {
    accessorKey: 'path',
    header: '路径',
    cell: ({ row }) => {
      const path = row.original.path
      return (
        <Button variant="outline" onClick={() => SelectResponsesPathDialogRef.value?.open(row.original)}>
          <Link />
          {path ? `Root.${path}` : 'Root'}
        </Button>
      )
    },
  },
  {
    header: '操作',
    cell: ({ row }) => (
      <div class="w-[150px]">
        <Button onClick={() => addRow(row.index)} variant="outline"> 添加</Button>
        <Button onClick={() => removeRow(row.index)} class="ml-1" variant="outline"> 删除 </Button>
      </div>
    ),
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

async function save() {
  await updateDataSource(data.value!)
  show.value = false
}

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
    <DialogContent class="max-w-5xl">
      <DialogHeader>
        <DialogTitle>数据源配置</DialogTitle>
      </DialogHeader>
      <DateTable :data="data" :columns="columns" class="mt-sm rounded-none">
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
        <Button @click="save">
          保存
        </Button>
      </DialogFooter>
    </DialogContent>
    <SelectResponsesPathDialog ref="SelectResponsesPathDialogRef" @reset-schema-tree="resetSchemaTree" />
  </Dialog>
</template>
