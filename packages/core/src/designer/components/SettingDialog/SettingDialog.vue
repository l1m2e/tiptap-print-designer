<script setup lang="ts">
import { Database } from 'lucide-vue-next'
import DataSourcesSetting from './DataSourcesSetting.vue'
// import ThemeSetting from './ThemeSetting.vue'

const show = ref(false)

const items = [
  {
    title: '数据源',
    component: DataSourcesSetting,
    icon: Database,
  },
]

function open() {
  show.value = true
}
defineExpose({ open })
</script>

<template>
  <MenuDialog v-model:open="show" :menu-items="items" title="设置" />
</template>
