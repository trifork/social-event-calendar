import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/Calendar";
import {
  filterByQuarterPredicate,
  filterByYearPredicate,
} from "~/services/calendar-filtering";
import { getICSCalendarLink } from "~/services/calendar-ics-link";
import { getCalendarEvents } from "~/services/calendar-parser";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const events = await getCalendarEvents();
  const year = Number(params.year);
  if (!year) {
    throw new Error("Invalid year");
  }
  const quarter = Number(params.quarter);
  if (!quarter) {
    throw new Error("Invalid quarter");
  }

  const filtered = events
    .filter(filterByYearPredicate(year))
    .filter(filterByQuarterPredicate(quarter));
  return json({
    title: `Sociale Events i Q${quarter}`,
    subtitle: `Eventkalender ${year}`,
    events: filtered,
    link: getICSCalendarLink(),
  });
};
export default function QuarterlyCalendar() {
  const { events, title, subtitle, link } = useLoaderData<typeof loader>();
  return (
    <Calendar
      data={events}
      title={title}
      subtitle={subtitle}
      calendarLink={link}
    />
  );
}
