<script setup lang="ts">
import { useToast } from '~/components/ui/toast/use-toast'
import { openapiDoc } from '~/db/services/openapiDoc'

const show = ref(false)

function open() {
  show.value = true
}
// 接口文档URL
const openapiDocUrl = useStorage('openapiDocUrl', '')
const mockUrl = useStorage('mockUrl', '')
const { toast } = useToast()

const { isLoading, execute: updateOpenapiDoc } = useAsyncState(
  async () => {
    await openapiDoc.update(openapiDocUrl.value)
    toast({ title: '提示', description: '接口文档更新成功' })
  },
  undefined,
  { immediate: false },
)

defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent class="max-w-1200px!">
      <DialogHeader><DialogTitle>设置</DialogTitle></DialogHeader>
      <div class="flex flex-col gap-2 p-1">
        <label>接口文档地址</label>
        <div class="flex items-center">
          <Input v-model="openapiDocUrl" type="text" placeholder="文档地址" />
          <Button class="w-30" :loading="isLoading" @click="() => updateOpenapiDoc()">
            同步
          </Button>
        </div>
        <label>Mock地址</label>
        <Input v-model="mockUrl" type="text" placeholder="Mock地址" />
      </div>
    </DialogContent>
  </Dialog>
</template>
