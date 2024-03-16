import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { DropDownList } from "./DropDownList";
import useDatePicker from "./useDatePicker";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { DateRange } from "react-day-picker";
import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";

import { Calendar } from "~/components/ui/calendar";
import { DatePickerProvider } from "./DatePickerContext";

import type { DatePickerContextProps } from "./DatePickerContext";
import dayjs from "dayjs";
import { cn } from "~/lib/utils";

export const DatePicker = () => {
  const ctx: DatePickerContextProps = useDatePicker();

  const fromDate = dayjs().subtract(3, "months").toDate();
  const toDate = dayjs().toDate();

  const calculateLeftMonthOnCalendar = () => {
    if (
      dayjs(ctx.fromTo.from)
        .add(1, "month")
        .startOf("month")
        .isAfter(dayjs(toDate).startOf("month"))
    ) {
      return dayjs(ctx.fromTo.from).subtract(1, "month").toDate();
    }
    return dayjs(ctx.fromTo.from).toDate();
  };

  return (
    <DatePickerProvider value={ctx}>
      <Popover open={ctx.calendarOpen}>
        <DropdownMenu open={ctx.dropdownOpen} onOpenChange={ctx.handleDropdown}>
          <PopoverTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-auto min-w-28 text-gray-600 px-2.5 flex gap-1.5 justify-between border-none select-none"
              >
                <CalendarIcon size={16} strokeWidth={1.5} />
                {ctx.getButtonDisplaytext()}
                <ChevronDownIcon
                  size={16}
                  strokeWidth={1.5}
                  className={cn(
                    "transition-all transform",
                    ctx.dropdownOpen && "-rotate-180"
                  )}
                />
              </Button>
            </DropdownMenuTrigger>
          </PopoverTrigger>
          <DropDownList />
        </DropdownMenu>
        <PopoverContent className="w-auto p-0" align="start">
          <TopBar />

          <Separator />

          <Calendar
            initialFocus
            mode="range"
            selected={ctx.calendarState}
            onSelect={(calendarData) =>
              ctx.setCalendarState(calendarData as unknown as DateRange)
            }
            defaultMonth={calculateLeftMonthOnCalendar()}
            numberOfMonths={2}
            toDate={toDate}
            fromDate={fromDate}
          />

          <Separator />

          <BottomBar />
        </PopoverContent>
      </Popover>
    </DatePickerProvider>
  );
};
