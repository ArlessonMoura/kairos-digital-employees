import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { benefits } from '../../data/benefits'
import { FadeIn } from '../shared/FadeIn'
import { Container } from '../ui/Container'
import { Grid } from '../ui/Grid'
import { H2, H3, P } from '../ui/Typography'

export function Benefits() {
  return (
    <section id="benefits" className="py-24 lg:py-32 bg-surface-light dark:bg-surface-dark">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {benefits.heading}
            </H2>
            <P className="text-xl">
              {benefits.description}
            </P>
          </FadeIn>
        </div>

        <Grid cols={3}>
          {benefits.items.map((benefit, index) => {
            const Icon = Icons[benefit.icon]
            return (
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
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 mb-6 shadow-md self-start">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
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
            )
          })}
        </Grid>
      </Container>
    </section>
  )
}
