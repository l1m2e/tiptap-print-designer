import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  'tpd-inline-flex tpd-items-center tpd-justify-center tpd-gap-2 tpd-whitespace-nowrap tpd-rounded-md tpd-text-sm tpd-font-medium tpd-transition-colors focus-visible:tpd-outline-none focus-visible:tpd-ring-1 focus-visible:tpd-ring-ring disabled:tpd-pointer-events-none disabled:tpd-opacity-50 [&_svg]:tpd-pointer-events-none [&_svg]:tpd-size-4 [&_svg]:tpd-shrink-0',
  {
    variants: {
      variant: {
        default: 'tpd-bg-primary tpd-text-primary-foreground tpd-shadow hover:tpd-bg-primary/90',
        destructive:
          'tpd-bg-destructive tpd-text-destructive-foreground tpd-shadow-sm hover:tpd-bg-destructive/90',
        outline:
          'tpd-border tpd-border-input tpd-bg-background tpd-shadow-sm hover:tpd-bg-accent hover:tpd-text-accent-foreground',
        secondary:
          'tpd-bg-secondary tpd-text-secondary-foreground tpd-shadow-sm hover:tpd-bg-secondary/80',
        ghost: 'hover:tpd-bg-accent hover:tpd-text-accent-foreground',
        link: 'tpd-text-primary tpd-underline-offset-4 hover:tpd-underline',
      },
      size: {
        default: 'tpd-h-9 tpd-px-4 tpd-py-2',
        xs: 'tpd-h-7 tpd-rounded tpd-px-2',
        sm: 'tpd-h-8 tpd-rounded-md tpd-px-3 tpd-text-xs',
        lg: 'tpd-h-10 tpd-rounded-md tpd-px-8',
        icon: 'tpd-h-9 tpd-w-9',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
