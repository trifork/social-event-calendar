import { compareAsc, endOfDay, subDays } from "date-fns";
import ical from "ical";
import { fetchCalendar } from "./calendar-ics-link";

type Epoch = number;
export interface CalendarEvent {
  id: string;
  title: string;
  start: Epoch;
  end: Epoch;
}

export const getCalendarEvents = async (): Promise<CalendarEvent[]> => {
  const ics = await fetchCalendar();
  const calendar = ical.parseICS(ics);
  const events = extractCalendarEvents(calendar);

  events.sort((a, b) => compareAsc(a.start, b.start));
  return events;
};

const extractCalendarEvents = (
  calendar: ical.FullCalendar
): CalendarEvent[] => {
  return Object.values(calendar)
    .filter(
      (component) =>
        component.type === "VEVENT" &&
        component.start &&
        component.summary &&
        component.end
    )
    .flatMap((component) =>
      component.rrule ? mapRecurringEvent(component) : mapEvent(component)
    );
};

const mapEvent = (event: ical.CalendarComponent): CalendarEvent => {
  const start = event.start!;
  let end = event.end!;

  // ical parser handles all-day events by setting the dateOnly property to true and setting the time to 00:00:00 the following day.
  if (
    "dateOnly" in start &&
    "dateOnly" in end &&
    start.dateOnly &&
    end.dateOnly
  ) {
    end = endOfDay(subDays(end, 1));
  }

  return {
    id: event.uid!,
    title: event.summary!,
    start: start.getTime(),
    end: end.getTime(),
  };
};

const mapRecurringEvent = (event: ical.CalendarComponent): CalendarEvent[] => {
  return []; // TODO
};
