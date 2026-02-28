export function getScoreColor(score: number): string {
  if (score < 40) return 'var(--score-low)'
  if (score < 70) return 'var(--score-mid)'
  return 'var(--score-high)'
}
