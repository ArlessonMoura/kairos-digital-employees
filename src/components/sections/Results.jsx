import { motion } from 'framer-motion'
import { Clock, DollarSign, TrendingUp, Users } from 'lucide-react'
import { FadeIn } from '../shared/FadeIn'
import { Container } from '../ui/Container'
import { H2, P, Text } from '../ui/Typography'
import { results } from '../../data/results'

const iconMap = {
  Clock,
  DollarSign,
  TrendingUp,
  Users,
}

export function Results() {
  const stats = results.stats.map((statItem) => ({
    ...statItem,
    icon: iconMap[statItem.icon],
  }))

  return (
    <section className="py-24 lg:py-32 bg-surface-light dark:bg-surface-dark">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {results.heading}
            </H2>
            <P className="text-xl">
              {results.description}
            </P>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className="relative overflow-hidden text-center p-4 sm:p-6 lg:p-8 rounded-2xl border-2 border-gray-300 dark:border-slate-600 shadow-lg flex flex-col h-full"
                whileHover={{ 
                  y: -6,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 pointer-events-none" />
                
                <div className="relative flex flex-col flex-1">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 mb-4 shadow-md self-center">
                    <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <Text className="text-sm sm:text-base">
                    {stat.label}
                  </Text>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
