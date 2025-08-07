<script lang="ts" setup>
import type { Format } from './index'
import { TimestampTemplate } from '~/components/common/template'

const formatList = [
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { label: 'YYYY-MM-DD HH:mm', value: 'YYYY-MM-DD HH:mm' },
  { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
  { label: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
  { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
  { label: 'YYYY/MM/DD HH:mm', value: 'YYYY/MM/DD HH:mm' },
  { label: 'YYYY/MM/DD HH:mm:ss', value: 'YYYY/MM/DD HH:mm:ss' },
  { label: '自定义', value: 'custom' },
]

const selectedFormat = ref('YYYY-MM-DD')
const customFormat = ref('')

function getFormat(): Format {
  const format = selectedFormat.value === 'custom' ? customFormat.value : selectedFormat.value
  const template = TimestampTemplate.replace('$format', format)
  return { type: 'Timestamp', template, expands: { selectedFormat: selectedFormat.value, customFormat: customFormat.value } }
}

function setFormat(data: Format) {
  selectedFormat.value = data.expands?.selectedFormat || 'YYYY-MM-DD'
  customFormat.value = data.expands?.customFormat || ''
}

defineExpose({
  getFormat,
  setFormat,
})
</script>

<template>
  <div class="tpd-flex tpd-items-center tpd-justify-center tpd-size-full tpd-flex-col">
    <Select v-model="selectedFormat">
      <SelectTrigger class="tpd-max-w-sm">
        <SelectValue placeholder="请选择字段" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="item in formatList" :key="item.value" :value="item.value">
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Input v-if="selectedFormat === 'custom'" v-model="customFormat" class="!tpd-w-[400px] tpd-mt-4" placeholder="请输入自定义格式" />
  </div>
</template>
