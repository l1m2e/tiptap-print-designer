import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { cva } from "class-variance-authority"

export interface SidebarProps {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  class?: HTMLAttributes["class"]
}

export { default as Sidebar } from "./Sidebar.vue"
export { default as SidebarContent } from "./SidebarContent.vue"
export { default as SidebarFooter } from "./SidebarFooter.vue"
export { default as SidebarGroup } from "./SidebarGroup.vue"
export { default as SidebarGroupAction } from "./SidebarGroupAction.vue"
export { default as SidebarGroupContent } from "./SidebarGroupContent.vue"
export { default as SidebarGroupLabel } from "./SidebarGroupLabel.vue"
export { default as SidebarHeader } from "./SidebarHeader.vue"
export { default as SidebarInput } from "./SidebarInput.vue"
export { default as SidebarInset } from "./SidebarInset.vue"
export { default as SidebarMenu } from "./SidebarMenu.vue"
export { default as SidebarMenuAction } from "./SidebarMenuAction.vue"
export { default as SidebarMenuBadge } from "./SidebarMenuBadge.vue"
export { default as SidebarMenuButton } from "./SidebarMenuButton.vue"
export { default as SidebarMenuItem } from "./SidebarMenuItem.vue"
export { default as SidebarMenuSkeleton } from "./SidebarMenuSkeleton.vue"
export { default as SidebarMenuSub } from "./SidebarMenuSub.vue"
export { default as SidebarMenuSubButton } from "./SidebarMenuSubButton.vue"
export { default as SidebarMenuSubItem } from "./SidebarMenuSubItem.vue"
export { default as SidebarProvider } from "./SidebarProvider.vue"
export { default as SidebarRail } from "./SidebarRail.vue"
export { default as SidebarSeparator } from "./SidebarSeparator.vue"
export { default as SidebarTrigger } from "./SidebarTrigger.vue"

export { useSidebar } from "./utils"

export const sidebarMenuButtonVariants = cva(
  'tpd-peer/menu-button tpd-flex tpd-w-full tpd-items-center tpd-gap-2 tpd-overflow-hidden tpd-rounded-md tpd-p-2 tpd-text-left tpd-text-sm tpd-outline-none tpd-ring-sidebar-ring tpd-transition-[width,height,padding] hover:tpd-bg-sidebar-accent hover:tpd-text-sidebar-accent-foreground focus-visible:tpd-ring-2 active:tpd-bg-sidebar-accent active:tpd-text-sidebar-accent-foreground disabled:tpd-pointer-events-none disabled:tpd-opacity-50 tpd-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tpd-pointer-events-none aria-disabled:tpd-opacity-50 data-[active=true]:tpd-bg-sidebar-accent data-[active=true]:tpd-font-medium data-[active=true]:tpd-text-sidebar-accent-foreground data-[state=open]:hover:tpd-bg-sidebar-accent data-[state=open]:hover:tpd-text-sidebar-accent-foreground group-data-[collapsible=icon]:tpd-!size-8 group-data-[collapsible=icon]:tpd-!p-2 [&>span:last-child]:tpd-truncate [&>svg]:tpd-size-4 [&>svg]:tpd-shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:tpd-bg-sidebar-accent hover:tpd-text-sidebar-accent-foreground',
        outline:
          'tpd-bg-background tpd-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tpd-bg-sidebar-accent hover:tpd-text-sidebar-accent-foreground hover:tpd-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'tpd-h-8 tpd-text-sm',
        sm: 'tpd-h-7 tpd-text-xs',
        lg: 'tpd-h-12 tpd-text-sm group-data-[collapsible=icon]:tpd-!p-0',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>
