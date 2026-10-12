export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}
//parseDate splits the string "2027-07-19" into [2027, 7, 19] and builds a date object at midnight UTC.
export function parseDate(dateString) {
  // takes the date picker string, like "2027-07-19"
  const splitDate = dateString.split("-"); // splits the text at each "-" ==> ["2027", "07", "19"]
  const dateNumber = splitDate.map((element) => {
    return Number(element); // turns the string into a number ==> [2027, 7, 19]
  });
  const [year, month, day] = dateNumber; // destructuring: year = 2027, month = 7, day = 19
  return new Date(Date.UTC(year, month - 1, day)); // makes a UTC date ; month - 1 because JavaScript months start at 0 (July = 6)
}

export function addDays(date, days) {
  // takes a Date and a number of days to add
  const newDate = new Date(date); // makes a copy, so the original date never changes ==> 2027-07-19T00:00:00.000Z
  newDate.setUTCDate(newDate.getUTCDate() + days); // reads the day (19), adds the days (+7), writes it back (26)
  return newDate; // gives back the new date ==> 2027-07-26T00:00:00.000Z
}

export function addMonths(date, months) {
  // takes a Date and a number of months to add
  const newDate = new Date(date); // makes a copy, so the original date never changes
  newDate.setUTCMonth(newDate.getUTCMonth() + months); // reads the month (July = 6), adds the months (+1 = 7), writes it back (August); if it goes past December, JavaScript moves to the next year
  return newDate; // gives back the new date
}

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
