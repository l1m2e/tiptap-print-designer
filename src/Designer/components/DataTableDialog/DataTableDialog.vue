<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { SchemaTree } from '~/db/types'
import { Database } from 'lucide-vue-next'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { getApiTree } from '~/db/services/printDesigner'
import { EDITOR_CONTEXT } from '~/Editor/constants'
import SelectDataDialog from './SelectDataDialog.vue'

const { editor } = inject(EDITOR_CONTEXT)!

const SelectDataDialogRef = useTemplateRef('SelectDataDialogEl')

interface Columns { header: string, accessorKey: string }
const show = ref(false)
const data = ref<Columns[]>([])
const dataSource = ref<{ path: string, schema: SchemaTree, description: string }>({ path: '', schema: [], description: '' })
const columns = ref<ColumnDef<Columns>[]>([
  {
    accessorKey: 'header',
    header: '列名称',
    cell: ({ row }) => <Input v-model={row.original.header} />,
  },
  {
    accessorKey: 'accessorKey',
    header: '列键',
    cell: ({ row }) => (
      <Select v-model={row.original.accessorKey}>
        <SelectTrigger class="w-[400px]"><SelectValue placeholder="请选择字段" /></SelectTrigger>
        <SelectContent>
          {dataSource.value.schema.map(item => (
            <SelectItem onSelect={() => row.original.header = item.description} key={item.path} value={item.field}>{item.description}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
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

function onSelect(selectData: { schema: SchemaTree, path: string, description: string }) {
  if (dataSource.value.path) {
    data.value = data.value.map(item => ({ ...item, accessorKey: '' }))
  }
  dataSource.value = { path: selectData.path, schema: selectData.schema, description: selectData.description }
}

function addRow(index: number) {
  const newRow = { header: '', accessorKey: '', id: uuidv4() }
  data.value.splice(index + 1, 0, newRow)
}

function removeRow(index: number) {
  data.value.splice(index, 1)
}

async function save() {
  editor?.value?.chain().focus().insertContent({ type: 'data-table-node', attrs: { path: dataSource.value.path, columns: JSON.stringify(data.value) } }).run()
  show.value = false
}

async function open(resetData: { columns: string, path: string }) {
  if (resetData) {
    const tree = await getApiTree()
    const { schema, description } = getTreeNodeByPath(tree, resetData.path)
    dataSource.value = { path: resetData.path, schema, description }
    data.value = JSON.parse(resetData.columns) as Columns[]
  }
  show.value = true
}

function getTreeNodeByPath(tree: SchemaTree, path: string): any {
  const keys = path.split('.')
  let resTree = tree
  let resdescription = ''
  for (const key of keys) {
    const node = resTree.find(node => node.field === key)
    if (node) {
      resTree = node?.children || []
      resdescription = node.description
    }
  }
  return { schema: resTree, description: resdescription }
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

      <Button v-if="!dataSource.path" @click="SelectDataDialogRef?.open()">
        选择数据
      </Button>
      <div v-else>
        <Button class="w-full" @click="SelectDataDialogRef?.open()">
          <Database /> { {{ dataSource.description }} {{ dataSource.path }} }
        </Button>
      </div>

      <DateTable v-if="dataSource.path" :data="data" :columns="columns" class="mt-sm rounded-none">
        <template #no-data>
          <Button class="w-lg" variant="outline" @click="() => addRow(0)">
            添加一行
          </Button>
        </template>
      </DateTable>

      <DialogFooter v-if="dataSource.path">
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button @click="save">
          保存
        </Button>
      </DialogFooter>
    </DialogContent>
    <SelectDataDialog ref="SelectDataDialogEl" @select="onSelect" />
  </Dialog>
</template>
