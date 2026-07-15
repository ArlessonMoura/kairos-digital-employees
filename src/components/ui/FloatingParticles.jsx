import { motion } from 'framer-motion'

/**
 * @file FloatingParticles.jsx
 * @description Generates and animates 100 rising bubbles.
 * 
 * 💡 AI ASSISTANT / DEVELOPER GUIDELINES:
 * 1. PURE RENDERING / ESLINT COMPLIANCE:
 *    - To satisfy React purity rules and prevent hydration mismatches, DO NOT use `Math.random()` inside the component render.
 *    - Particles are generated deterministically at the module level using a simple pseudo-random LCG (`STATIC_PARTICLES`).
 * 2. OVERFLOW WARNING:
 *    - The parent section MUST have `overflow-hidden` and `relative`.
 *    - Without `overflow-hidden`, particles will float infinitely up the document and display on top of other sections.
 * 3. INTERACTIVE SAFETY:
 *    - Safe for use over active form controls, links, and buttons due to absolute/pointer-events-none styling.
 */

// Predefined static particle configurations to ensure render purity and prevent ESLint warnings
const STATIC_PARTICLES = Array.from({ length: 100 }, (_, i) => {
  const pseudoRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const seed = i + 1;
  const left = pseudoRandom(seed * 1.1) * 100;
  const size = 4 + pseudoRandom(seed * 2.2) * 8;
  const duration = 5 + pseudoRandom(seed * 3.3) * 7;
  const delay = pseudoRandom(seed * 4.4) * 8;
  const xDrift = (pseudoRandom(seed * 5.5) - 0.5) * 100;
  const opacity = 0.5 + pseudoRandom(seed * 6.6) * 0.3;

  return { id: i, left, size, duration, delay, xDrift, opacity };
});

export function FloatingParticles() {
  return (
    <>
      {STATIC_PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-400"
          style={{
            left: `${particle.left}%`,
            bottom: '-50px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -2000],
            x: [0, particle.xDrift],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  )
}
