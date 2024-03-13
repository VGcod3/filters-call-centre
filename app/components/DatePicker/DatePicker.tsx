import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Popover, PopoverTrigger } from "~/components/ui/popover";
import { DropDownList } from "./DropDownList";
import useDatePicker from "./useDatePicker";
import { CalendarView } from "./CalendarView";

export const DatePicker = () => {
  const { dropdownOpen, calendarOpen, setDropdownOpen, getButtonDisplaytext } =
    useDatePicker();

  return (
    <Popover open={calendarOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
        <DropDownList />
      </DropdownMenu>

      <CalendarView />
    </Popover>
  );
};
