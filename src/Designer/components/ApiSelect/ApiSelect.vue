<script setup lang="tsx">
import type { OpenAPIV3 } from 'openapi-types'
import { ComboboxInput, ComboboxVirtualizer, useFilter } from 'reka-ui'
import { getApiList } from '~/db/services/openapiDoc'

const { state: apiOptions } = useAsyncState(async () => {
  return await getApiList()
}, [])

const value = defineModel<any>()
const term = ref('')

const { contains } = useFilter({ sensitivity: 'base' })
const filteredPeople = computed(() => apiOptions.value.filter(p => contains(p.label, term.value)))

const methodLabelColor: Record<OpenAPIV3.HttpMethods, string> = {
  get: 'bg-green-500',
  post: 'bg-blue-500',
  put: 'bg-yellow-500',
  delete: 'bg-red-500',
  options: 'bg-purple-500',
  head: 'bg-gray-500',
  patch: 'bg-orange-500',
  trace: 'bg-pink-500',
}

function Label({ method, label }: { method: OpenAPIV3.HttpMethods, label: string }) {
  return (
    <div class="w-full flex items-center justify-start">
      {method && <div class={`text-white text-center px-1 py-0.5 rounded-md w-[80px] flex-shrink-0 ${methodLabelColor[method]}`}>{method}</div> }
      <div class="ml-2 truncate">{ label }</div>
    </div>
  )
}
</script>

<template>
  <Combobox v-model="value" by="label" class="z-100">
    <ComboboxAnchor class="w-full">
      <ComboboxTrigger as-child>
        <Button variant="outline" class="w-full">
          <Label :method="value?.method" :label="value?.label || ''" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="mt-2 h-[400px] w-[400px] p-1">
      <ComboboxInput v-model="term" class="sticky top-0 w-full z-20 h-[32px] px-2 border-0 border-b rounded-none bg-popover outline-none" placeholder="查询接口" />
      <ComboboxVirtualizer v-slot="{ option }" :options="filteredPeople" :estimate-size="32" :overscan="5">
        <ComboboxItem :value="option" class="h-[32px] w-full p-1">
          <Label :method="option.method" :label="option.label" />
        </ComboboxItem>
      </ComboboxVirtualizer>
      <ComboboxEmpty>
        无数据
      </ComboboxEmpty>
    </ComboboxList>
  </Combobox>
</template>
