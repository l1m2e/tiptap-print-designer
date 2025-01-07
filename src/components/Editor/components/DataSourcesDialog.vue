<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import ApiSelect from './ApiSelect.vue'
import SelectResponsesPathDialog from './SelectResponsesPathDialog.vue'

const show = ref(false)
const SelectResponsesPathDialogRef = useTemplateRef('SelectResponsesPathDialogEl')

function open() {
  show.value = true
}

interface Data {
  key: string
  api: string
  path: string
}

const data = ref<Data[]>([
  { key: 'userInfo', api: '', path: 'Root' },
  { key: 'userList', api: '', path: 'Root.rows' },
])

const columns = ref<ColumnDef<Data>[]>([
  {
    accessorKey: 'key',
    header: '键',
    cell: ({ row }) => <Input v-model={row.original.key} />,
  },
  {
    accessorKey: 'api',
    header: 'API',
    cell: ({ row }) =>  <ApiSelect v-model={row.original.api} />,
  },
  {
    accessorKey: 'path',
    header: '路径',
    cell: ({ cell, row }) => (
      <Button variant="outline" onClick={() => reSetPath(row.original.api)}>
        <div class="i-ri-links-line" />
        {cell.getValue()}
      </Button>
    ),
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

function reSetPath(api: any) {
  SelectResponsesPathDialogRef.value?.open(api)
}

function addRow(index: number) {
  data.value = [
    ...data.value.slice(0, index + 1),
    { key: '', api: '', path: '' },
    ...data.value.slice(index + 1),
  ]
}

function removeRow(index: number) {
  data.value = data.value.filter((_, i) => i !== index)
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
    <SelectResponsesPathDialog ref="SelectResponsesPathDialogEl" />
  </Dialog>
</template>
