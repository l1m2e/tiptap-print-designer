import type { Format } from './components/FormatDialog/common'

export interface TemplateData { content: string, page: { size: [string, string], paperType: string } }
export type DesignerEmits = {
  save: [val: TemplateData]
}

export const DESIGNER_KEY = Symbol('DESIGNER_KEY') as InjectionKey<{
  openSelectFieldDialog: () => void
  openEditSFCDialog: (text?: string) => void
  openDateTableDialog: (data?: { columns: string, path: string }) => void
  openFormatDialog: (options: { format?: Format, mockData: any, customTemplate?: string }) => Promise<Format | undefined>
}>

export { default as Designer } from './Designer.vue'
