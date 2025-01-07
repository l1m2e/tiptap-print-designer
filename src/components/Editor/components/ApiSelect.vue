<script setup lang="tsx">
import { ComboboxVirtualizer } from 'reka-ui'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '~/components/ui/combobox'
import { Input } from '~/components/ui/input'
import { EDITOR_CONTEXT } from '../constants'

const editorContext = inject(EDITOR_CONTEXT)

const apiOptions = computed(() => {
  const doc = editorContext?.openapiDoc?.value
  return doc
    ? Object.keys(doc.paths).flatMap(key => Object.keys(doc.paths[key]).map(item => ({
        path: key,
        method: item,
        label: doc.paths[key][item].summary,
        value: `${item}#${key}`,
        ...doc.paths[key][item],
      })))
    : []
})

const value = ref()
const term = ref('')
const filterOptions = computed(() => {
  const toLowerCaseTerm = term.value.toLowerCase()
  const data = apiOptions.value.filter(item => item.label.toLowerCase().includes(toLowerCaseTerm) || item.value.toLowerCase().includes(toLowerCaseTerm))
  return data
})

const methodLabelColor = {
  get: 'bg-green-500',
  post: 'bg-blue-500',
  put: 'bg-yellow-500',
  delete: 'bg-red-500',
} as const

function Label({ method, label }: { method: 'get' | 'post' | 'put' | 'delete', label: string }) {
  return (
    <div class="w-full flex items-center justify-start">
      {method && <div class={`text-white text-center px-1 py-0.5 rounded-md w-80px bg-op-90 flex-shrink-0 ${methodLabelColor[method]}`}>{method}</div> }
      <div class="ml-sm truncate">{ label }</div>
    </div>
  )
}
</script>

<template>
  <Combobox v-model="value" by="label">
    <ComboboxAnchor class="w-500px">
      <ComboboxTrigger as-child>
        <Button variant="outline" class="w-full">
          <Label :method="value?.method" :label="value?.label || ''" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="mt-2 h-400px w-500px p-1">
      <!-- 这个一行不写回报错 写了 则 v-model 是失效状态的 -->
      <ComboboxInput as-child />
      <Input v-model="term" class="pos-sticky top-0 z-1 h-32px border-0 border-b rounded-none bg-popover focus-visible:ring-0" placeholder="查询接口" />

      <ComboboxVirtualizer
        v-slot="{ option }" :options="filterOptions"
        :estimate-size="32"
        :overscan="5"
      >
        <ComboboxItem :value="option" class="h-32px w-full p-1">
          <Label :method="option.method" :label="option.label" />
        </ComboboxItem>
      </ComboboxVirtualizer>
      <ComboboxEmpty>
        无数据
      </ComboboxEmpty>
    </ComboboxList>
  </Combobox>
</template>
