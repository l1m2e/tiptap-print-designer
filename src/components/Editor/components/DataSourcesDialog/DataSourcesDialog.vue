<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { DataSchema } from '.'

import type { Schema } from '../SchemaTree'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import ApiSelect from '../ApiSelect/ApiSelect.vue'
import SelectResponsesPathDialog from './SelectResponsesPathDialog.vue'

const show = ref(false)
const SelectResponsesPathDialogRef = useTemplateRef('SelectResponsesPathDialogEl')

function open() {
  show.value = true
}

const data = ref<DataSchema[]>([
  { key: 'userInfo', api: null, schemaTree: null },
])

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
    accessorKey: 'schemaTree',
    header: '路径',
    cell: ({ row }) => {
      const path = row.original.schemaTree?.path
      return (
        <Button variant="outline" onClick={() => SelectResponsesPathDialogRef.value?.open(row.original)}>
          <div class="i-ri-links-line" />
          {path ? `Root.${path}` : 'Root'}
        </Button>
      )
    },
  },
  {
    header: '操作',
    cell: ({ row }) => (
      <div>
        <Button onClick={() => addRow(row.index)} variant="outline"> 添加</Button>
        <Button onClick={() => removeRow(row.index)} class="ml-1" variant="outline"> 删除 </Button>
      </div>
    ),
  },
])

function addRow(index: number) {
  data.value = [
    ...data.value.slice(0, index + 1),
    { key: '', api: null, schemaTree: null },
    ...data.value.slice(index + 1),
  ]
}

function removeRow(index: number) {
  data.value = data.value.filter((_, i) => i !== index)
}

function resetSchemaTree(key: string, tree: Schema) {
  data.value = data.value?.map((item) => {
    if (item.key === key) {
      item.schemaTree = tree
    }
    return item
  })
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="max-w-1200px!">
      <DialogHeader>
        <DialogTitle>数据源配置</DialogTitle>
      </DialogHeader>
      <DateTable :data="data" :columns="columns" class="mt-sm rounded-none">
        <template #no-data>
          <Button class="w-lg" variant="outline" @click="addRow(0)">
            添加一行
          </Button>
        </template>
      </DateTable>
    </DialogContent>
    <SelectResponsesPathDialog ref="SelectResponsesPathDialogEl" @reset-schema-tree="resetSchemaTree" />
  </Dialog>
</template>
