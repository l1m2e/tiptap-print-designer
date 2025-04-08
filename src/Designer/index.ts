import type { NodeViewProps } from '@tiptap/vue-3'

export const DESIGNER_KEY = Symbol('DESIGNER_KEY') as InjectionKey<{
  openSelectFieldDialog: () => void
  openEditSFCDialog: (text?: string) => void
  openDateTableDialog: (data: { columns: string, path: string }) => void
  openFormatDialog: (options: { nodeProps?: NodeViewProps, mockData: any }) => void
}>
