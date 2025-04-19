import type { editor } from 'monaco-editor'

export interface MonacoEditorProps {
  /** 编辑器语言 */
  language?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 编辑器配置 */
  config?: editor.IStandaloneEditorConstructionOptions
}
