<script lang="ts" setup>
import type { Schema, SchemaTree } from '~/db/types'
import { useToast } from '~/components/ui/toast/use-toast'
import { getApiTree } from '~/db/services/printDesigner'
import Tree from '../SchemaTree/SchemaTree.vue'

const emits = defineEmits<{ select: [data: { schema: SchemaTree, path: string, description: string }] }>()
const show = ref(false)
const tree = ref<SchemaTree>([])
const node = ref<Schema>()

async function open() {
  tree.value = await getApiTree()
  show.value = true
}

const { toast } = useToast()
function confirm() {
  if (node.value?.type === 'array') {
    emits('select', { schema: node.value?.children || [], path: node.value?.path || '', description: node.value?.description || '' })
    show.value = false
  }
  else {
    toast({
      title: '提示',
      description: '请选择一个数组',
    })
  }
}

function select(val: Schema) {
  node.value = val
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="!tpd-max-w-[1200px]">
      <DialogHeader>
        <DialogTitle>选择数据</DialogTitle>
      </DialogHeader>
      <Tree :tree @select="select" />

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button @click="confirm">
          选择
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
