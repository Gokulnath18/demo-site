/**
 * TypeScript mirror of `src/styles/tokens.css`.
 *
 * Use this when a component needs a token as a real JS value rather than a
 * CSS custom property — e.g. passing a numeric duration into Motion, or
 * doing layout math in a chart. For anything that can be expressed in CSS
 * (colors, static spacing, radii applied via className/style), prefer the
 * CSS custom properties directly so theme switching keeps working for free.
 *
 * MANUAL MIRROR: these values must match tokens.css exactly. If you change
 * one file, update the other in the same commit.
 */

export const color = {
  neutral: {
    0: "#ffffff",
    50: "#f7f8fa",
    100: "#eef0f3",
    200: "#dde1e6",
    300: "#c2c8d1",
    400: "#9aa2af",
    500: "#717a8a",
    600: "#545c6b",
    700: "#3d4351",
    800: "#282c37",
    900: "#181b23",
    950: "#0d0f14",
  },
  accent: {
    50: "#f1f0ff",
    100: "#e2e0ff",
    200: "#c3bfff",
    300: "#9d94ff",
    400: "#7a6cff",
    500: "#5b4cf0",
    600: "#4636d1",
    700: "#3529a8",
    800: "#262080",
    900: "#191557",
  },
  teal: {
    300: "#7ee8d6",
    400: "#45d3ba",
    500: "#1fb8a0",
    600: "#159683",
  },
  success: "#2fb673",
  warning: "#e0a52c",
  danger: "#e2513f",
} as const;

export const fontFamily = {
  sans: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace',
} as const;

/** Type scale — 1.25 (major third) ratio, base 16px. Values in rem. */
export const fontSize = {
  xs: 0.75,
  sm: 0.875,
  md: 1,
  lg: 1.25,
  xl: 1.5625,
  "2xl": 1.953,
  "3xl": 2.441,
  "4xl": 3.052,
} as const;

export const lineHeight = {
  tight: 1.15,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Spacing scale — 4px base unit. Values in rem. */
export const space = {
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 0.75,
  4: 1,
  5: 1.5,
  6: 2,
  7: 2.5,
  8: 3,
  9: 4,
  10: 5,
  11: 6,
  12: 8,
} as const;

/** Radius scale. Values in rem, except `full`. */
export const radius = {
  none: 0,
  sm: 0.25,
  md: 0.5,
  lg: 0.75,
  xl: 1,
  "2xl": 1.5,
  full: "9999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(13, 15, 20, 0.06)",
  md: "0 4px 8px rgba(13, 15, 20, 0.08), 0 1px 2px rgba(13, 15, 20, 0.06)",
  lg: "0 12px 24px rgba(13, 15, 20, 0.1), 0 4px 8px rgba(13, 15, 20, 0.06)",
  xl: "0 24px 48px rgba(13, 15, 20, 0.14), 0 8px 16px rgba(13, 15, 20, 0.08)",
} as const;

/** Durations in milliseconds — pass directly into Motion's `duration` (after /1000) or `transition` configs. */
export const duration = {
  instant: 100,
  fast: 150,
  base: 250,
  slow: 400,
  slower: 600,
} as const;

/** Cubic-bezier easing curves, ready for Motion's `ease` option. */
export const easing = {
  standard: [0.4, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
  emphasized: [0.2, 0, 0, 1],
} as const;

export const tokens = {
  color,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space,
  radius,
  shadow,
  duration,
  easing,
} as const;

export default tokens;
