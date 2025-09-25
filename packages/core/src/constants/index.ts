import type { Component, DefineComponent } from 'vue'
import type { Format } from '~/designer/components/FormatDialog/common'

/** 注入模块缓存到 SFCLoader 以便在自定义组件中使用业务系统的功能 */
export const TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE = Symbol('TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE') as InjectionKey<Record<string, any>>
/** 打印设计器常量 */
export const TIPTAP_PRINT_DESIGNER_CONST = Symbol('TIPTAP_PRINT_DESIGNER_CONST') as InjectionKey<{
  /** 纸张尺寸 */
  PAPER_SIZE_MAP?: Map<string, [string, string]>
}>
/** 自定义格式化 */
export const TIPTAP_PRINT_DESIGNER_CUSTOM_FORMAT = Symbol('TIPTAP_PRINT_DESIGNER_CUSTOM_FORMAT') as InjectionKey<{
  type: string
  title: string
  component: DefineComponent<
    any, // Props
    any, // RawBindings / setup 返回
    any, // Data
    any, // Computed
    any, // Methods
    any, // Mixin
    any, // Extends
    {
      getFormat: () => Format
      setFormat: (value: Format) => void
    }
  >
  icon?: Component
}[]>
