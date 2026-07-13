import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Card({ children, className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -6,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.3 }
      }}
      className={cn(
        'relative overflow-hidden rounded-xl',
        'bg-gradient-to-br from-white via-white to-gray-50',
        'dark:from-slate-800 dark:via-slate-800 dark:to-slate-900',
        'border-2 border-gray-300 dark:border-slate-600',
        'shadow-lg',
        'transition-all duration-300',
        'flex flex-col',
        className
      )}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 pointer-events-none" />
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}
