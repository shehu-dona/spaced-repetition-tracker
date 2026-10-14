export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// parseDate splits the string "2027-07-19" into [2027, 7, 19] and builds a date object at midnight UTC.
export function parseDate(dateString) {
  // Takes the date picker string, like "2027-07-19"
  // Splits the text at each "-" ==> ["2027", "07", "19"]
  const splitDate = dateString.split("-");
  // Turns each string into a number ==> [2027, 7, 19]
  const dateNumber = splitDate.map((element) => {
    return Number(element);
  });
  // Destructuring: year = 2027, month = 7, day = 19
  const [year, month, day] = dateNumber;
  // Makes a UTC date; month - 1 because JavaScript months start at 0 (July = 6)
  return new Date(Date.UTC(year, month - 1, day));
}

// Takes a Date and a number of days to add
export function addDays(date, days) {
  // Makes a copy, so the original date never changes e.g ==> 2027-07-19T00:00:00.000Z
  const newDate = new Date(date);
  // Reads the day (19), adds the days (+7), writes it back (26).
  newDate.setUTCDate(newDate.getUTCDate() + days);
  // Gives back the new date ==> 2027-07-26T00:00:00.000Z
  return newDate;
}

// Takes a Date and a number of months to add
export function addMonths(date, months) {
  // Makes a copy, so the original date never changes
  const newDate = new Date(date);
  // Reads the month (July = 6), adds the months (+1 = 7), writes it back
  // (August); if it goes past December, JavaScript moves to the next year
  newDate.setUTCMonth(newDate.getUTCMonth() + months);
  // Gives back the new date
  return newDate;
}

// Returns the 5 revision dates (1 week, 1, 3, 6 months, 1 year) as "YYYY-MM-DD" text.
export function calculateRevisionDates(dateString) {
  const revisionDates = [];
  const start = parseDate(dateString);
  const oneWeek = addDays(start, 7);
  revisionDates.push(oneWeek);
  const oneMonth = addMonths(start, 1);
  revisionDates.push(oneMonth);
  const threeMonths = addMonths(start, 3);
  revisionDates.push(threeMonths);
  const sixMonths = addMonths(start, 6);
  revisionDates.push(sixMonths);
  const oneYear = addMonths(start, 12);
  revisionDates.push(oneYear);
  const stringRevisionDates = revisionDates.map((date) => {
    return date.toISOString().slice(0, 10);
  });
  return stringRevisionDates;
}

// Returns today's date as "YYYY-MM-DD", using the user's local calendar
export function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const stringDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return stringDate;
}
