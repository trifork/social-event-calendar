import { format } from "date-fns";
import { da } from "date-fns/locale";

type DateArg = Parameters<typeof format>[0];

export const formatWeekday = (date: DateArg): string =>
  format(date, "EEEEE", formatOptions);

export const formatDayOfMonth = (date: DateArg): string =>
  format(date, "dd", formatOptions);

export const formatMonth = (date: DateArg): string =>
  format(date, "MMM", formatOptions);

const formatOptions: Parameters<typeof format>[2] = {
  locale: da,
  weekStartsOn: 1,
};
