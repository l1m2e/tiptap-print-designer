<script setup lang="ts">
import type { TemplateData } from '~/designer'
import { ref } from 'vue'
import { Render } from '~/render'

const template = ref<TemplateData>({
  content: '<p><field-node label="boos信息" path="boosInfo.name" format="" fontsize="12pt"></field-node></p>',
  page: {
    size: [
      '210mm',
      '297mm',
    ],
    paperType: 'A4',
  },
})
const data = ref({ boosInfo: { name: '黄金律法-拉达冈' } })
</script>

<template>
  <Render :template="template" :data="data" />
</template>
