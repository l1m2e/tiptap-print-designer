import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, watch } from 'vue'

interface PageOptions {
  width: string
  height: string
  margin: string
  /**  可选，默认 print */
  media?: string
}

/**
 * Vue 组合式函数：动态注入 @page 样式，并在组件卸载时移除
 * @param id 样式标签 ID（保证唯一）
 * @param options 响应式页面配置，支持 Ref 或普通对象
 */
export function useInjectPageStyle(id: string, options: Ref<PageOptions> | PageOptions) {
  let styleEl: HTMLStyleElement | null = null

  onMounted(() => {
    styleEl = document.getElementById(id) as HTMLStyleElement | null
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = id
      styleEl.type = 'text/css'
      styleEl.media = (options as any).value?.media || (options as any).media || 'print'
      document.head.appendChild(styleEl)
    }

    styleEl.textContent = getCssRule(toValue(options))
  })

  // 监听响应式更新
  if (isRef(options)) {
    watch(options, (val) => {
      if (styleEl) styleEl.textContent = getCssRule(val)
    }, { deep: true })
  }

  // 卸载时移除
  onBeforeUnmount(() => {
    if (styleEl) {
      styleEl.remove()
      styleEl = null
    }
  })
}

function getCssRule(opts: PageOptions) {
  return `
  @page {
    size: ${opts.width} ${opts.height};
    margin: ${opts.margin};
  }
`
}
