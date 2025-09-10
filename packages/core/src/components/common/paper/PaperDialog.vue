<script setup lang="ts">
import { FileIcon, SquareMenuIcon } from 'lucide-vue-next'

import PaperLayoutSetting from './PaperLayoutSetting.vue'
import PaperSizeSetting from './PaperSizeSetting.vue'

const show = ref(false)

const items = [
  { title: '纸张尺寸', component: PaperSizeSetting, icon: FileIcon },
  { title: '排版', component: PaperLayoutSetting, icon: SquareMenuIcon },
]

function open() {
  show.value = true
}
defineExpose({ open })
</script>

<template>
  <MenuDialog v-model:open="show" :menu-items="items" title="纸张设置" />
</template>
