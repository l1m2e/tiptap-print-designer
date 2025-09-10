<script lang="tsx" setup>
import { FileIcon } from 'lucide-vue-next'
import PaperDialog from './PaperDialog.vue'

const PaperDialogRef = useTemplateRef('PaperDialogEl')
</script>

<template>
  <div class="tpd-flex tpd-items-center">
    <Button variant="outline" size="icon" @click="PaperDialogRef?.open">
      <FileIcon />
    </Button>
    <PaperDialog ref="PaperDialogEl" />
  </div>
</template>
