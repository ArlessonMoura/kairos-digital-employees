import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-slate-700 border-2 border-gray-300 dark:border-slate-600 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Desativar modo escuro' : 'Ativar modo escuro'}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600"
        initial={false}
        animate={{
          opacity: isDarkMode ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Sun/Moon container */}
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-primary-300 flex items-center justify-center shadow-md"
        animate={{
          x: isDarkMode ? 32 : 0,
          rotate: isDarkMode ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDarkMode ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? (
            <Moon size={14} className="text-primary-700" />
          ) : (
            <Sun size={14} className="text-orange-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Stars animation (dark mode) */}
      <AnimatePresence>
        {isDarkMode && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: 8 + i * 12,
                  top: 10 + (i % 2) * 8,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
