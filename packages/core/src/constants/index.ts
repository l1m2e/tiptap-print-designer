export const TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE = Symbol('TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE') as InjectionKey<Record<string, any>>
export const TIPTAP_PRINT_DESIGNER_CONST = Symbol('TIPTAP_PRINT_DESIGNER_CONST') as InjectionKey<{
  /** 纸张尺寸 */
  PAPER_SIZE_MAP?: Map<string, [number, number]>
}>