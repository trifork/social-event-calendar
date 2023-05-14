import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/Calendar";
import {
  filterByQuarterPredicate,
  filterByYearPredicate,
} from "~/services/calendar-filtering";
import { getCalendarEvents } from "~/services/calendar-parser";

export const loader = async ({ params, request }: LoaderArgs) => {
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
  });
};
export default function QuarterlyCalendar() {
  const { events, title, subtitle } = useLoaderData<typeof loader>();
  return <Calendar data={events} title={title} subtitle={subtitle} />;
}
