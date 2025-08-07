function daysBetweenDates(date1, date2) {
  const oneDay = 1000 * 60 * 60 * 24; // ms in one day

  // Convert both dates to Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Get time difference in milliseconds
  const diffInTime = Math.abs(d2 - d1);

  // Convert back to days
  const diffInDays = Math.floor(diffInTime / oneDay);

  return diffInDays;
}

function getDateDifference(startDate, endDate) {
  // Convert to date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Swap dates if start is after end
  if (start > end) [startDate, endDate] = [endDate, startDate];

  const startCopy = new Date(startDate);
  const endCopy = new Date(endDate);

  let years = endCopy.getFullYear() - startCopy.getFullYear();
  let months = endCopy.getMonth() - startCopy.getMonth();
  let days = endCopy.getDate() - startCopy.getDate();

  if (days < 0) {
    // Go back one month
    months--;
    // Get number of days in previous month
    const prevMonth = new Date(endCopy.getFullYear(), endCopy.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days };
}

console.log(daysBetweenDates("2025-08-07", "2025-01-01")); // Output: 218

const diff = getDateDifference("2020-01-15", "2025-08-07");
console.log(`${diff.years} years, ${diff.months} months, ${diff.days} days`);
// Output: 5 years, 6 months, 23 days
