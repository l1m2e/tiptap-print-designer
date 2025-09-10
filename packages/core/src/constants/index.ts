/** 注入模块缓存到 SFCLoader 以便在自定义组件中使用业务系统的功能 */
export const TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE = Symbol('TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE') as InjectionKey<Record<string, any>>
/** 打印设计器常量 */
export const TIPTAP_PRINT_DESIGNER_CONST = Symbol('TIPTAP_PRINT_DESIGNER_CONST') as InjectionKey<{
  /** 纸张尺寸 */
  PAPER_SIZE_MAP?: Map<string, [number, number]>
}>