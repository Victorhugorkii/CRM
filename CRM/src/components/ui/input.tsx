import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Input — campo de texto base com tema dark.
 */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 shadow-sm outline-none transition-all duration-200 hover:border-zinc-700 focus:border-zinc-600 focus:bg-zinc-900 focus:ring-2 focus:ring-white/10',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
