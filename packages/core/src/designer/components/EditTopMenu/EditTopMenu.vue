<script lang="ts" setup>
import { EDITOR_CONTEXT } from '~/editor/constants'
import EditHistory from './EditHistory.vue'
import ParagraphFormat from './ParagraphFormat.vue'
import TableMenu from './TableMenu.vue'
import TextAlignment from './TextAlignment.vue'
import TextFormatting from './TextFormatting.vue'

const { editor } = inject(EDITOR_CONTEXT)!

const btnGroups = [ParagraphFormat, TextFormatting, TextAlignment, TableMenu, EditHistory]

const groupsRefs = ref()

onMounted(() => {
})
</script>

<template>
  <div v-if="editor" class="tpd-flex tpd-items-center tpd-h-full">
    <template v-for="(group, index) in btnGroups" :key="index">
      <component :is="group" ref="groupsRefs" />
      <Separator v-if="index < btnGroups.length - 1 && groupsRefs?.[index]?.isShow !== false" orientation="vertical" class="!tpd-h-4 tpd-mx-2" />
    </template>
  </div>
</template>
