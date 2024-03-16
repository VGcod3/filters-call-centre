import { CalendarX2Icon, ClockIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

import dayjs from "dayjs";
import { useDatePickerContext } from "./DatePickerContext";

export const TopBar = () => {
  const { handleClearDate, fromTo, showTime, toggleShowTime, calendarState } =
    useDatePickerContext();

  const isDisabled =
    dayjs(fromTo?.from).isSame(dayjs(calendarState?.from)) &&
    dayjs(fromTo?.to).isSame(dayjs(calendarState?.to));

  return (
    <div className="flex gap-3 p-3 text-gray-600">
      <Button
        onClick={handleClearDate}
        variant={"outline"}
        className="p-2"
        disabled={isDisabled}
      >
        <CalendarX2Icon strokeWidth={1.5} />
      </Button>

      <div className="flex-1 flex flex-col">
        <Button
          variant={"outline"}
          className={cn(showTime && "border-b-0 rounded-b-none ")}
        >
          {fromTo.from ? (
            dayjs(fromTo.from).format("MMM DD, YYYY")
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
          {fromTo?.to ? (
            dayjs(fromTo.to).format("MMM DD, YYYY")
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
      <Button variant={"outline"} className="p-2" onClick={toggleShowTime}>
        <ClockIcon strokeWidth={1.5} />
      </Button>
    </div>
  );
};
