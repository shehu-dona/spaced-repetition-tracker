export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// Turns a date string like "2027-07-19" into a Date object at midnight UTC.
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
  const newDate = new Date(date); // makes a copy, so the original date never changes
  newDate.setUTCDate(newDate.getUTCDate() + days); // reads the day (19), adds the days (+7), writes it back (26)
  console.log(newDate);
  return newDate; // gives back the new date
}

export function addMonths(date, months) {
  // takes a Date and a number of months to add
  const newDate = new Date(date); // makes a copy, so the original date never changes
  newDate.setUTCMonth(newDate.getUTCMonth() + months); // reads the month (July = 6), adds the months (+1 = 7), writes it back (August); if it goes past December, JavaScript moves to the next year
  return newDate; // gives back the new date
}
