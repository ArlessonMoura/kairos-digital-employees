import { Suspense, lazy } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'

const Problem = lazy(() => import('./components/sections/Problem').then((module) => ({ default: module.Problem })))
const Solution = lazy(() => import('./components/sections/Solution').then((module) => ({ default: module.Solution })))
const DigitalEmployees = lazy(() => import('./components/sections/DigitalEmployees').then((module) => ({ default: module.DigitalEmployees })))
const HowItWorks = lazy(() => import('./components/sections/HowItWorks').then((module) => ({ default: module.HowItWorks })))
const Benefits = lazy(() => import('./components/sections/Benefits').then((module) => ({ default: module.Benefits })))
const InvisibleTechnology = lazy(() => import('./components/sections/InvisibleTechnology').then((module) => ({ default: module.InvisibleTechnology })))
const Results = lazy(() => import('./components/sections/Results').then((module) => ({ default: module.Results })))
const Testimonials = lazy(() => import('./components/sections/Testimonials').then((module) => ({ default: module.Testimonials })))
const FAQ = lazy(() => import('./components/sections/FAQ').then((module) => ({ default: module.FAQ })))
const CTA = lazy(() => import('./components/sections/CTA').then((module) => ({ default: module.CTA })))

const SectionFallback = () => <div className="section-padding" aria-hidden="true" />

function App() {
  return (
    <div className="min-h-screen bg-background-light text-text-primary-light dark:bg-background-dark dark:text-text-primary-dark">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Problem />
          <Solution />
          <DigitalEmployees />
          <HowItWorks />
          <Benefits />
          <InvisibleTechnology />
          <Results />
          <Testimonials />
          <FAQ />
          <CTA />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App


