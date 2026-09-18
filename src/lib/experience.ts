// Whole months between two dates, counting a month only once its day-of-month has been reached.
export function monthsBetween(start: Date, end: Date = new Date()) {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

// Years and months as "Y.M" (3 years 8 months -> "3.8"). Past .9 the months would read as
// "3.10" / "3.11", so those round up to the next year instead: 3 years 10 months -> "~4".
export function formatYearsMonths(totalMonths: number) {
  const months = Math.round(totalMonths);
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return remainder >= 10 ? `~${years + 1}` : `${years}.${remainder}`;
}
