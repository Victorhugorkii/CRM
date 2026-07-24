import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:     'bg-white text-black hover:bg-zinc-100',
        secondary:   'bg-zinc-900 text-zinc-100 border border-zinc-800 hover:bg-zinc-800',
        outline:     'border border-zinc-800 bg-transparent text-zinc-300 hover:bg-white/[0.04] hover:text-white',
        ghost:       'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200',
        destructive: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
      },
      size: {
        sm:      'h-8 px-3 text-xs',
        default: 'h-9 px-4',
        lg:      'h-11 px-5',
        icon:    'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
