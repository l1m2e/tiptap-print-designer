<script setup lang="ts">
import { FileIcon, PaintbrushIcon, SquareMenuIcon } from 'lucide-vue-next'
import PaperCustomStyleSetting from './PaperCustomStyleSetting.vue'
import PaperLayoutSetting from './PaperLayoutSetting.vue'
import PaperSizeSetting from './PaperSizeSetting.vue'

const show = ref(false)

const items = [
  { title: '纸张尺寸', component: PaperSizeSetting, icon: FileIcon },
  { title: '排版', component: PaperLayoutSetting, icon: SquareMenuIcon },
  { title: '自定义样式', component: PaperCustomStyleSetting, icon: PaintbrushIcon },
]

function open() {
  show.value = true
}
defineExpose({ open })
</script>

<template>
  <MenuDialog v-model:open="show" :menu-items="items" title="纸张设置" />
</template>
