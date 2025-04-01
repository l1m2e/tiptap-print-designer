<script lang="ts" setup>
import formatTimestampTemplate from '~/components/common/template/formatTimestamp.vue?raw'

const formatTimestampList = [
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

function getFormat() {
  const format = selectedFormat.value === 'custom' ? customFormat.value : selectedFormat.value
  const template = formatTimestampTemplate.replace('$format', format)
  return { type: 'Timestamp', template, value: { selectedFormat: selectedFormat.value, customFormat: customFormat.value } }
}

function setFormat(value: { selectedFormat: string, customFormat: string }) {
  selectedFormat.value = value.selectedFormat
  customFormat.value = value.customFormat
}

defineExpose({ getFormat, setFormat })
</script>

<template>
  <div class="flex items-center justify-center size-full flex-col">
    <Select v-model="selectedFormat">
      <SelectTrigger class="w-[400px]">
        <SelectValue placeholder="请选择字段" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="item in formatTimestampList" :key="item.value" :value="item.value">
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Input v-if="selectedFormat === 'custom'" v-model="customFormat" class="w-[400px] mt-4" placeholder="请输入自定义格式" />
  </div>
</template>
