export interface Format {
  /** 格式化类型 */
  type: 'Custom' | 'Timestamp'
  /** 格式化模板 */
  template: string
  /** 扩展字段 */
  expands?: any
}
