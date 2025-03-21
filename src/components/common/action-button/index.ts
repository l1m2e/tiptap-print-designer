import type { Component, FunctionalComponent } from 'vue'
import BubbleMenu from '@tiptap/extension-bubble-menu'

export { default as ActionButton } from './ActionButton.vue'
export default BubbleMenu

export interface ActionButtonProps {
  title: string
  icon: FunctionalComponent | Component
  fn: () => any
}
