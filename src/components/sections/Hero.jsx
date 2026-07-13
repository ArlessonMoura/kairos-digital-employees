import { motion } from 'framer-motion'
import { ArrowRight, Check, Clock, DollarSign, Users } from 'lucide-react'
import { AnimatedBackground } from '../ui/AnimatedBackground'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { H1, P, Text, Small } from '../ui/Typography'
import { hero } from '../../data/hero'

const iconMap = {
  Check,
  DollarSign,
  Clock,
  Users,
}

export function Hero() {
  const activities = hero.activities.map((activity) => ({
    ...activity,
    icon: iconMap[activity.icon],
  }))

  return (
    <section className="min-h-screen flex items-center pt-20 lg:pt-0 relative overflow-hidden">
      <AnimatedBackground />
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              {hero.badge.text}
            </motion.div>

            <H1 className="mb-6 leading-tight">
              {hero.heading}
            </H1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <P className="text-xl mb-8 max-w-lg">
                {hero.description}
              </P>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg">
                {hero.buttons.primary}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                {hero.buttons.secondary}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center gap-8 text-sm text-text-secondary-light dark:text-text-secondary-dark"
            >
              {hero.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success-500" />
                  <Text>{feature}</Text>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: activity.delay }}
                >
                  <Card className="p-4 flex items-center gap-3 sm:gap-4">
                    <div className="p-2 rounded-lg bg-success-50 flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-success-600" />
                    </div>
                    <Text className="font-medium flex-1 min-w-0">{activity.text}</Text>
                    <Small className="flex-shrink-0">
                      {hero.timeLabel}
                    </Small>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 rounded-3xl blur-3xl opacity-30 -z-10" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
