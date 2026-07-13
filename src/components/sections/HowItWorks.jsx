import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, Rocket, Settings } from 'lucide-react'
import { FadeIn } from '../shared/FadeIn'
import { Container } from '../ui/Container'
import { Grid } from '../ui/Grid'
import { H2, H3, P } from '../ui/Typography'
import { howItWorks } from '../../data/howItWorks'

const iconMap = {
  MessageSquare,
  Settings,
  Rocket,
}

export function HowItWorks() {
  const steps = howItWorks.steps.map((stepItem) => ({
    ...stepItem,
    icon: iconMap[stepItem.icon],
  }))

  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {howItWorks.heading}
            </H2>
            <P className="text-xl">
              {howItWorks.description}
            </P>
          </FadeIn>
        </div>

        <Grid cols={3}>
          {steps.map((step, index) => (
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
                  <div className="text-5xl sm:text-6xl font-display font-bold text-primary-200 dark:text-primary-700/30 mb-4">
                    {step.step}
                  </div>
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 mb-6 shadow-md self-start">
                    <step.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <H3 className="font-semibold text-lg sm:text-xl mb-3">
                    {step.title}
                  </H3>
                  <P className="text-sm sm:text-base flex-1">
                    {step.description}
                  </P>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-0.5 lg:-right-0.5 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark" />
                  </div>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
