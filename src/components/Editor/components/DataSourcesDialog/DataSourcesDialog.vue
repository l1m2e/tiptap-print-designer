<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { DataSchema } from '.'
import type { FieldType, Schema, SchemaTree } from '../SchemaTree'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { EDITOR_CONTEXT } from '../../constants'
import { apiSchemaToApiTree } from '../../utils/apiSchemaToApiTree'
import { getApiSchemaByPath } from '../../utils/getApiSchemaByPath'
import ApiSelect from '../ApiSelect/ApiSelect.vue'
import SelectResponsesPathDialog from './SelectResponsesPathDialog.vue'

const editorContext = inject(EDITOR_CONTEXT)

const show = ref(false)
const SelectResponsesPathDialogRef = useTemplateRef('SelectResponsesPathDialogEl')

function open() {
  show.value = true
}

const data = ref<DataSchema[]>([
  { key: 'userInfo', api: null, path: '', id: uuidv4() },
  { key: 'systemInfo', api: null, path: '', id: uuidv4() },
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
    accessorKey: 'path',
    header: '路径',
    cell: ({ row }) => {
      const path = row.original.path
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

// 生成API树
function generateApiTree(): SchemaTree {
  return data.value.filter(item => item.api !== null).map((item) => {
    const { api, key, path } = item
    let schema = getApiSchemaByPath(api!, path)

    // 在原来的schema基础上继续添加一层通过key
    if (schema.type === 'object') {
      schema = {
        properties: {
          [key]: schema,
        },
        type: schema.type,
        description: schema.description,
        required: schema.required,
      }
    }

    const tree = apiSchemaToApiTree(schema)
    console.log(tree)
    return tree
  })
}

// 生成Mock数据
function generateMockData() {

}

function save() {
  if (editorContext) {
    editorContext.schemaTree.value = generateApiTree()
    generateMockData()
    show.value = false
  }
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
    <SelectResponsesPathDialog ref="SelectResponsesPathDialogEl" @reset-schema-tree="resetSchemaTree" />
  </Dialog>
</template>
