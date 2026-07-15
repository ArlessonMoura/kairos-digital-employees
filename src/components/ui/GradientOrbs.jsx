import { motion } from 'framer-motion'

/**
 * @file GradientOrbs.jsx
 * @description Renders animated, blurred color blobs to create dynamic ambient background lighting.
 * 
 * 💡 AI ASSISTANT / DEVELOPER GUIDELINES:
 * 1. LAYOUT CONSTRAINTS:
 *    - The parent section MUST have `relative` and `overflow-hidden` classes to clip the blurred orbs.
 *    - Ensure foreground elements are wrapped in `relative z-10` to keep them above these background blobs.
 * 2. POSITIONING & RESPONSIVENESS:
 *    - The absolute coordinates (`top-1/4`, `left-1/4`, etc.) are optimized for full-screen layout.
 *    - Adjust tailwind placement classes if reused on sections with different heights or aspect ratios.
 * 3. PERFORMANCE & RENDERING:
 *    - Uses `will-change-transform` implicitly via Framer Motion animations to trigger GPU acceleration.
 */

export function GradientOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-300/15 rounded-full blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </>
  )
}
