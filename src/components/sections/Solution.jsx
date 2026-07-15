import { motion } from 'framer-motion'
import { Check, Shield, Target, Zap } from 'lucide-react'
import { FadeIn } from '../shared/FadeIn'
import { Container } from '../ui/Container'
import { H2, H3, P, Text } from '../ui/Typography'
import { Section } from '../layout/Section'
import { solution } from '../../data/solution'

const iconMap = {
  Zap,
  Target,
  Shield,
  Check,
}

export function Solution() {
  const benefits = solution.benefits.map((benefitItem) => ({
    ...benefitItem,
    icon: iconMap[benefitItem.icon],
  }))

  return (
    <Section className="py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {solution.heading}
            </H2>
            <P className="text-xl">
              {solution.description}
            </P>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border-2 border-gray-300 dark:border-slate-600 shadow-lg flex flex-col h-full"
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
                  <div className="inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 mb-6 shadow-md self-start">
                    <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <H3 className="font-semibold text-lg sm:text-xl mb-3">
                    {benefit.title}
                  </H3>
                  <P className="text-sm sm:text-base flex-1">
                    {benefit.description}
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
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              transition: { duration: 0.3 }
            }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/30 dark:to-success-800/30 border-2 border-success-300 dark:border-success-600 text-success-600 shadow-md"
          >
            {solution.cta.icon === 'Check' && <Check className="w-5 h-5" />}
            <Text className="font-medium text-sm sm:text-base">{solution.cta.text}</Text>
          </motion.div>
        </FadeIn>
      </Container>
    </Section>
  )
}
