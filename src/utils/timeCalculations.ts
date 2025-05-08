/**
 * Calculate day of year from a date
 */
export function calculateDayOfYear(date: Date): number {
  return Math.ceil(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  )
}

/**
 * Calculate week number from a date
 */
export function calculateWeekNumber(date: Date): number {
  return Math.ceil(
    (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 604800000,
  )
}
