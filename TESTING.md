# Testing

This file explains how each rubric point was tested.

Manual tests were done on the live website, after clearing storage with `localStorage.clear()` in the browser console and refreshing the page.

## The website must contain a drop-down which lists exactly 5 users

Manual testing: opened the drop-down and checked it lists User 1, User 2, User 3, User 4 and User 5.

## No user is selected on page load

Manual testing: refreshed the page and checked the drop-down shows the placeholder "Select a User", and no agenda is shown.

## All of the users must have no agenda when first loading

Manual testing: after clearing storage, selected each user (1 to 5) and checked each one shows "This user has no agenda yet."

## Data should be persisted across page loads

Manual testing: added a topic for User 1, refreshed the page, selected User 1 again, and checked the same revision dates are still shown.

## Selecting a user must load and display the relevant user's agenda

Manual testing: added topics for Users 1, 2 and 3, then switched between the users and checked each one shows only their own topics and dates.

## If there is no agenda for the selected user, a message is displayed

Manual testing: selected User 4 and User 5, who have no topics, and checked the message "This user has no agenda yet." is shown.

## The form has a topic name input, a date picker and a submit button

Manual testing: checked the form shows a "Topic name" text input, a "Pick a date" date picker (the browser's built-in date picker) and an "Add Topic" button, each with a label.

## The date picker must default to today's date on first page load

Manual testing: refreshed the page and checked the date picker shows today's date.

## The form validates that the topic name and the date have been set

Manual testing:

- Submitted with an empty topic: the browser stops the form and asks to fill in the field (`required`).
- Submitted with only spaces in the topic: the message "Please enter a topic." is shown.
- Cleared the date and submitted: the browser stops the form and asks to fill in the field (`required`).
- Submitted with no user selected: the message "Please select a user first." is shown.

## The form can be submitted with the keyboard

Manual testing: without using the mouse, used Tab to move between the drop-down, the topic input, the date picker and the button, used the arrow keys to choose a user, typed a topic and pressed Enter. The topic was added.

## Submitting the form adds a topic for the relevant user only

Manual testing: added a topic for User 1, then checked Users 2, 4 and 5 did not get that topic.

## The revision dates are 1 week, 1 month, 3 months, 6 months and 1 year after the selected date

Unit tests in `common.test.mjs`:

- `calculateRevisionDates("2027-07-19")` returns 2027-07-26, 2027-08-19, 2027-10-19, 2028-01-19 and 2028-07-19 (the rubric dates for "Functions in JS").
- `calculateRevisionDates("2027-10-05")` returns 2027-10-12, 2027-11-05, 2028-01-05, 2028-04-05 and 2028-10-05 (the rubric dates for "Functions in Python"). These dates cross the October clock change, so this test checks daylight saving time cannot move a date by one day.
- `parseDate("2027-07-19")` returns 19 July 2027 at midnight UTC.

Run them with `npm test`.

Manual testing: followed all the rubric steps for Users 1, 2 and 3, and checked every date matches exactly.

## Revision dates are shown in chronological order, and past dates are not shown

Manual testing:

- User 2: added "Variables in Python" (5 November) first, then "Functions in Python" (5 October). Checked all 10 dates are shown mixed together, soonest first.
- User 3: added "Codewars" with the date exactly one month ago. Checked the 1-week date (in the past) is not shown, and today's date is shown first.

## After creating a new topic, the agenda for the current user is shown, including the new topic

Manual testing: after each submit, checked the agenda updates straight away and includes the new topic, and the form stays on the page.

## The website must score 100% for accessibility in Lighthouse

Lighthouse (Snapshot mode, Desktop, Accessibility) on the live website, for these views:

- no user selected
- a user with an agenda (User 2)
- a user with no agenda (User 4)

All scored 100%.

## Unit tests must be written for at least one non-trivial function

Unit tests in `common.test.mjs` for `calculateRevisionDates` and `parseDate` (see above). Run with `npm test`.

## The project must not contain any dead code

Manual check: searched all files for `console.log`, commented-out code and unused functions. Removed the placeholder comments from the scaffolding. Every function is used, and the only CSS rule (`label`) is used by the labels on the page.
