import { motion } from 'framer-motion'
import { CheckCircle, EyeOff, Sparkles } from 'lucide-react'
import { FadeIn } from '../shared/FadeIn'
import { Container } from '../ui/Container'
import { H2, H3, P } from '../ui/Typography'
import { Section } from '../layout/Section'
import { invisibleTechnology } from '../../data/invisibleTechnology'

const iconMap = {
  EyeOff,
  Sparkles,
  CheckCircle,
}

export function InvisibleTechnology() {
  const features = invisibleTechnology.features.map((featureItem) => ({
    ...featureItem,
    icon: iconMap[featureItem.icon],
  }))
  return (
    <Section className="py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {invisibleTechnology.heading}
            </H2>
            <P className="text-xl">
              {invisibleTechnology.description}
            </P>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <motion.div
              whileHover={{ 
                y: -4,
                boxShadow: '0 30px 60px -12px rgba(37, 99, 235, 0.25)',
                transition: { duration: 0.3 }
              }}
              className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50 dark:from-primary-900/30 dark:via-primary-800/30 dark:to-secondary-900/30 border-2 border-primary-300 dark:border-primary-600 shadow-xl"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="text-center flex flex-col"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 mb-4 shadow-md border border-gray-200 dark:border-slate-600 self-center">
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <H3 className="font-semibold text-base sm:text-lg mb-2">
                      {feature.title}
                    </H3>
                    <P className="text-xs sm:text-sm">
                      {feature.description}
                    </P>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
