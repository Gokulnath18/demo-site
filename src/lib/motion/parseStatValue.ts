export interface ParsedStatValue {
  /** Leading sign, kept static (not animated) — e.g. "+" or "-". */
  prefix: string;
  /** The magnitude to count up from 0, decimal point included. */
  target: number;
  /** Decimal places to preserve while counting, matched to the input. */
  decimals: number;
  /** Trailing unit/label text, kept static — e.g. "M", "K+", " hrs". */
  suffix: string;
}

const STAT_VALUE_PATTERN = /^([+-]?)(\d+(?:\.\d+)?)(.*)$/;

/**
 * Splits a pre-formatted stat string (e.g. "2.4M", "150K+", "4.2 hrs",
 * "+18%") into the pieces `AnimatedNumber` needs: a numeric magnitude to
 * count up from 0, plus the sign/suffix text either side of it, which stay
 * static for the whole animation. Returns `null` for a string with no
 * leading numeric portion (nothing to animate — the caller falls back to
 * rendering it as plain static text).
 */
export function parseStatValue(raw: string): ParsedStatValue | null {
  const match = STAT_VALUE_PATTERN.exec(raw.trim());
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const decimalIndex = digits.indexOf(".");
  const decimals = decimalIndex === -1 ? 0 : digits.length - decimalIndex - 1;

  return {
    prefix,
    target: Number(digits),
    decimals,
    suffix,
  };
}
