import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Check } from 'lucide-react'
import { Card } from '../ui/Card'
import { H3, P, Text } from '../ui/Typography'

const colorMap = {
  primary: 'text-primary-600 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30',
  secondary: 'text-secondary-600 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/30 dark:to-secondary-800/30',
  success: 'text-success-600 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/30 dark:to-success-800/30',
}

export function AnimatedCard({ employee, delay = 0 }) {
  const Icon = Icons[employee.icon]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="h-full lg:min-h-[350px]"
    >
      <Card className="flex flex-col w-full h-full p-6 justify-self-start lg:min-h-5/6">
        <div className={`inline-flex p-3 rounded-xl ${colorMap[employee.color]} mb-4 shadow-md`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <H3 className="mb-2 text-xl font-semibold">
          {employee.title}
        </H3>
        
        <P className="pb-2 mb-3">
          {employee.description}
        </P>
        
        <div className="pb-2 space-y-2">
          {employee.activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + 0.3 + index * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <Check className="flex-shrink-0 w-4 h-4 text-success-500" />
              <Text className="text-text-secondary-light dark:text-text-secondary-dark">
                {activity.text}
              </Text>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
