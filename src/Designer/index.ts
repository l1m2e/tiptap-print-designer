export const DESIGNER_KEY = Symbol('DESIGNER_KEY') as InjectionKey<{
  openSelectFieldDialog: () => void
  openEditSFCDialog: (text?: string) => void
  openDateTableDialog: (data: { columns: string, path: string }) => void
}>
