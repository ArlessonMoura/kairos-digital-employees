/**
 * @file GridPattern.jsx
 * @description Renders a subtle quadriculated overlay pattern from an inline SVG.
 * 
 * 💡 AI ASSISTANT / DEVELOPER GUIDELINES:
 * 1. LAYOUT CONSTRAINTS:
 *    - The parent section MUST have `relative` to contain the grid pattern.
 *    - It uses `pointer-events-none` so it will never block user clicks or interactions.
 * 2. VISIBILITY & STYLING:
 *    - Uses `opacity-30` as default. You can change this opacity class or use Tailwind overrides.
 *    - Stretches dynamically using `absolute inset-0`.
 * 3. REUSE:
 *    - Safe to insert directly into any section or page component to provide a technical background.
 */

export function GridPattern() {
  return (
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQwIDBIMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
  )
}
