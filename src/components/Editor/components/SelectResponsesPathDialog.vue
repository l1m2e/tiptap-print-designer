<script lang="ts" setup>
import type { ApiSchema } from '../types'
import { useToast } from '~/components/ui/toast/use-toast'
import SchemaTree from './SchemaTree/SchemaTree.vue'

const { toast } = useToast()

const show = ref(false)

const schema = ref<ApiSchema>()

function open({ responses }: any) {
  if (responses) {
    const content = responses['200'].content
    schema.value = Object.keys(content).map(contentType => content[contentType].schema)[0]
    show.value = true
  }
  else {
    toast({
      title: '提示',
      description: '请先选择一个接口',
    })
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
        <DialogTitle>选择数据</DialogTitle>
      </DialogHeader>
      <SchemaTree h-600px :schema />

      <DialogFooter>
        <Button variant="outline" @click="show = false">
          取消
        </Button>
        <Button @click="">选择</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
