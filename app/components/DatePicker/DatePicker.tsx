import { useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DropdownView } from "~/components/DatePicker/DropdownView";
import { CalendarView } from "~/components/DatePicker/CalendarView";
import { useDatePicker } from "~/components/DatePicker/useDatePicker";
import type { StatsPeriod } from "~/routes/reports";

export enum DropdownType {
  "checkbox",
  "calendar",
}

export const presetDates: Record<StatsPeriod, string> = {
  "1H": "Last hour",
  Today: "Today",
  Yesterday: "Yesterday",
  "7D": "Last 7 days",
  "14D": "Last 14 days",
  "30D": "Last 30 days",
};

export const fromDate = dayjs().subtract(3, "months").toDate();
export const toDate = dayjs().toDate();

export const DatePicker = () => {
  const { dropdownContentType, setDropdownContentType, fromTo } =
    useDatePicker();

  const [searchParams] = useSearchParams();

  const getButtonDisplaytext = () => {
    if (searchParams.has("statsPeriod")) {
      return searchParams.get("statsPeriod");
    }

    const from = dayjs(fromTo.from).format("MMM DD, YYYY");
    const to = dayjs(fromTo.to).format("MMM DD, YYYY");

    if (from === to) {
      return from;
    }

    return `${from} - ${to}`;
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open && dropdownContentType === DropdownType.calendar) {
          setTimeout(() => {
            setDropdownContentType(DropdownType.checkbox);
          }, 500);
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-auto min-w-28 text-gray-600 px-2.5 flex gap-1.5 justify-between  select-none"
        >
          <CalendarIcon size={16} strokeWidth={1.5} />
          {getButtonDisplaytext()}
          <ChevronDownIcon size={16} strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {dropdownContentType === DropdownType.checkbox ? (
          <DropdownView setDropdownContentType={setDropdownContentType} />
        ) : (
          <CalendarView setDropdownContentType={setDropdownContentType} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
