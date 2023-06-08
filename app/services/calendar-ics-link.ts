import { differenceInMinutes } from "date-fns";

export const getICSCalendarLink = () => {
  const link = process.env.PUBLIC_ICS_CALENDAR;
  if (!link) {
    throw new Error("Missing PUBLIC_ICS_CALENDAR environment variable");
  }
  return link;
};
export const getCacheTime = () => {
  const fallbackTo30Min = 30 * 60;
  const time = Number(process.env.CALENDAR_CACHE_TIME_MIN) || fallbackTo30Min;
  return time;
};

let cachedCalendar: { data: Promise<string>; lastFetchedAt: Date } | null =
  null;

const isCacheValid = () =>
  cachedCalendar === null ||
  differenceInMinutes(cachedCalendar.lastFetchedAt, Date.now()) <
    getCacheTime();

export const fetchCalendar = async () => {
  if (cachedCalendar && isCacheValid()) {
    return cachedCalendar.data;
  }

  const data = fetchCalendarFromLink();
  cachedCalendar = { data, lastFetchedAt: new Date(Date.now()) };
  return await data;
};

const fetchCalendarFromLink = async () => {
  const link = getICSCalendarLink();
  const response = await fetch(link);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch calendar: ${response.status} ${response.statusText}`
    );
  }
  const text = await response.text();
  if (!text) {
    throw new Error("Empty response from calendar");
  }
  return text;
};
