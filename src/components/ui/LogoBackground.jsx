/**
 * @file LogoBackground.jsx
 * @description Renders the Kairós company logo with ambient radial glows and modern styling.
 * 
 * 💡 AI ASSISTANT / DEVELOPER GUIDELINES:
 * 1. DESIGN AESTHETICS:
 *    - The logo has high-vibrancy electric blue, purple, and lilac colors.
 *    - To preserve these electric tones, DO NOT apply filters like `mix-blend-luminosity`.
 *    - Opacity is balanced for light/dark modes (`opacity-[0.45]` / `opacity-[0.3]`) to act as a watermark.
 * 2. GLOW EFFECTS:
 *    - Radial gradient backdrop projects vibrant electric colors behind the logo.
 *    - The img uses dual `drop-shadow` filters in CSS to create crisp, high-definition neon halos.
 * 3. POSITIONING:
 *    - Centered inside a `flex items-center justify-center` container.
 *    - Rotated clockwise by `4.5deg` to follow Stripe/Linear-style organic tilt design patterns.
 */

export function LogoBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Glow backdrop behind the logo */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[90px] opacity-[0.26] dark:opacity-[0.18]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(168, 85, 247, 0.35) 60%, transparent 100%)'
        }}
      />
      <img
        src="/kairos-no-bg-simple-icon.png"
        alt="Kairós Logo"
        className="relative w-[440px] h-[440px] opacity-[0.45] dark:opacity-[0.3] select-none pointer-events-none rotate-[4.5deg]"
        style={{
          filter: 'drop-shadow(0 0 35px rgba(59, 130, 246, 0.45)) drop-shadow(0 0 70px rgba(168, 85, 247, 0.35))'
        }}
      />
    </div>
  )
}
