import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { H2, P, Text } from '../ui/Typography'
import { cta } from '../../data/cta'

export function CTA() {
  return (
    <section id="cta" className="py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            whileHover={{ 
              y: -4,
              boxShadow: '0 30px 60px -12px rgba(37, 99, 235, 0.4)',
              transition: { duration: 0.3 }
            }}
            className="relative p-12 overflow-hidden text-white border-2 shadow-2xl lg:p-16 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 border-primary-500"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            
            <H2 className="mb-6 text-white">
              {cta.heading}
            </H2>
            <P className="max-w-2xl mx-auto mb-8 text-xl text-primary-100">
              {cta.description}
            </P>
            
            <div className="flex flex-col justify-center gap-4 mb-12 sm:flex-row">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                {cta.buttons.primary}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-text-secondary-light dark:text-text-secondary-dark hover:bg-white/10">
                {cta.buttons.secondary}
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-100">
              {cta.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <Text>{feature}</Text>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
