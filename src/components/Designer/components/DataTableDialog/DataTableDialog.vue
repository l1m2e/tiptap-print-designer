<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import ApiSelect from '../ApiSelect/ApiSelect.vue'

interface Columns { header: string, accessorKey: string }

const show = ref(false)
const data = ref<Columns[]>([])
const columns = ref<ColumnDef<Columns>[]>([
  {
    accessorKey: 'header',
    header: '列名称',
    cell: ({ row }) => <Input v-model={row.original.header} />,
  },
  {
    accessorKey: 'accessorKey',
    header: '列键',
    cell: ({ row }) => <ApiSelect v-model={row.original.accessorKey} />,
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
  const newRow = { header: '', accessorKey: '', id: uuidv4() }
  data.value.splice(index + 1, 0, newRow)
}

function removeRow(index: number) {
  data.value.splice(index, 1)
}

async function save() {
  show.value = false
}

async function open() {
  show.value = true
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="max-w-5xl">
      <DialogHeader>
        <DialogTitle>数据表格配置</DialogTitle>
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
  </Dialog>
</template>
