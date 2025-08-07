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
  get: 'tpd-bg-green-500',
  post: 'tpd-bg-blue-500',
  put: 'tpd-bg-yellow-500',
  delete: 'tpd-bg-red-500',
  options: 'tpd-bg-purple-500',
  head: 'tpd-bg-gray-500',
  patch: 'tpd-bg-orange-500',
  trace: 'tpd-bg-pink-500',
}

function Label({ method, label }: { method: OpenAPIV3.HttpMethods, label: string }) {
  return (
    <div class="tpd-w-full tpd-flex tpd-items-center tpd-justify-start">
      {method && <div class={`tpd-text-white tpd-text-center tpd-px-1 tpd-py-0.5 tpd-rounded-md tpd-w-[80px] tpd-flex-shrink-0 ${methodLabelColor[method]}`}>{method}</div> }
      <div class="tpd-ml-2 tpd-truncate">{ label }</div>
    </div>
  )
}
</script>

<template>
  <Combobox v-model="value" by="label" class="tpd-z-100">
    <ComboboxAnchor class="tpd-w-full">
      <ComboboxTrigger as-child>
        <Button variant="outline" class="tpd-w-full">
          <Label :method="value?.method" :label="value?.label || ''" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="tpd-mt-2 tpd-h-[400px] tpd-w-[400px] tpd-p-1">
      <ComboboxInput v-model="term" class="tpd-sticky tpd-top-0 tpd-w-full tpd-z-20 tpd-h-[32px] tpd-px-2 tpd-border-0 tpd-border-b tpd-rounded-none tpd-bg-popover tpd-outline-none" placeholder="查询接口" />
      <ComboboxVirtualizer v-slot="{ option }" :options="filteredPeople" :estimate-size="32" :overscan="5">
        <ComboboxItem :value="option" class="tpd-h-[32px] tpd-w-full tpd-p-1">
          <Label :method="option.method" :label="option.label" />
        </ComboboxItem>
      </ComboboxVirtualizer>
      <ComboboxEmpty>
        无数据
      </ComboboxEmpty>
    </ComboboxList>
  </Combobox>
</template>
