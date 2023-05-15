import type { HeadersFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/Calendar";
import {
  filterByUpcomingPredicate,
  filterByYearPredicate,
} from "~/services/calendar-filtering";
import { getCacheTime, getICSCalendarLink } from "~/services/calendar-ics-link";
import { getCalendarEvents } from "~/services/calendar-parser";

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl = loaderHeaders.get("Cache-Control") ?? "";

  return { "Cache-Control": cacheControl };
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const events = await getCalendarEvents();
  const url = new URL(request.url);
  const year = Number(url.searchParams.get("year")) || new Date().getFullYear();
  const months = Number(url.searchParams.get("upcomming")) || 3;
  const title = url.searchParams.get("title") || "Sociale Events";

  const filtered = events
    .filter(filterByYearPredicate(year))
    .filter(filterByUpcomingPredicate(months));

  return json(
    {
      title,
      subtitle: `Eventkalender næste ${months} mdr.`,
      events: filtered,
      link: getICSCalendarLink(),
    },
    { headers: { "Cache-Control": `public, max-age=${getCacheTime()}` } }
  );
};
export default function YearlyCalendar() {
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
