import { addMonths, getMonth, getQuarter, getYear, subDays } from "date-fns";
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
    const includeFrom = subDays(Date.now(), 3).getTime();

    if (event.start < includeFrom) {
      return false;
    }
    const includeTo = addMonths(Date.now(), months).getTime();
    if (event.start > includeTo) {
      return false;
    }
    return true;
  };
