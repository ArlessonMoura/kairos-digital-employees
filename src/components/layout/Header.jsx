import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { header } from '../../data/header'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Text } from '../ui/Typography'

export function Header() {
  const scrollTo = useSmoothScroll()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDarkMode((current) => !current)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((current) => !current)
  }, [])

  const handleNavigation = useCallback(
    (section) => {
      scrollTo(section)
      setIsMobileMenuOpen(false)
    },
    [scrollTo]
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-subtle' : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-display text-primary-600"
          >            
            {header.logo}            
          </motion.div>

          <div className="items-center hidden gap-6 lg:flex">
            {header.navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -2,
                  color: '#2563EB',
                }}
                onClick={() => scrollTo(item.id)}
                className="relative transition-colors"
              >
                <Text className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                  {item.label}
                </Text>

                <motion.span
                  className="absolute left-0 -bottom-1 h-0.5 bg-primary-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />

              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ThemeToggle
                isDarkMode={isDarkMode}
                onToggle={toggleTheme}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button onClick={() => scrollTo('cta')} size="sm">
                {header.ctaButton}
              </Button>
            </motion.div>
          </div>

          <button
            aria-label={isMobileMenuOpen ? header.ariaLabels.closeMenu : header.ariaLabels.openMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="p-2 lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t lg:hidden glass"
          >
            <Container>
              <div className="flex flex-col gap-4 py-4">
                {header.navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="py-2 text-left transition-colors hover:text-primary-600"
                  >
                    <Text className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                      {item.label}
                    </Text>
                  </button>
                ))}

                <ThemeToggle
                  isDarkMode={isDarkMode}
                  onToggle={toggleTheme}
                />

                <Button
                  className="w-full"
                  onClick={() => handleNavigation('cta')}
                >
                  {header.ctaButton}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}