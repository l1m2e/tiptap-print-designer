<script lang="ts" setup>
import type { DataSchema } from '.'
import type { ApiSchema } from '../../types'
import type { Schema } from '../SchemaTree'
import { useToast } from '~/components/ui/toast/use-toast'
import { getResponsesSchema } from '../../utils/getResponsesSchema'
import SchemaTreeView from '../SchemaTree/SchemaTree.vue'

const emits = defineEmits<{ resetSchemaTree: [key: string, tree: Schema] }>()
const { toast } = useToast()
const show = ref(false)
const schema = ref<ApiSchema>()

let schemaTree: Schema | null
let key: string | null

function open(row: DataSchema) {
  if (row) {
    schema.value = row.api ? getResponsesSchema(row.api) : null
    if (schema.value) {
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
    <DialogContent class="max-w-1200px!">
      <DialogHeader>
        <DialogTitle>选择数据</DialogTitle>
      </DialogHeader>
      <SchemaTreeView h-600px :schema @select="schemaTreeSelect" />

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
