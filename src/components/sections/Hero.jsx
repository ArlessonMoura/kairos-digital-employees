import { motion } from 'framer-motion';
import { ArrowRight, Bell, Check, Clock, DollarSign, FileText, MessageSquare, Package, ShoppingCart, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { hero } from '../../data/hero';
import { Section } from '../layout/Section';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { H1, P, Small, Text } from '../ui/Typography';

const iconMap = {
  Check,
  DollarSign,
  Clock,
  Users,
  MessageSquare,
  ShoppingCart,
  Star,
  Bell,
  Package,
  FileText,
  TrendingUp,
  Zap,
};

const CAROUSEL_INTERVAL = 3000;
const CLOCK_INTERVAL    = 1000;

// — Spring physics ——————————————————————————————————————————
// ζ ≈ 0.73 (underdamped) → subtle overshoot before settling
const SPRING_CARD  = { type: 'spring', stiffness: 300, damping: 24, mass: 0.9 };
// x settles faster than y → natural arc trajectory on card change
const SPRING_X     = { type: 'spring', stiffness: 240, damping: 22, mass: 0.7 };
const SPRING_GLOW  = { type: 'spring', stiffness: 80,  damping: 20 };
const SPRING_FLOAT = { type: 'spring', stiffness: 60,  damping: 14 };

// — Depth curve ——————————————————————————————————————————————
const Y_GAP_BASE     = 76;   // Base distance for 25% overlap at abs=1 (H_0=102, H_1=95.5)
const Y_DECAY        = 2.5;  // Perspective decay to maintain constant 25% overlap as cards scale down
const VISIBLE_RANGE  = 2.8;  // radius of visibility in card-units

// — Visual weight ————————————————————————————————————————————
const SCALE_FLOOR     = 0.82; // minimum scale at VISIBLE_RANGE
const BLUR_COEFF      = 0.52; // blur = BLUR_COEFF * abs²  (cap 3px)
const BRIGHTNESS_LOSS = 0.16; // brightness reduction per position unit

// — Glow ————————————————————————————————————————————————————
const GLOW_MIN = 0.07; // opacity floor   — breathes, never shouts
const GLOW_MAX = 0.09; // opacity ceiling

// — Active card microinteraction —————————————————————————————
const ACTIVE_Y     = 1;     // px amplitude    (0 → -1 → 0)
const ACTIVE_SCALE = 1.003; // scale ceiling   (1 → 1.003 → 1)
const ACTIVE_ROT   = 0.15;  // deg amplitude   (±0.15°)
const ACTIVE_DUR   = 3.5;   // seconds per cycle

// — Container drift ——————————————————————————————————————————
const CONTAINER_DUR = 6; // seconds per cycle

const getRelativePosition = (index, currentIndex, total) => {
  const diff = index - currentIndex;
  const half = Math.floor(total / 2);

  if (diff > half) return diff - total;
  if (diff < -half) return diff + total;
  return diff;
};

/**
 * Pure math function — no conditional branches.
 * Every property derives continuously from a single `relative` value.
 * Changing `relative` by Δ produces a proportional Δ in every visual property.
 */
const getCardStyle = (relative) => {
  const abs  = Math.abs(relative);
  const sign = relative === 0 ? 0 : Math.sign(relative);

  // Vertical: quadratic decay to maintain constant ~25% overlap in perspective projection
  const y = sign * (Y_GAP_BASE * abs - Y_DECAY * abs * abs);

  // Scale: continuous from 1.0 at abs=0 to SCALE_FLOOR at abs=VISIBLE_RANGE
  const t     = Math.min(abs / VISIBLE_RANGE, 1);
  const scale = 1 - (1 - SCALE_FLOOR) * t;

  // Opacity: soft power-curve fade — no abrupt vanishing
  const opacity = Math.max(0, 1 - Math.pow(abs / VISIBLE_RANGE, 1.6));

  // Blur: quadratic growth — only whispers distance, never distracts (cap 3px)
  const blur = Math.min(BLUR_COEFF * abs * abs, 3);

  // Brightness: linear reduction — active card is always the brightest
  const brightness = Math.max(0.62, 1 - BRIGHTNESS_LOSS * abs);

  // Rotation: barely perceptible — depth, not drama
  const rotateX = sign * Math.min(abs * 0.8, 1.5);  // max ±1.5°
  const rotateZ = sign * Math.min(abs * 0.2, 0.4);  // max ±0.4°

  // Horizontal drift: f(abs) = abs*(abs+3)/2 → sequence 0, 2, 5, 9, 14…
  // Quadratic curve — Apple Wallet fan effect without any if-branch
  const x = sign * (abs * (abs + 3)) / 2;

  // zIndex: continuous descent so no two cards ever share a level
  const zIndex = Math.round(100 - abs * 18);

  return { y, x, scale, opacity, blur, brightness, rotateX, rotateZ, zIndex };
};

// Pure helper — module-level so it's never recreated on render
const formatTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Chronological offsets (in minutes) for each notification relative to the active card
const TIME_OFFSETS = [0, 2, 7, 15, 24, 42, 58, 75, 110, 150, 210, 320];

// Pure helper to subtract minutes from an "HH:MM" time string, handling day wraparound
const getPastTime = (currentTimeString, offsetMinutes) => {
  if (offsetMinutes === 0) return currentTimeString;
  const [hours, minutes] = currentTimeString.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes - offsetMinutes;
  if (totalMinutes < 0) {
    totalMinutes = (totalMinutes % 1440) + 1440;
  }
  const finalHours = Math.floor((totalMinutes % 1440) / 60);
  const finalMinutes = totalMinutes % 60;
  return `${finalHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
};

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime]   = useState(formatTime); // lazy init

  // Stable list — shape never changes at runtime
  const activities = useMemo(
    () => hero.activities.map((a) => ({ ...a, icon: iconMap[a.icon] })),
    [],
  );

  // Carousel tick — decoupled from clock
  useEffect(() => {
    const id = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % activities.length),
      CAROUSEL_INTERVAL,
    );
    return () => clearInterval(id);
  }, [activities.length]);

  // Clock tick — independent interval, does not cause carousel re-evaluation
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(formatTime()), CLOCK_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <Section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary-50 text-primary-600"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary-400"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-primary-500"></span>
              </span>
              {hero.badge.text}
            </motion.div>

            <H1 className="mb-6 leading-tight">{hero.heading}</H1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <P className="max-w-lg mb-8 text-xl">{hero.description}</P>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-start gap-4"
            >
              <Button>
                {hero.buttons.primary}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline">{hero.buttons.secondary}</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-8 mt-12 text-sm text-text-secondary-light dark:text-text-secondary-dark"
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
            <div className="relative z-10 h-[500px] flex items-center justify-center overflow-hidden">
              <motion.div
                className="relative w-full max-w-sm"
                style={{ perspective: '1000px' }}
                animate={{ y: [0, -1, 0], rotateX: [0, 0.15, 0] }}
                transition={{
                  y:       { duration: CONTAINER_DUR, repeat: Infinity, ease: 'easeInOut' },
                  rotateX: { duration: CONTAINER_DUR, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {activities.map((activity, index) => {
                  const relative = getRelativePosition(
                    index,
                    currentIndex,
                    activities.length,
                  );
                  const style = getCardStyle(relative);
                  const isActive = relative === 0;
                  
                  // Compute chronological timestamp relative to the active card's timeline
                  const stepsPast = (currentIndex - index + activities.length) % activities.length;
                  const offset = TIME_OFFSETS[stepsPast] || 0;
                  const cardTime = getPastTime(currentTime, offset);

                  return (
                    <motion.div
                      key={index}
                      animate={{
                        y:       style.y,
                        x:       style.x,
                        scale:   style.scale,
                        opacity: style.opacity,
                        filter:  `blur(${style.blur}px) brightness(${style.brightness})`,
                        zIndex:  style.zIndex,
                        rotateX: style.rotateX,
                        rotateZ: style.rotateZ,
                      }}
                      transition={{
                        // x uses a lighter spring → settles ahead of y → arc trajectory
                        x:       SPRING_X,
                        y:       SPRING_CARD,
                        scale:   SPRING_CARD,
                        opacity: SPRING_CARD,
                        rotateX: SPRING_CARD,
                        rotateZ: SPRING_CARD,
                        filter:  SPRING_CARD,
                      }}
                      style={{
                        pointerEvents: style.opacity > 0.05 ? 'auto' : 'none',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '50%',
                        marginTop: '-50px', // Centers cards vertically relative to the y=0 line
                      }}
                    >
                      {/* Glow — always mounted; breathes when active, silent when not */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl -z-10"
                        style={{
                          background:
                            'radial-gradient(ellipse at 50% 60%, var(--color-primary-400, #818cf8), var(--color-secondary-400, #a78bfa))',
                          filter: 'blur(28px)',
                        }}
                        animate={
                          isActive
                            ? {
                                opacity: [GLOW_MIN, GLOW_MAX, GLOW_MIN],
                                scale:   [1, 1.02, 1],
                              }
                            : { opacity: 0, scale: 0.9 }
                        }
                        transition={
                          isActive
                            ? {
                                opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                                scale:   { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                              }
                            : SPRING_GLOW
                        }
                      />

                      {/* Float — ultra-subtle life signal on the active card */}
                      <motion.div
                        animate={
                          isActive
                            ? {
                                y:       [0, -ACTIVE_Y, 0],
                                scale:   [1, ACTIVE_SCALE, 1],
                                rotateZ: [0, ACTIVE_ROT, 0, -ACTIVE_ROT, 0],
                              }
                            : { y: 0, scale: 1, rotateZ: 0 }
                        }
                        transition={
                          isActive
                            ? {
                                y:       { duration: ACTIVE_DUR,       repeat: Infinity, ease: 'easeInOut' },
                                scale:   { duration: ACTIVE_DUR * 1.2, repeat: Infinity, ease: 'easeInOut' },
                                rotateZ: { duration: ACTIVE_DUR * 1.5, repeat: Infinity, ease: 'easeInOut' },
                              }
                            : SPRING_FLOAT
                        }
                      >
                        <Card
                          className={`p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 ${
                            isActive ? 'shadow-md' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex-shrink-0 p-3 rounded-xl bg-success-50">
                              <activity.icon className="w-6 h-6 text-success-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Text className="text-base font-semibold sm:text-lg">
                                {activity.text}
                              </Text>
                            </div>
                          </div>
                          <div className="flex justify-end pt-2 border-t border-gray-200 dark:border-gray-700">
                            <Small className="text-gray-500 dark:text-gray-400">
                              {cardTime}
                            </Small>
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 rounded-3xl blur-3xl opacity-30 -z-10" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
