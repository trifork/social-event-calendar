export const getICSCalendarLink = () => {
  // We could support multiple calendars by checking the url and finding a "name", e.g. "AAL"
  // and look for a PUBLIC_ICS_CALENDAR_AAL environment variable. That way we could support
  // many different trifork offices deployed from the same codebase.
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

export const fetchCalendar = async () => {
  return fetchCalendarFromLink();
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
