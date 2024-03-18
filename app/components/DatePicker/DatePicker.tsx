import { CalendarIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { DropDownList } from "./DropDownList";
import useDatePicker from "./useDatePicker";

import { Separator } from "~/components/ui/separator";
import { DateRange } from "react-day-picker";
import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";

import { Calendar } from "~/components/ui/calendar";
import { DatePickerProvider } from "./DatePickerContext";

import type { DatePickerContextProps } from "./DatePickerContext";
import dayjs from "dayjs";
import TriggerButton from "../TriggerButton";

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
        <DropdownMenu
          open={ctx.dropdownOpen}
          onOpenChange={() => ctx.handleDropdown(!ctx.dropdownOpen)}
        >
          <PopoverTrigger asChild>
            <DropdownMenuTrigger asChild>
              <TriggerButton
                isOpen={ctx.dropdownOpen}
                toggleDropdown={() => ctx.handleDropdown(!ctx.dropdownOpen)}
                Icon={CalendarIcon}
              >
                {ctx.getButtonDisplaytext()}
              </TriggerButton>
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
