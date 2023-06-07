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
      ${1}   | ${"2021-02-01"} | ${false}         | ${"event starts in the next month"}
      ${1}   | ${"2021-02-28"} | ${false}         | ${"event starts in the next month"}
      ${3}   | ${"2021-01-01"} | ${true}          | ${"event starts within 3 months"}
      ${3}   | ${"2021-03-30"} | ${true}          | ${"event starts within 3 months"}
      ${3}   | ${"2021-04-01"} | ${false}         | ${"event does not start within 3 months"}
      ${3}   | ${"2020-12-25"} | ${true}          | ${"include events one week ago"}
      ${3}   | ${"2020-12-24"} | ${false}         | ${"includes events one week ago, but this is 8 days ago"}
    `(
      "should return $expectedIncluded when filtering upcomming $months months and event starts on $eventStart, beacause $reason",
      ({ months, eventStart, expectedIncluded }) => {
        vi.setSystemTime(new Date("2021-01-01"));
        const event: CalendarEvent = {
          start: new Date(eventStart).getTime(),
          end: new Date(eventStart + 1000).getTime(),
          title: "Test event",
          id: "id",
        };
        const filter = filterByUpcomingPredicate(months);
        expect(filter(event)).toBe(expectedIncluded);
      }
    );

    it.todo("should remove events starting in more than 3 months");
  });
});
