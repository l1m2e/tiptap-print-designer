<script setup lang="ts">
import type { TemplateData } from '~/designer'
import { Designer } from '~/designer'
import { Render } from '~/render'

const DesignerRef = useTemplateRef('DesignerEl')
const type = ref<'Designer' | 'Render'>('Designer')
const templateData = ref<TemplateData | undefined>(undefined)

watch(type, async (newType) => {
  if (newType === 'Render') {
    templateData.value = await DesignerRef.value?.getTemplate()
  }
})
</script>

<template>
  <div>
    <Tabs v-model="type" class="fixed bottom-4 right-4 rounded-sm">
      <TabsList :class="type === 'Designer' ? 'bg-gray-50' : 'bg-gray-100'">
        <TabsTrigger value="Designer">
          设计器
        </TabsTrigger>
        <TabsTrigger value="Render">
          渲染器
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Designer v-show="type === 'Designer'" ref="DesignerEl" />
    <div v-show="type === 'Render'" v-if="templateData">
      <Render :template="templateData" :data="templateData?.mockData || {}" />
    </div>
  </div>
</template>
