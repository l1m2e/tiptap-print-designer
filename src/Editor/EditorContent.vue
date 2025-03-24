<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3'
import { EDITOR_CONTEXT } from './constants'

const { editor, mode } = inject(EDITOR_CONTEXT)!
</script>

<template>
  <EditorContent :editor="editor" class="tiptap-editor" :class="mode" />
</template>

<style lang="css">
@import './style/index.css';
</style>
