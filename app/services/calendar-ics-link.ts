export const getICSCalendarLink = () => {
  const link = process.env.PUBLIC_ICS_CALENDAR;
  if (!link) {
    throw new Error("Missing PUBLIC_ICS_CALENDAR environment variable");
  }
  return link;
};

export const fetchCalendar = async () => {
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
