import clsx from "clsx";
import type { CalendarEvent } from "~/services/calendar-parser";
import { CalendarEventRow } from "./CalendarEventRow";

interface Props {
  data: CalendarEvent[];
  className?: string;
}
export const CalendarEventsTable = ({ data, className }: Props) => {
  return (
    <table className={clsx("table-fixed w-full text-neutral-800", className)}>
      <thead>
        <tr>
          <th className="w-20" />
          <th />
          <th className="w-40">Uge</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <CalendarEventRow key={event.id} event={event} />
        ))}
      </tbody>
    </table>
  );
};
