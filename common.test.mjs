import { getUserIds, parseDate } from "./common.mjs";
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
