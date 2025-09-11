<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  scopedCss?: string
}>()

const scopeRoot = ref<HTMLElement>()
let styleEl: HTMLStyleElement | null = null
let scopeAttr = ''

function applyStyle(css: string) {
  if (!scopeRoot.value || !styleEl) return
  if (!scopeAttr) {
    scopeAttr = `data-scope-${Math.random().toString(36).slice(2)}`
    scopeRoot.value.setAttribute(scopeAttr, '')
  }

  // 把选择器作用域化
  const scopedCss = css.replace(/(^|\})\s*([^{]+)/g, (_, sep, selector) => {
    return `${sep} [${scopeAttr}][${scopeAttr}] ${selector}`
  })
  styleEl.textContent = scopedCss
}

onMounted(() => {
  styleEl = document.createElement('style')
  document.head.appendChild(styleEl)
  if (props.scopedCss) applyStyle(props.scopedCss)
})

watch(() => props.scopedCss, (css) => {
  if (css) applyStyle(css)
})

onBeforeUnmount(() => {
  if (styleEl) {
    styleEl.remove()
    styleEl = null
  }
})
</script>

<template>
  <div ref="scopeRoot">
    <slot />
  </div>
</template>
