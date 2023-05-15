import type { CalendarEvent } from "~/services/calendar-parser";
import { CalendarEventRow } from "./CalendarEventRow";
import { Logo } from "./Logo";
import { QRCode } from "./QRCode";

interface Props {
  title: string;
  subtitle: string;
  data: CalendarEvent[];
  calendarLink: string;
}
export const Calendar = ({ title, subtitle, data, calendarLink }: Props) => (
  <main className="p-4 md:px-16 md:py-10 bg-primary-100">
    <table className="w-full text-neutral-800 break-inside-avoid-page">
      <Header title={title} subtitle={subtitle} />
      <tbody>
        {data.map((event) => (
          <CalendarEventRow key={event.id} event={event} />
        ))}
      </tbody>
      <Footer calendarLink={calendarLink} />
    </table>
  </main>
);

const LineBeforeTitle = () => (
  <span className="bg-primary-500 h-1 w-20 absolute hidden md:block md:top-7 md:-left-24" />
);

const Header = ({ title, subtitle }: Pick<Props, "title" | "subtitle">) => (
  <thead>
    <tr>
      <th colSpan={999} className="text-left pb-5">
        <h2 className="uppercase text-primary-500">{subtitle}</h2>
        <h1 className="relative text-3xl md:text-6xl text-primary-900">
          <LineBeforeTitle />
          {title}
        </h1>
      </th>
    </tr>
    <tr>
      <th className="w-16 md:w-20" />
      <th />
      <th className="w-32 md:w-40">Uge</th>
    </tr>
  </thead>
);

const Footer = ({ calendarLink }: { calendarLink: string }) => (
  <tfoot>
    <tr>
      <td colSpan={999} className="relative">
        <div className="flex mt-5 shrink-0">
          <QRCode value={calendarLink} />
          <p className="ml-2 text-lg self-end">
            Scan og få kalender opdateringer
          </p>
        </div>
        <Logo className="absolute right-1 bottom-1 h-4" />
      </td>
    </tr>
  </tfoot>
);
