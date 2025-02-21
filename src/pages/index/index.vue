<script setup lang="ts">
import SettingDialog from './components/SettingDialog.vue'

const SettingDialogRef = ref<InstanceType<typeof SettingDialog>>()
</script>

<template>
  <!-- <Editor v-model="content" h-100vh /> -->
  <Button @click="SettingDialogRef?.open">
    设置弹窗
  </Button>
  <SettingDialog ref="SettingDialogRef" />
</template>
