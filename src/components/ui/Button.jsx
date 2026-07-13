import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const buttonVariants = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white border-2 border-primary-500 relative overflow-hidden',
  secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white border-2 border-secondary-400 relative overflow-hidden',
  outline: 'bg-gradient-to-r from-white to-gray-50 border-2 border-primary-600 text-primary-600 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden',
  ghost: 'bg-gradient-to-r from-transparent to-gray-100 text-text-primary-light border-2 border-transparent hover:border-gray-300 dark:to-slate-800 relative overflow-hidden',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  ...props 
}) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 15px 35px rgba(37, 99, 235, 0.4)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className={cn(
        'btn-base font-medium rounded-xl',
        buttonVariants[variant],
        buttonSizes[size],
        'shadow-lg',
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ 
          x: '100%',
          transition: { duration: 0.6 }
        }}
      />
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
