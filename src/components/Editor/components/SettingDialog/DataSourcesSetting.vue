<script setup lang="ts">
import { useToast } from '~/components/ui/toast/use-toast'
import { updateDoc } from '~/db/services/openapiDoc'

// 接口文档URL
const openapiDocUrl = useStorage('openapiDocUrl', '')
const mockUrl = useStorage('mockUrl', '')
const { toast } = useToast()

const { isLoading, execute: updateOpenapiDoc } = useAsyncState(
  async () => {
    await updateDoc(openapiDocUrl.value)
    toast({ title: '提示', description: '接口文档更新成功' })
  },
  undefined,
  { immediate: false },
)
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-2 p-1">
      <label>接口文档地址</label>
      <div class="flex items-center">
        <Input v-model="openapiDocUrl" type="text" placeholder="文档地址" />
      </div>
      <label>Mock地址</label>
      <Input v-model="mockUrl" type="text" placeholder="Mock地址" />
    </div>

    <div class="flex flex-row-reverse">
      <Button :loading="isLoading" class="mt-4" @click="() => updateOpenapiDoc()">
        应用
      </Button>
    </div>
  </div>
</template>
