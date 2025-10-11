import type { Format } from './components/FormatDialog/common'
import type { PagerSetting } from '~/components/common'
import type { DataSchema } from '~/db/types'

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
  openSelectFieldDialog: () => void
  openEditSFCDialog: (text?: string) => void
  openDateTableDialog: (data?: { columns: string, path: string }) => void
  openDataTableStyleDialog: (data: string) => Promise<string>
  openFormatDialog: (options: { format?: Format, mockData: any, customTemplate?: string }) => Promise<Format | undefined>
}>

export { default as Designer } from './Designer.vue'
