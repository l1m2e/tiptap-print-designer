import type { ToastRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"

export { default as Toast } from "./Toast.vue"
export { default as ToastAction } from "./ToastAction.vue"
export { default as ToastClose } from "./ToastClose.vue"
export { default as ToastDescription } from "./ToastDescription.vue"
export { default as Toaster } from "./Toaster.vue"
export { default as ToastProvider } from "./ToastProvider.vue"
export { default as ToastTitle } from "./ToastTitle.vue"
export { default as ToastViewport } from "./ToastViewport.vue"
export { toast, useToast } from "./use-toast"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export const toastVariants = cva(
  'tpd-group tpd-pointer-events-auto tpd-relative tpd-flex tpd-w-full tpd-items-center tpd-justify-between tpd-space-x-2 tpd-overflow-hidden tpd-rounded-md tpd-border tpd-p-4 tpd-pr-6 tpd-shadow-lg tpd-transition-all data-[swipe=cancel]:tpd-translate-x-0 data-[swipe=end]:tpd-translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:tpd-translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=move]:tpd-transition-none data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[swipe=end]:tpd-animate-out data-[state=closed]:tpd-fade-out-80 data-[state=closed]:tpd-slide-out-to-right-full data-[state=open]:tpd-slide-in-from-top-full data-[state=open]:sm:tpd-slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'tpd-border tpd-bg-background tpd-text-foreground',
        destructive:
                    'tpd-destructive tpd-group tpd-border-destructive tpd-bg-destructive tpd-text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes["class"]
  variant?: ToastVariants["variant"]
  onOpenChange?: ((value: boolean) => void) | undefined
}
