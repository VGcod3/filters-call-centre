import { PopoverContent } from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { Separator } from "~/components/ui/separator";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";
import type { DateRange } from "react-day-picker";
import { useCalendarView } from "./useCalendarView";

export const CalendarView = () => {
  const {
    calendarState,
    setCalendarState,

    handleClearDate,
  } = useCalendarView();

  return (
    <PopoverContent className="w-auto p-0" align="start">
      <TopBar date={calendarState} handleClearDate={handleClearDate} />

      <Separator />

      <Calendar
        initialFocus
        mode="range"
        // defaultMonth={dayjs().toDate()}
        selected={calendarState}
        onSelect={(calendarData) => setCalendarState(calendarData as DateRange)}
        numberOfMonths={2}
      />

      <Separator />

      <BottomBar />
    </PopoverContent>
  );
};
