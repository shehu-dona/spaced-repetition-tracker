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
