<script lang="tsx" setup>
import { PAPER_KEY } from './index'

const size = ref<[string, string]>(['210mm', '297mm'])
provide(PAPER_KEY, { size })
</script>

<template>
  <slot />
</template>
