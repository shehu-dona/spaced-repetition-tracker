# Spaced Repetition Tracker

Spaced repetition is a way of learning where you revise a topic again and again, with longer gaps each time. This app helps you track your topics and shows you which topic to revise next.

## Live website

https://shehu-dona.github.io/spaced-repetition-tracker/

## Features

- Choose one of 5 users from a drop-down
- Add a topic and the date you learned it
- The app calculates 5 revision dates: 1 week, 1 month, 3 months, 6 months and 1 year later
- The agenda shows upcoming revision dates in order, soonest first
- Past revision dates are hidden
- Data is saved in the browser, so it stays after you reload the page

## How to run it locally

The page uses JavaScript modules, so it must be opened through a local server.

1. Clone the repo and go into the folder:

   ```
   git clone https://github.com/shehu-dona/spaced-repetition-tracker.git
   cd spaced-repetition-tracker
   ```

2. Start the server:

   ```
   npx http-server -c-1
   ```

3. Open the address it shows, for example `http://127.0.0.1:8080`.

4. To stop the server, press `Ctrl + C`.

## How to run the tests

```
npm test
```

The tests check the revision date calculation, using the dates from the project rubric. One test checks dates that cross the October clock change.

## How the dates are calculated

All revision dates are calculated in UTC. This means daylight saving time (when the clocks change in March and October) can never move a date by one day.
