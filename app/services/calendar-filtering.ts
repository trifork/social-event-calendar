import { differenceInMonths, getMonth, getQuarter, getYear } from "date-fns";
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
  () =>
  (event: CalendarEvent): boolean =>
    differenceInMonths(event.start, new Date()) <= 3;
