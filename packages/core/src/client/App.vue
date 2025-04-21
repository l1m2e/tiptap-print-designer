<script setup lang="ts">
import type { TemplateData } from '~/designer'
import { Designer } from '~/designer'
import { Render } from '~/render'

const DesignerRef = useTemplateRef('DesignerEl')
const template = ref<TemplateData>({
  content: '',
  page: {
    size: ['210mm', '297mm'],
    paperType: 'A4',
  },
})

const type = ref<'Designer' | 'Render'>('Designer')

function save(val: TemplateData) {
  template.value = val
}
</script>

<template>
  <div>
    <Tabs v-model="type" class="fixed bottom-4 right-4">
      <TabsList>
        <TabsTrigger value="Designer">
          设计器
        </TabsTrigger>
        <TabsTrigger value="Render">
          渲染器
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Designer v-show="type === 'Designer'" ref="DesignerEl" @save="save" />
    <div v-show="type === 'Render'" class="w-[100vw] h-[100vh] flex items-center justify-center">
      <Render :template="template" :data="DesignerRef?.mockData || {}" class="shadow-lg border" />
    </div>
  </div>
</template>
