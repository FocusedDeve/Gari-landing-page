import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { pressable } from '@/lib/motion'

type ButtonVariant = 'primary' | 'inverse' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-bone hover:bg-bark',
  inverse: 'bg-straw text-ink hover:bg-straw-light',
  outline: 'border-2 border-ink/25 text-ink hover:border-ink hover:bg-ink/5',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm sm:px-10 sm:py-5 sm:text-base',
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  className?: string
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}: ButtonProps) {
  return (
    <motion.a
      href={href}
      {...pressable}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-bold uppercase tracking-wide transition-colors duration-300 ease-organic ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
      {icon}
    </motion.a>
  )
}
