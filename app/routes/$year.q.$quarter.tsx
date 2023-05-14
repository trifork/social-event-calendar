import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/Calendar";
import { getCalendarEvents } from "~/services/calendar-parser";

export const loader = async ({ params, request }: LoaderArgs) => {
  const events = await getCalendarEvents();
  return json({
    title: `Sociale Events i Q${params.quarter}`,
    subtitle: `Eventkalender ${params.year}`,
    events,
  });
};
export default function QuarterlyCalendar() {
  const { events, title, subtitle } = useLoaderData<typeof loader>();
  return <Calendar data={events} title={title} subtitle={subtitle} />;
}
