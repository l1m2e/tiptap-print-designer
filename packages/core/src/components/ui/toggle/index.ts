import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Toggle } from "./Toggle.vue"

export const toggleVariants = cva(
  'tpd-inline-flex tpd-items-center tpd-justify-center tpd-gap-2 tpd-rounded-md tpd-text-sm tpd-font-medium tpd-transition-colors hover:tpd-bg-muted hover:tpd-text-muted-foreground focus-visible:tpd-outline-none focus-visible:tpd-ring-1 focus-visible:tpd-ring-ring disabled:tpd-pointer-events-none disabled:tpd-opacity-50 data-[state=on]:tpd-bg-accent data-[state=on]:tpd-text-accent-foreground [&_svg]:tpd-pointer-events-none [&_svg]:tpd-size-4 [&_svg]:tpd-shrink-0',
  {
    variants: {
      variant: {
        default: 'tpd-bg-transparent',
        outline:
          'tpd-border tpd-border-input tpd-bg-transparent tpd-shadow-sm hover:tpd-bg-accent hover:tpd-text-accent-foreground',
      },
      size: {
        default: 'tpd-h-9 tpd-px-2 tpd-min-w-9',
        sm: 'tpd-h-8 tpd-px-1.5 tpd-min-w-8',
        lg: 'tpd-h-10 tpd-px-2.5 tpd-min-w-10',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ToggleVariants = VariantProps<typeof toggleVariants>
