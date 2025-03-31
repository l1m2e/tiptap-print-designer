<script lang="ts" setup>
const customFormat = ref('')
function getFormat() {
  return customFormat.value
}
defineExpose({ getFormat })
</script>

<template>
  自定义格式化
</template>
