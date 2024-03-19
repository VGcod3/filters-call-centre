import { useSearchParams } from "@remix-run/react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { useDatePickerContext } from "./DatePickerContext";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

export const DropDownList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    dateOptions,

    toggleDropdown,

    toggleCalendarAndCloseDropdown,
  } = useDatePickerContext();

  const onCheckedChange = (opt: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      prev.delete("to");

      prev.set("statsPeriod", opt);

      return prev;
    });

    toggleDropdown();
  };

  return (
    <DropdownMenuContent className="w-56" align="start">
      {dateOptions.map((opt) => (
        <DropdownMenuCheckboxItem
          className="text-blue-600"
          key={opt.value}
          checked={
            searchParams.has("statsPeriod") &&
            searchParams.get("statsPeriod") === opt.value
          }
          onCheckedChange={() => onCheckedChange(opt.value)}
        >
          <span className="text-gray-700">{opt.label}</span>
        </DropdownMenuCheckboxItem>
      ))}

      <DropdownMenuSeparator className="my-0.5" />

      <Button
        variant={"ghost"}
        onClick={toggleCalendarAndCloseDropdown}
        className="pr-2 py-1.5 pl-2 w-full text-gray-700 font-normal"
      >
        <CheckIcon
          strokeWidth={1.5}
          className={cn(
            "p-1 text-blue-600",
            searchParams.has("from") && searchParams.has("to")
              ? "opacity-100"
              : "opacity-0"
          )}
        />
        <span className="flex w-full justify-between items-center">
          Custom
          <ChevronRightIcon strokeWidth={1.5} className="p-1" />
        </span>
      </Button>
    </DropdownMenuContent>
  );
};
