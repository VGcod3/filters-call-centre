import { useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { ChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "~/components/ui/calendar";
import { Button } from "~/components/ui/button";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useDatePicker } from "./useDatePicker";
import { DropdownType } from "./DatePicker";

export const CalendarView = ({
  setDropdownContentType,
}: {
  setDropdownContentType: (value: DropdownType) => void;
}) => {
  const setSearchParams = useSearchParams()[1];

  const { fromDate, toDate, fromTo } = useDatePicker();

  const [calendarState, setCalendarState] = useState<DateRange>({
    from: fromTo.from,
    to: fromTo.to,
  });

  const calculateLeftMonthOnCalendar = () => {
    if (
      dayjs(fromTo.from)
        .add(1, "month")
        .startOf("month")
        .isAfter(dayjs(toDate).startOf("month"))
    ) {
      return dayjs(fromTo.from).subtract(1, "month").toDate();
    }
    return dayjs(fromTo.from).toDate();
  };

  const handleApplyButton = () => {
    setSearchParams((prev) => {
      prev.delete("statsPeriod");

      prev.set("from", calendarState?.from?.toISOString() || "");
      prev.set("to", calendarState?.to?.toISOString() || "");

      return prev;
    });
  };

  const focusNext = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab" || e.key === "ArrowRight") {
      const next = e.currentTarget.nextElementSibling;
      if (next instanceof HTMLButtonElement) {
        next.focus();
      }
    }
  };

  const focusPrevious = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.shiftKey && e.key === "Tab") || e.key === "ArrowLeft") {
      const prev = e.currentTarget.previousElementSibling;
      if (prev instanceof HTMLButtonElement) {
        prev.focus();
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Calendar
        // initialFocus
        mode="range"
        selected={calendarState}
        onSelect={(calendarData) => setCalendarState(calendarData as DateRange)}
        defaultMonth={calculateLeftMonthOnCalendar()}
        numberOfMonths={2}
        toDate={toDate}
        fromDate={fromDate}
      />

      <div className="flex p-3 gap-3">
        <DropdownMenuItem
          asChild
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Button
            onClick={() => {
              setDropdownContentType(DropdownType.checkbox);
            }}
            onKeyDown={focusNext}
            variant={"secondary"}
            className="flex-1 cursor-pointer"
          >
            <ChevronLeftIcon className="p-1" />
            Back
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant={"default"}
            className="flex-1 cursor-pointer"
            disabled={!calendarState?.from || !calendarState?.to}
            onKeyDown={focusPrevious}
            onClick={handleApplyButton}
          >
            Apply
          </Button>
        </DropdownMenuItem>
      </div>
    </div>
  );
};
