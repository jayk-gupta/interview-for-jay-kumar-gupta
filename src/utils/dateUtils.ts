import { subMonths, subYears, subWeeks } from "date-fns";

export type DateFilterRange =
  | "all"
  | "week"
  | "month"
  | "3months"
  | "6months"
  | "year"
  | "2years";

export interface DateFilterModalProps {
  selectedDate: Date | null;
  selectedLabel: string | null;
  onApply: (date: Date | null, label: string | null) => void;
}

// Refrenced date as 2022 as data is only available till 2022
const REFERENCE_DATE = new Date(Date.UTC(2022, 11, 31, 23, 59, 59));

const stripTime = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getRangeDate = (range: DateFilterRange): Date | null => {
  const now = new Date(REFERENCE_DATE);
  switch (range) {
    case "week":
      return stripTime(subWeeks(now, 1));
    case "month":
      return stripTime(subMonths(now, 1));
    case "3months":
      return stripTime(subMonths(now, 3));
    case "6months":
      return stripTime(subMonths(now, 6));
    case "year":
      return stripTime(subYears(now, 1));
    case "2years":
      return stripTime(subYears(now, 2));
    default:
      return null;
  }
};
