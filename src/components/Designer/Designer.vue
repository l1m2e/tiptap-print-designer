<script setup lang="ts">
import { ResizablePanel } from '~/components/ui/resizable'
import { generateMockData } from '~/db/services/printDesigner'
import Container from './components/Container.vue'

const text = ref('')
const { state: mockData } = useAsyncState(async () => {
  const data = await generateMockData()
  return data
}, null)
</script>

<template>
  <ResizablePanelGroup direction="horizontal" class="min-h-[100vh]">
    <ResizablePanel>
      <Editor v-model="text" />
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel class="relative">
      <Container>
        <Editor v-model="text" mode="viewer" :data="mockData" />
      </Container>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
