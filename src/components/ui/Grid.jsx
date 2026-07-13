import { cn } from '../../utils/cn'

export function Grid({ children, className, cols = 3, ...props }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div 
      className={cn('grid gap-6', gridCols[cols], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function BentoGrid({ children, className, ...props }) {
  return (
    <div 
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] lg:auto-rows-[345px]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function BentoItem({ children, className, colSpan = 1, rowSpan = 1, ...props }) {
  return (
    <div 
      className={cn(
        'col-span-1 row-span-1',
        colSpan === 2 && 'md:col-span-2',
        rowSpan === 2 && 'md:row-span-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
