import clsx from "clsx";
import {
  areIntervalsOverlapping,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
} from "date-fns";
import type { CalendarEvent } from "~/services/calendar-parser";
import { dateFnsOptions, formatWeekday } from "~/services/date-formatters";

interface Props {
  event: CalendarEvent;
}
export const WeekDayIndicator = ({ event }: Props) => {
  return (
    <>
      {eachWeekOfInterval(
        { start: event.start, end: event.end },
        dateFnsOptions
      ).map((week) => (
        <div key={week.getTime()} className="flex flex-row justify-center">
          <Weekdays week={week} event={event} />
        </div>
      ))}
    </>
  );
};

const Weekdays = ({ event, week }: Props & { week: Date }) => {
  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(week, dateFnsOptions).getTime(),
    end: endOfWeek(week, dateFnsOptions).getTime(),
  });

  return (
    <>
      {daysInWeek.map((day) => (
        <Weekday event={event} day={day.getTime()} key={day.getTime()} />
      ))}
    </>
  );
};

const Weekday = ({ event, day }: Props & { day: number }) => {
  const isEventHappiningOnThisDay = areIntervalsOverlapping(
    { start: startOfDay(day).getTime(), end: endOfDay(day).getTime() },
    event
  );

  return (
    <span
      className={clsx(
        {
          "rounded-full bg-primary-500": isEventHappiningOnThisDay,
        },
        "px-1 uppercase text-sm md:text-base"
      )}
    >
      {formatWeekday(day)}
    </span>
  );
};
