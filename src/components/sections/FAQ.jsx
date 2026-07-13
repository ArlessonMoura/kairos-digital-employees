import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { faq } from '../../data/faq'
import { FadeIn } from '../shared/FadeIn'
import { Container } from '../ui/Container'
import { H2, P, Text } from '../ui/Typography'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="py-24 lg:py-32 bg-surface-light dark:bg-surface-dark">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {faq.heading}
            </H2>
            <P className="text-xl">
              {faq.description}
            </P>
          </FadeIn>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faq.items.map((item, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <motion.div
                className="relative overflow-hidden rounded-2xl border-2 border-gray-300 dark:border-slate-600 shadow-lg"
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 pointer-events-none" />
                
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="relative w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <Text className="text-display font-semibold text-base sm:text-lg flex-1">
                    {item.question}
                  </Text>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto',opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative px-4 sm:px-6 pb-4 sm:pb-6">
                        <P className="text-sm sm:text-base">
                          {item.answer}
                        </P>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
