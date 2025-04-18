import type { Format } from './components/FormatDialog/common'

export const DESIGNER_KEY = Symbol('DESIGNER_KEY') as InjectionKey<{
  openSelectFieldDialog: () => void
  openEditSFCDialog: (text?: string) => void
  openDateTableDialog: (data: { columns: string, path: string }) => void
  openFormatDialog: (options: { format?: Format, mockData: any, customTemplate?: string }) => Promise<Format | undefined>
}>
