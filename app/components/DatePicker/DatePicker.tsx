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
import { Calendar } from "~/components/ui/calendar";
import { Separator } from "~/components/ui/separator";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";
import { DropDownList } from "./DropDownList";
import useDatePicker from "./useDatePicker";
import type { DateRange } from "react-day-picker";

export const DatePicker = () => {
  const {
    dateOptions,
    activeDateFilter,
    setActiveDateFilter,
    dropdownOpen,
    calendarOpen,
    setCalendarOpen,
    date,
    setDate,
    handleDropdown,
    handleApplyButton,
    handleClearDate,
    getButtonDisplaytext,
  } = useDatePicker();

  return (
    <Popover open={calendarOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={handleDropdown}>
        <PopoverTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-auto min-w-28 text-gray-600 px-2.5 flex gap-1.5 justify-between border-none"
            >
              <CalendarIcon size={16} strokeWidth={1.5} />
              {getButtonDisplaytext()}
              <ChevronDownIcon size={16} strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
        </PopoverTrigger>
        <DropDownList
          dateOptions={dateOptions}
          activeDateFilter={activeDateFilter}
          setActiveDateFilter={setActiveDateFilter}
          setCalendarOpen={setCalendarOpen}
        />
      </DropdownMenu>
      <PopoverContent className="w-auto p-0" align="start">
        <TopBar date={date} handleClearDate={handleClearDate} />

        <Separator />

        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(calendarData) => setDate(calendarData as DateRange)}
          numberOfMonths={2}
          toDate={date?.to}
        />

        <Separator />

        <BottomBar
          setCalendarOpen={setCalendarOpen}
          setDropdownOpen={handleDropdown}
          handleApplyButton={handleApplyButton}
          date={date}
        />
      </PopoverContent>
    </Popover>
  );
};
