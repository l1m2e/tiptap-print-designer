<script lang="tsx" setup>
import type { ColumnDef, Row } from '@tanstack/vue-table'
import type { Schema, SchemaTree } from '~/db/types'
import type { Format } from '~/designer/components/FormatDialog/common'
import { Database, GripVerticalIcon, Sparkles, Trash2 } from 'lucide-vue-next'
import { first, get } from 'radash'
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
import { DESIGNER_KEY } from '~/designer'
import { EDITOR_CONTEXT } from '~/editor/constants'
import SelectDataDialog from './SelectDataDialog.vue'

const { editor, data: mockData } = inject(EDITOR_CONTEXT)!
const { openFormatDialog } = inject(DESIGNER_KEY)!

const SelectDataDialogRef = useTemplateRef('SelectDataDialogEl')

interface Columns { header: string, accessorKey: string, id: string, format: Format | undefined }
const show = ref(false)
const data = ref<Columns[]>([])
const dataSource = ref<{ path: string, schema: SchemaTree, description: string }>({ path: '', schema: [], description: '' })

const columns = ref<ColumnDef<Columns>[]>([
  {
    accessorKey: '#',
    cell: () => (
      <div class="tpd-rounded-sm tpd-bg-gray-100 tpd-p-0.5 tpd-flex tpd-items-center tpd-justify-center handle tpd-cursor-move">
        <GripVerticalIcon class="tpd-text-gray-500 tpd-size-4" />
      </div>
    ),
    size: 30,
  },
  {
    accessorKey: 'header',
    header: '列名称',
    cell: ({ row }) => <Input v-model={row.original.header} />,
  },
  {
    accessorKey: 'accessorKey',
    header: '列键',
    cell: ({ row }) => {
      const schema = dataSource.value?.schema || []
      const selected = schema.find(item => item.field === row.original.accessorKey)
      const search = ref('')
      const filtered = computed(() => {
        const q = String(search.value || '').toLowerCase()
        if (!q) return schema
        return schema.filter((item) => {
          return (item.field || '').toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q)
        })
      })

      function handleSelect(item: Schema) {
        row.original.accessorKey = item.field
        if (!row.original.header) row.original.header = item.description
      }

      return (
        <Select v-model={row.original.accessorKey}>
          <SelectTrigger>
            <SelectValue placeholder="请选择字段">
              <span>{selected?.description}</span>
              <span class="tpd-text-gray-500 tpd-ml-2">{selected?.field}</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <div class="tpd-p-2">
              <Input v-model={search.value} placeholder="搜索字段或描述" />
            </div>
            <div class="tpd-max-h-48 tpd-overflow-auto">
              {filtered.value.map(item => (
                <SelectItem key={item.field} onSelect={() => handleSelect(item)} value={item.field}>
                  <span>{item.description}</span>
                  <span class="tpd-text-gray-500 tpd-ml-2">{item.field}</span>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: 'format',
    cell: ({ row }) => (
      <div class="tpd-flex tpd-items-center tpd-w-full">
        <Button variant={row.original.format ? 'default' : 'outline'} class="tpd-w-full" onClick={() => setFormat(row)}>
          { row.original.format ? '编辑' : '设置' }
        </Button>
        { row.original.format && <Button class="tpd-ml-1" onClick={() => row.original.format = undefined}><Trash2 /></Button> }
      </div>
    ),
    header: '格式化',
    size: 130,
  },
  {
    header: '操作',
    cell: ({ row }) => (
      <div class="tpd-w-[150px]">
        <Button onClick={() => addRow(row.index)} variant="outline"> 添加</Button>
        <Button onClick={() => removeRow(row.index)} class="tpd-ml-1" variant="outline"> 删除 </Button>
      </div>
    ),
    size: 150,
  },
])

async function setFormat(row: Row<Columns>) {
  const tableData = get<Array<any>>(mockData.value, dataSource.value.path)
  const rowData = first(tableData)
  const valueData = get(rowData, row.original.accessorKey)
  const format = await openFormatDialog({
    format: row.original.format,
    mockData: { table: tableData, row: rowData, value: valueData },
    customTemplate: 'TableColumnTemplate',
  })
  row.original.format = format
}

function onSelect(selectData: { schema: SchemaTree, path: string, description: string }) {
  if (dataSource.value.path) {
    data.value = data.value.map(item => ({ ...item, accessorKey: '' }))
  }
  dataSource.value = { path: selectData.path, schema: selectData.schema[0].children!, description: selectData.description }
}

function addRow(index: number) {
  const newRow = { header: '', accessorKey: '', id: uuidv4(), format: undefined }
  data.value.splice(index + 1, 0, newRow)
}

function removeRow(index: number) {
  data.value.splice(index, 1)
}

async function save() {
  editor?.value?.chain().focus().insertContent({ type: 'data-table-node', attrs: { path: dataSource.value.path, columns: JSON.stringify(data.value) } }).run()
  show.value = false
}

async function open(resetData?: { columns: string, path: string }) {
  dataSource.value = { path: '', schema: [], description: '' }
  data.value = []
  if (resetData) {
    const tree = await getApiTree()
    const { schema, description } = getTreeNodeByPath(tree, resetData.path)
    dataSource.value = { path: resetData.path, schema: schema[0].children!, description }
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

function generateData() {
  data.value = []
  dataSource.value.schema.forEach((item) => {
    data.value.push({ header: item.description, accessorKey: item.field, id: uuidv4(), format: undefined })
  })
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="tpd-max-w-screen-lg">
      <DialogHeader>
        <DialogTitle>数据表格配置</DialogTitle>
      </DialogHeader>

      <Button v-if="!dataSource.path" @click="SelectDataDialogRef?.open()">
        选择数据
      </Button>
      <div v-else class="tpd-flex">
        <Button class="tpd-w-full" @click="SelectDataDialogRef?.open()">
          <Database /> { {{ dataSource.description }} {{ dataSource.path }} }
        </Button>
        <Button class="tpd-w-12 tpd-ml-1" @click="generateData">
          <Sparkles />
        </Button>
      </div>

      <DateTable v-if="dataSource.path" v-model:data="data" :columns="columns" class="tpd-mt-sm tpd-rounded-none" :max-height="500">
        <template #no-data>
          <Button class="tpd-w-lg" variant="outline" @click="() => addRow(0)">
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
