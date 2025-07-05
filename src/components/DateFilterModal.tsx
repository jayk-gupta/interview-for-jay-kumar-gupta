import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import clsx from "clsx";
import { getRangeDate } from "@/utils/dateUtils";
import type { DateFilterModalProps } from "@/utils/dateUtils";

const limitDate = new Date("2022-12-31");

const dateRanges = [
  { label: "Past week", value: getRangeDate("week") },
  { label: "Past month", value: getRangeDate("month") },
  { label: "Past 3 months", value: getRangeDate("3months") },
  { label: "Past 6 months", value: getRangeDate("6months") },
  { label: "Past year", value: getRangeDate("year") },
  { label: "Past 2 years", value: getRangeDate("2years") },
].map(({ label, value }) => ({
  label,
  value: value ? new Date(value.setHours(0, 0, 0, 0)) : null,
}));

const isSameDay = (d1: Date | null, d2: Date) => {
  if (!d1) return false;
  const a = new Date(d1).setHours(0, 0, 0, 0);
  const b = new Date(d2).setHours(0, 0, 0, 0);
  return a === b;
};

export default function DateFilterModal({
  selectedDate,
  selectedLabel,
  onApply,
}: DateFilterModalProps) {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);
  const [tempLabel, setTempLabel] = useState<string | null>(
    selectedLabel ?? null
  );

  const handleApply = () => {
    onApply(
      tempDate,
      tempLabel ?? (tempDate ? format(tempDate, "dd MMM yyyy") : null)
    );
    setOpen(false);
  };

  const handleRangeClick = (date: Date | null, label: string) => {
    setTempDate(date);
    setTempLabel(label);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          {selectedLabel
            ? selectedLabel
            : selectedDate
            ? format(selectedDate, "dd MMM yyyy")
            : "Select Date"}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex gap-6  p-6 items-start max-w-[720px]">
        {/* Left Calendar options*/}
        <div className="flex flex-col gap-2 w-40">
          {dateRanges.map(({ label, value }) => (
            <Button
              key={label}
              variant="ghost"
              className={clsx(
                "justify-start text-left",
                value && isSameDay(tempDate, value) && "bg-muted hover:bg-muted"
              )}
              onClick={() => handleRangeClick(value, label)}
            >
              {label}
            </Button>
          ))}
        </div>
        {/* Right Calendar */}
        <div className="flex flex-col items-center gap-4 ">
          <Calendar
            mode="single"
            selected={tempDate ?? undefined}
            onSelect={setTempDate}
            numberOfMonths={2}
            captionLayout="dropdown"
            // ensures calendar opens to the selected month
            month={tempDate ?? new Date()}
            required
            // Set the last selectable month to December 2022
            endMonth={new Date(2022, 11)}
            // Hide all days after December 31, 2022
            hidden={[{ after: limitDate }]}
          />
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              setTempDate(null);
              setTempLabel(null);
            }}
          >
            Reset
          </Button>
          <Button onClick={handleApply} className="w-full">
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
