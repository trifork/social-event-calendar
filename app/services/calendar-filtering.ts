import {
  differenceInMonths,
  getMonth,
  getQuarter,
  getYear,
  subWeeks,
} from "date-fns";
import type { CalendarEvent } from "./calendar-parser";

export const filterByYearPredicate =
  (year: number) =>
  (event: CalendarEvent): boolean =>
    getYear(event.start) === year;

export const filterByMonthPredicate =
  (month: number) =>
  (event: CalendarEvent): boolean =>
    getMonth(event.start) === month;

export const filterByQuarterPredicate =
  (quarter: number) =>
  (event: CalendarEvent): boolean =>
    getQuarter(event.start) === quarter;

export const filterByUpcomingPredicate =
  (months: number) =>
  (event: CalendarEvent): boolean => {
    const weekAgo = subWeeks(new Date(), 1);
    const diff = differenceInMonths(event.start, weekAgo);
    if (event.title.includes("Vinsmagning")) {
      console.log({ diff, event });
    }
    return diff >= 0 && diff <= months;
  };
