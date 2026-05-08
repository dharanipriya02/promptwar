/**
 * Helper to create a month data object for destinations
 */
export const createMonthData = (month, rating, temp, crowd, note) => ({
  month,
  rating,
  temp,
  crowd,
  note
});

export const VISITING_STATUS = {
  BEST: 'best',
  SHOULDER: 'shoulder',
  AVOID: 'avoid'
};
