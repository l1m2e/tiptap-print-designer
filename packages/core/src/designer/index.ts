import type { Format } from './components/FormatDialog/common'
import type { PagerSetting } from '~/components/common'
import type { DataSchema } from '~/db/types'

export interface EditSFCDialogOptions {
  text?: string
  mode?: 'add' | 'edit'
  onConfirm?: (text: string) => void | Promise<void>
}

export interface TemplateData {
  content: string
  paperSetting: PagerSetting
  dataSources: DataSchema[]
  mockData: any
}

export type DesignerEmits = {
  save: [val: TemplateData]
}

export const DESIGNER_KEY = Symbol('DESIGNER_KEY') as InjectionKey<{
  getTemplate: () => Promise<TemplateData>
  setTemplate: (template: TemplateData) => void
  openSelectFieldDialog: () => void
  openEditSFCDialog: (options?: string | EditSFCDialogOptions) => void
  openDateTableDialog: (data?: { columns: string, path: string }) => void
  openDataTableStyleDialog: (data: string) => Promise<string>
  openFormatDialog: (options: { format?: Format, mockData: any, customTemplate?: string }) => Promise<Format | undefined>
}>

export { default as Designer } from './Designer.vue'
