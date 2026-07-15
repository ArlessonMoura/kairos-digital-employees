import { motion } from 'framer-motion'
import { AlertCircle, Clock, TrendingDown, X } from 'lucide-react'
import { FadeIn } from '../shared/FadeIn'
import { Container } from '../ui/Container'
import { H2, H3, P, Text } from '../ui/Typography'
import { Section } from '../layout/Section'
import { problem } from '../../data/problem'

const iconMap = {
  Clock,
  AlertCircle,
  TrendingDown,
  X,
}

export function Problem() {
  const problems = problem.problems.map((problemItem) => ({
    ...problemItem,
    icon: iconMap[problemItem.icon],
  }))

  return (
    <Section className="py-24 lg:py-32 bg-surface-light dark:bg-surface-dark">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {problem.heading}
            </H2>
            <P className="text-xl">
              {problem.description}
            </P>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className="relative overflow-hidden text-center p-6 sm:p-8 rounded-2xl border-2 border-gray-300 dark:border-slate-600 shadow-lg flex flex-col h-full"
                whileHover={{ 
                  y: -6,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-br from-error-500/5 via-transparent to-error-500/5 pointer-events-none" />
                
                <div className="relative flex flex-col flex-1">
                  <div className="inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br from-error-50 to-error-100 dark:from-error-900/30 dark:to-error-800/30 mb-6 shadow-md self-center">
                    <problem.icon className="w-6 h-6 sm:w-8 sm:h-8 text-error-600 dark:text-error-400" />
                  </div>
                  <H3 className="font-semibold text-lg sm:text-xl mb-3">
                    {problem.title}
                  </H3>
                  <P className="text-sm sm:text-base flex-1">
                    {problem.description}
                  </P>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="mt-16 text-center">
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
              transition: { duration: 0.3 }
            }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 border-2 border-primary-300 dark:border-primary-600 text-primary-600 shadow-md"
          >
            {problem.cta.icon === 'X' && <X className="w-5 h-5" />}
            <Text className="font-medium text-sm sm:text-base">{problem.cta.text}</Text>
          </motion.div>
        </FadeIn>
      </Container>
    </Section>
  )
}
