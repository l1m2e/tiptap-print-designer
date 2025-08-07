import { TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE } from '~/constants'

/** 注入模块缓存到 SFCLoader 以便在自定义组件中使用业务系统的功能 */
export function useInjectModuleCache(data: Record<string, any>) {
  provide(TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE, data)
}
