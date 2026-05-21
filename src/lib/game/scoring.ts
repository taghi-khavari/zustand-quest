export function calculateStars({
  attempts,
  usedHints,
  timeMs
}: {
  attempts: number;
  usedHints: number;
  timeMs: number;
}) {
  if (usedHints === 0 && attempts <= 2 && timeMs <= 8 * 60 * 1000) return 3;
  if (usedHints <= 1 || attempts <= 4) return 2;
  return 1;
}
