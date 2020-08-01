import { parseISO, format } from "date-fns";

export default function DateFormatter({
  date,
  formatStr,
}: {
  date: string;
  formatStr: string | null;
}) {
  const parsedDate = parseISO(date);
  return <time dateTime={date}>{format(parsedDate, formatStr || "LLLL d, yyyy")}</time>;
}
