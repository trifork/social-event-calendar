import { getDays, getMonth } from "~/services/calendar-event";
import type { CalendarEvent } from "~/services/calendar-parser";
import { WeekDayIndicator } from "./WeekDayIndicator";

interface Props {
  event: CalendarEvent;
}
export const CalendarEventRow = ({ event }: Props) => {
  return (
    <tr
      key={event.id}
      className="border-b border-neutral-200 last-of-type:border-none h-20 break-inside-avoid-page"
    >
      <td className="py-3">
        <div className="flex flex-col">
          <h4 className="font-bold text-primary-500 uppercase md:text-lg">
            {getMonth(event)}
          </h4>
          <p className="md:text-lg">{getDays(event)}</p>
        </div>
      </td>
      <td className="py-3">
        <p className="px-3 md:px-10 text-lg sm:text-xl md:text-2xl">
          {event.title}
        </p>
      </td>
      <td className="py-3">
        <WeekDayIndicator event={event} />
      </td>
    </tr>
  );
};
