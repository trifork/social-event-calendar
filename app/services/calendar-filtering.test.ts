import { vi } from "vitest";
import { filterByUpcomingPredicate } from "./calendar-filtering";
import type { CalendarEvent } from "./calendar-parser";

describe("Calendar Filtering", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  describe("Upcomming", () => {
    test.each`
      months | eventStart      | expectedIncluded | reason
      ${1}   | ${"2021-01-01"} | ${true}          | ${"event starts in the same month"}
      ${1}   | ${"2021-01-31"} | ${true}          | ${"event starts in the same month"}
      ${1}   | ${"2021-02-02"} | ${false}         | ${"event starts in more than 1 month"}
      ${1}   | ${"2021-02-28"} | ${false}         | ${"event starts in more than 1 month"}
      ${3}   | ${"2021-01-01"} | ${true}          | ${"event starts within 3 months"}
      ${3}   | ${"2021-03-30"} | ${true}          | ${"event starts within 3 months"}
      ${3}   | ${"2021-03-31"} | ${false}         | ${"event does not start within 3 months"}
      ${3}   | ${"2020-12-29"} | ${true}          | ${"include events 3 days ago"}
      ${3}   | ${"2020-12-28"} | ${false}         | ${"includes events 3 days ago, but this is 4 days ago"}
    `(
      "should return $expectedIncluded when filtering upcomming $months months and event starts on $eventStart, beacause $reason",
      ({ months, eventStart, expectedIncluded }) => {
        vi.setSystemTime(new Date("2021-01-01"));
        const event: CalendarEvent = {
          start: new Date(eventStart).getTime(),
          end: new Date(eventStart).getTime() + 1000,
          title: "Test event",
          id: "id",
        };
        const filter = filterByUpcomingPredicate(Number(months));
        expect(filter(event)).toBe(expectedIncluded);
      }
    );
  });
});
