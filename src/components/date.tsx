import { parseISO, format } from "date-fns";

type DateFormatterProps = {
  date?: string | null;
  formatStr?: string | null;
};
export const DateFormatter = ({ date, formatStr }: DateFormatterProps) => {
  const parsedDate = parseISO(date || new Date().toISOString());
  return <time dateTime={date}>{format(parsedDate, formatStr || "LLLL d, yyyy")}</time>;
};
