import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { Section } from '../layout/Section';
import { FadeIn } from '../shared/FadeIn';
import { Container } from '../ui/Container';
import { Grid } from '../ui/Grid';
import { H2, P, Text } from '../ui/Typography';

export function Testimonials() {
  return (
    <Section id="testimonials" className="py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <FadeIn>
            <H2 className="mb-6">{testimonials.heading}</H2>
            <P className="text-xl">{testimonials.description}</P>
          </FadeIn>
        </div>

        <Grid cols={2}>
          {testimonials.items.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className="relative flex flex-col h-full p-6 overflow-hidden border-2 border-gray-300 shadow-lg sm:p-8 rounded-2xl dark:border-slate-600"
                whileHover={{
                  y: -6,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: { duration: 0.3 },
                }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />

                <div className="relative flex flex-col flex-1">
                  <Quote className="flex-shrink-0 w-8 h-8 mb-4 text-primary-300 dark:text-primary-700" />
                  <P className="flex-1 mb-6 text-sm italic sm:text-base">
                    "{testimonial.content}"
                  </P>
                  <div className="flex items-center flex-shrink-0 gap-3 sm:gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-semibold rounded-full shadow-md bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 text-primary-600 dark:text-primary-400 font-display">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text className="text-sm font-semibold truncate text-display sm:text-base">
                        {testimonial.name}
                      </Text>
                      <div>
                        <Text className="text-xs truncate text-primary-600 dark:text-primary-400 sm:text-sm">
                          {testimonial.role}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
