import { motion } from 'framer-motion'
import { useIntersection } from '../../hooks/useIntersection'

export function FadeIn({ children, delay = 0, className, ...props }) {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
