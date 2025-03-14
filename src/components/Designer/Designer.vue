<script setup lang="ts">
import { ResizablePanel } from '~/components/ui/resizable'
import { generateMockData } from '~/db/services/printDesigner'
import Container from './components/Container.vue'
import EditTopMenu from './components/EditTopMenu/EditTopMenu.vue'

const text = ref('')
const { state: mockData } = useAsyncState(async () => {
  const data = await generateMockData()
  return data
}, null)
</script>

<template>
  <ResizablePanelGroup direction="horizontal" class="min-h-[100vh]">
    <!-- 设计器 -->
    <ResizablePanel>
      <EditorRoot v-model="text">
        <EditTopMenu />
        <EditorContent />
      </EditorRoot>
    </ResizablePanel>
    <ResizableHandle />

    <!-- 预览 -->
    <ResizablePanel class="relative">
      <Container>
        <EditorRoot v-model="text" mode="viewer" :data="mockData">
          <EditorContent />
        </EditorRoot>
      </Container>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
