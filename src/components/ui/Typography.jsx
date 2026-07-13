import { cn } from '../../utils/cn'

export function H1({ children, className, ...props }) {
  return (
    <h1 
      className={cn(
        'text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }) {
  return (
    <h2 
      className={cn(
        'text-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }) {
  return (
    <h3 
      className={cn(
        'text-display text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary-light dark:text-text-primary-dark',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function H4({ children, className, ...props }) {
  return (
    <h4 
      className={cn(
        'text-display text-xl sm:text-2xl font-semibold tracking-tight text-text-primary-light dark:text-text-primary-dark',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
}

export function P({ children, className, ...props }) {
  return (
    <p 
      className={cn(
        'text-body text-base sm:text-lg text-text-secondary-light',
        'dark:text-text-secondary-dark',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function Text({ children, className, ...props }) {
  return (
    <span 
      className={cn(
        'text-body text-text-primary-light dark:text-text-primary-dark',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function Small({ children, className, ...props }) {
  return (
    <small 
      className={cn(
        'text-body text-sm text-text-secondary-light dark:text-text-secondary-dark',
        className
      )}
      {...props}
    >
      {children}
    </small>
  )
}
