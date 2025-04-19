<script lang="ts" setup>
import type { DataSchema, Schema, SchemaTree } from '~/db/types'
import { useToast } from '~/components/ui/toast/use-toast'
import { apiSchemaToApiTree } from '~/db/utils/apiSchemaToApiTree'
import { getResponsesSchema } from '~/db/utils/getResponsesSchema'
import SchemaTreeView from '../SchemaTree/SchemaTree.vue'

const emits = defineEmits<{ resetSchemaTree: [key: string, tree: Schema] }>()
const { toast } = useToast()
const show = ref(false)

let schemaTree: Schema | null
let key: string | null
const tree = ref<SchemaTree>([])

function open(row: DataSchema) {
  if (row) {
    const schema = row.api ? getResponsesSchema(row.api.operation) : null
    if (schema) {
      tree.value = apiSchemaToApiTree(schema)
      show.value = true
      key = row.key
    }
    else {
      toast({
        title: '提示',
        description: '请先选择一个接口',
      })
    }
  }
}

function beforeClose(val: boolean) {
  if (!val) {
    schemaTree = null
    key = null
  }
}

function schemaTreeSelect(val: Schema) {
  schemaTree = val
}

function select() {
  (key && schemaTree) && emits('resetSchemaTree', key, schemaTree)
  show.value = false
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show" @update:open="beforeClose">
    <DialogContent class="max-w-[1200px]">
      <DialogHeader>
        <DialogTitle>选择数据</DialogTitle>
      </DialogHeader>
      <SchemaTreeView h-600px :tree @select="schemaTreeSelect" />

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button @click="select">
          选择
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
