<script lang="ts" setup>
const customFormat = ref('')
function getFormat() {
  return customFormat.value
}

function setFormat(value: string) {
  customFormat.value = value
}

defineExpose({ getFormat, setFormat })
</script>

<template>
  自定义格式化
</template>
