import { CalendarX2Icon, ClockIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import dayjs from "dayjs";
import { useDatePickerContext } from "./DatePickerContext";

import MaskedTimeInput from "./TimeInput";

export const TopBar = () => {
  const { handleClearDate, fromTo, toggleShowTime, calendarState } =
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

      <TopButton fromOrTo="from" />
      <TopButton fromOrTo="to" />

      <Button variant={"outline"} className="p-2" onClick={toggleShowTime}>
        <ClockIcon strokeWidth={1.5} />
      </Button>
    </div>
  );
};

type DateButtonProps = {
  children: React.ReactNode;
  showTime: boolean;
};

const DateButton = ({ children, showTime, ...props }: DateButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "pointer-events-none",
        showTime && "border-b-0 rounded-b-none"
      )}
      tabIndex={-1}
      {...props}
    >
      {children}
    </Button>
  );
};

type TopButtonProps = {
  fromOrTo: "from" | "to";
};

const TopButton = ({ fromOrTo }: TopButtonProps) => {
  const { fromTo, showTime } = useDatePickerContext();

  return (
    <div className="flex-1 flex flex-col">
      <DateButton showTime={showTime}>
        {fromTo[fromOrTo] ? (
          dayjs(fromTo[fromOrTo]).format("MMM DD, YYYY")
        ) : (
          <span>Pick a date</span>
        )}
      </DateButton>

      {showTime && (
        <>
          {/* <span>12:00AM</span> */}

          <MaskedTimeInput />
        </>
      )}
    </div>
  );
};
