import type { HeadersFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/Calendar";
import { filterByUpcomingPredicate } from "~/services/calendar-filtering";
import { getCacheTime, getICSCalendarLink } from "~/services/calendar-ics-link";
import { getCalendarEvents } from "~/services/calendar-parser";

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl = loaderHeaders.get("Cache-Control") ?? "";

  return { "Cache-Control": cacheControl };
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const events = await getCalendarEvents();
  const url = new URL(request.url);

  const upcomingMonths = Number(url.searchParams.get("upcoming")) || 3;
  const title = url.searchParams.get("title") || "Sociale Events";

  const filtered = events.filter(filterByUpcomingPredicate(upcomingMonths));

  return json(
    {
      title,
      subtitle: `Eventkalender næste ${upcomingMonths} mdr.`,
      events: filtered,
      link: getICSCalendarLink(),
    },
    { headers: { "Cache-Control": `public, max-age=${getCacheTime()}` } }
  );
};
export default function DefaultCalendar() {
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
