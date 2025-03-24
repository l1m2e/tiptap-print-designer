<script setup lang="ts">
import { MoonStar, Sun } from 'lucide-vue-next'

type Theme = 'light' | 'dark'
const theme = ref <Theme>(isDark.value ? 'dark' : 'light')

function toggleTheme() {
  toggleDark(theme.value === 'dark')
}

watch(theme, () => toggleTheme())
</script>

<template>
  <Tabs v-model="theme" :default-value="theme">
    <TabsList>
      <TabsTrigger value="dark">
        <MoonStar class="size-5" />
      </TabsTrigger>
      <TabsTrigger value="light">
        <Sun class="size-5" />
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
