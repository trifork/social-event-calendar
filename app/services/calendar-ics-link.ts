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
  const text = await response.text();
  return text;
};
