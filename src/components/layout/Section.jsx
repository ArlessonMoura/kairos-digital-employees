import { cn } from '../../utils/cn'

export function Section({ children, className, id, ...props }) {
  return (
    <section
      id={id}
      className={cn('section-padding', className)}
      {...props}
    >
      {children}
    </section>
  )
}
