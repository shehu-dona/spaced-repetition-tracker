import { getUserIds, parseDate, calculateRevisionDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("parseDate turns string into UTC date", () => {
  assert.equal(
    // .toISOString() turns the Date object into string, so we compare string with string
    parseDate("2027-07-19").toISOString(),
    "2027-07-19T00:00:00.000Z",
  );
});

test("calculateRevisionDates gives the 5 rubric dates for 19 July 2027", () => {
  assert.deepEqual(
    // compares two arrays item by item(deepEqual)
    calculateRevisionDates("2027-07-19"),
    ["2027-07-26", "2027-08-19", "2027-10-19", "2028-01-19", "2028-07-19"],
  );
});

test("calculateRevisionDates works across the October clock change", () => {
  assert.deepEqual(calculateRevisionDates("2027-10-05"), [
    "2027-10-12",
    "2027-11-05",
    "2028-01-05",
    "2028-04-05",
    "2028-10-05",
  ]);
});
