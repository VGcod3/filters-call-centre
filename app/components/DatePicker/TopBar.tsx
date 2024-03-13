import { CalendarX2Icon, ClockIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import type { TopBarProps } from "./typesDatePicker";
import { useCalendarView } from "./useCalendarView";

export const TopBar = ({ date, handleClearDate }: TopBarProps) => {
  const { showTime, handleShowTime } = useCalendarView();

  return (
    <div className="flex gap-3 p-3 text-gray-600">
      <Button onClick={handleClearDate} variant={"outline"} className="p-2">
        <CalendarX2Icon strokeWidth={1.5} />
      </Button>

      <div className="flex-1 flex flex-col">
        <Button
          variant={"outline"}
          className={cn(showTime && "border-b-0 rounded-b-none")}
        >
          {date?.from ? (
            format(date.from, "LLL dd, y")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>

        {showTime && (
          <>
            <Separator />

            <Button
              variant={"outline"}
              className="rounded-t-none border-t-0 text-gray-300"
            >
              <span>12:00AM</span>
            </Button>
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <Button
          variant={"outline"}
          className={cn(showTime && "border-b-0 rounded-b-none")}
        >
          {date?.to ? format(date.to, "LLL dd, y") : <span>Pick a date</span>}
        </Button>

        {showTime && (
          <>
            <Separator />

            <Button
              variant={"outline"}
              className="rounded-t-none border-t-0 text-gray-300"
            >
              <span>12:00AM</span>
            </Button>
          </>
        )}
      </div>
      <Button variant={"outline"} className="p-2" onClick={handleShowTime}>
        <ClockIcon strokeWidth={1.5} />
      </Button>
    </div>
  );
};
