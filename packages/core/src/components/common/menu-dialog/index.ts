export interface MenuDialogItem {
  title: string
  component: Component
  icon: Component
}

export type MenuDialogProps = {
  menuItems: MenuDialogItem[]
  title?: string
}
