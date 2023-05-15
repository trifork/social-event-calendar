import { isSameDay } from "date-fns";
import type { CalendarEvent } from "./calendar-parser";
import { formatDayOfMonth, formatMonth } from "./date-formatters";

/*
 * We're using date-fns to work with dates.
 * Here's the documentation for the format paramenters: https://date-fns.org/v2.30.0/docs/format
 */

export const getMonth = ({ start }: CalendarEvent): string => {
  return formatMonth(start);
};

export const getDays = ({ start, end, ...rest }: CalendarEvent): string => {
  if (isSameDay(start, end)) {
    return formatDayOfMonth(start);
  }
  return `${formatDayOfMonth(start)} - ${formatDayOfMonth(end)}`;
};
