import { Container } from '../ui/Container'
import { H2, P } from '../ui/Typography'
import { BentoGrid, BentoItem } from '../ui/Grid'
import { AnimatedCard } from '../shared/AnimatedCard'
import { FadeIn } from '../shared/FadeIn'
import { employees } from '../../data/employees'
import { digitalEmployees } from '../../data/digitalEmployees'

export function DigitalEmployees() {
  return (
    <section id="employees" className="py-24 lg:py-56 bg-surface-light dark:bg-surface-dark">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <H2 className="mb-6">
              {digitalEmployees.heading}
            </H2>
            <P className="text-xl">
              {digitalEmployees.description}
            </P>
          </FadeIn>
        </div>

        <BentoGrid>
          {employees.map((employee, index) => (
            <BentoItem key={employee.id}>
              <AnimatedCard employee={employee} delay={index * 0.1} />
            </BentoItem>
          ))}
        </BentoGrid>
      </Container>
    </section>
  )
}
