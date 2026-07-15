import { FloatingParticles } from './FloatingParticles'
import { GradientOrbs } from './GradientOrbs'
import { LogoBackground } from './LogoBackground'

// Set to true to re-enable background animations in the future
const ENABLE_ANIMATIONS = false;

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Company Logo in place of the orbs */}
      <LogoBackground />

      {/* Animated gradient orbs (Preserved - disabled by default) */}
      {ENABLE_ANIMATIONS && <GradientOrbs />}
      
      {/* Floating particles - like gas bubbles (Preserved - disabled by default) */}
      {ENABLE_ANIMATIONS && <FloatingParticles />}
    </div>
  )
}

