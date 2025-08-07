import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Sheet } from "./Sheet.vue"
export { default as SheetClose } from "./SheetClose.vue"
export { default as SheetContent } from "./SheetContent.vue"
export { default as SheetDescription } from "./SheetDescription.vue"
export { default as SheetFooter } from "./SheetFooter.vue"
export { default as SheetHeader } from "./SheetHeader.vue"
export { default as SheetTitle } from "./SheetTitle.vue"
export { default as SheetTrigger } from "./SheetTrigger.vue"

export const sheetVariants = cva(
  'tpd-fixed tpd-z-50 tpd-gap-4 tpd-bg-background tpd-p-6 tpd-shadow-lg tpd-transition tpd-ease-in-out data-[state=open]:tpd-animate-in data-[state=closed]:tpd-animate-out data-[state=closed]:tpd-duration-300 data-[state=open]:tpd-duration-500',
  {
    variants: {
      side: {
        top: 'tpd-inset-x-0 tpd-top-0 tpd-border-b data-[state=closed]:tpd-slide-out-to-top data-[state=open]:tpd-slide-in-from-top',
        bottom:
            'tpd-inset-x-0 tpd-bottom-0 tpd-border-t data-[state=closed]:tpd-slide-out-to-bottom data-[state=open]:tpd-slide-in-from-bottom',
        left: 'tpd-inset-y-0 tpd-left-0 tpd-h-full tpd-w-3/4 tpd-border-r data-[state=closed]:tpd-slide-out-to-left data-[state=open]:tpd-slide-in-from-left sm:tpd-max-w-sm',
        right:
            'tpd-inset-y-0 tpd-right-0 tpd-h-full tpd-w-3/4 tpd-border-l data-[state=closed]:tpd-slide-out-to-right data-[state=open]:tpd-slide-in-from-right sm:tpd-max-w-sm',
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)

export type SheetVariants = VariantProps<typeof sheetVariants>
