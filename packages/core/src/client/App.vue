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

function save(data: TemplateData) {
  console.log('save', data)
}
</script>

<template>
  <div class="tiptap-print-designer">
    <Tabs v-model="type" class="tpd-fixed tpd-bottom-4 tpd-right-4 tpd-rounded-sm">
      <TabsList :class="type === 'Designer' ? 'bg-gray-50' : 'bg-gray-100'">
        <TabsTrigger value="Designer">
          设计器
        </TabsTrigger>
        <TabsTrigger value="Render">
          渲染器
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Designer v-show="type === 'Designer'" ref="DesignerEl" @save="save" />
    <div v-show="type === 'Render'" v-if="templateData">
      <Render :template="templateData" :data="templateData?.mockData || {}" />
    </div>
  </div>
</template>
