<script lang="ts" setup>
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Type } from 'lucide-vue-next'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { editor } = inject(EDITOR_CONTEXT)!

const headingLevels = [
  { label: '正文', value: 0 },
  { label: '一级标题', value: 1 },
  { label: '二级标题', value: 2 },
  { label: '三级标题', value: 3 },
  { label: '四级标题', value: 4 },
  { label: '五级标题', value: 5 },
  { label: '六级标题', value: 6 },
] as const

const currentHeadingLevel = ref(undefined)
function toggleHeading(level: typeof headingLevels[number]['value']) {
  if (level === 0) {
    editor.value?.chain().focus().setParagraph().run()
  }
  else {
    editor.value?.chain().focus().toggleHeading({ level }).run()
  }
}

const IconMap = {
  0: Type,
  1: Heading1,
  2: Heading2,
  3: Heading3,
  4: Heading4,
  5: Heading5,
  6: Heading6,
} as const

const Icon = computed(() => {
  const activeHeading = headingLevels.find(item => editor.value?.isActive('heading', { level: item.value }))
  return activeHeading ? IconMap[activeHeading.value] : Type
})
</script>

<template>
  <div v-if="editor" class="text-and-heading-menu">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" :variant="editor.isActive('heading') ? 'secondary' : 'ghost'">
          <component :is="Icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup v-model="currentHeadingLevel">
          <DropdownMenuRadioItem
            v-for="item in headingLevels" :key="item.value" :value="`${item.value}`"
            @click="() => toggleHeading(item.value)"
          >
            <span>{{ item.label }}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<style scoped>
.text-and-heading-menu {
  display: flex;
  align-items: center;
}
</style>
